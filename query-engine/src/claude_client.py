import os
import json
import pandas as pd
from typing import Dict, List, Any, Optional
from loguru import logger
from anthropic import Anthropic
from pydantic import BaseModel, Field


class SQLResult(BaseModel):
    """A structured result for a SQL query response"""
    answer: str = Field(..., description="Full answer to the user's question based on the SQL results")
    summary: str = Field(..., description="A 1-2 sentence summary of the key findings")
    related_questions: List[str] = Field(..., description="3-5 follow-up questions the user might want to ask")


class ClaudeClient:
    """Client for interacting with Claude 3.7 to generate SQL and format answers"""
    
    def __init__(self, api_key: Optional[str] = None):
        """Initialize the Claude client with API key"""
        self.api_key = api_key or os.environ.get("ANTHROPIC_API_KEY")
        if not self.api_key:
            logger.warning("ANTHROPIC_API_KEY not set. Claude client will not function.")
        
        # Initialize the Anthropic client
        self.client = Anthropic(api_key=self.api_key)
        # Note: Instructor doesn't directly support Anthropic's client structure
    
    def generate_sql_query(self, question: str, schema: Dict[str, List[Dict[str, str]]]) -> str:
        """Generate a SQL query from a natural language question using Claude 3.7"""
        try:
            # Format schema information for the prompt
            schema_str = self._format_schema_for_prompt(schema)
            
            prompt = f"""You are an expert in translating natural language questions into SQL queries for a database containing Canadian government transfer payment information.

SCHEMA:
{schema_str}

USER QUESTION:
{question}

Your task is to write a SQL query that answers this question. Focus on:
1. Writing valid SQLite syntax
2. Using only tables and columns defined in the schema
3. Including appropriate JOINs, WHERE clauses, and aggregations
4. Keeping the query efficient and focused on answering the specific question
5. Adding comments to explain complex parts of your query

RETURN ONLY THE SQL QUERY, with no explanations before or after it.
"""
            
            response = self.client.messages.create(
                model="claude-3-7-sonnet-20250219",
                max_tokens=1000,
                temperature=0.2,
                system="You are an expert SQL query generator for a SQLite database.",
                messages=[{"role": "user", "content": prompt}]
            )
            
            # Extract the SQL query from the response
            sql_query = response.content[0].text.strip()
            # Remove any markdown code block formatting if present
            if sql_query.startswith("```sql"):
                sql_query = sql_query.split("```sql")[1]
            if sql_query.startswith("```"):
                sql_query = sql_query.split("```")[1]
            if sql_query.endswith("```"):
                sql_query = sql_query.rsplit("```", 1)[0]
                
            sql_query = sql_query.strip()
            logger.info(f"Generated SQL query: {sql_query}")
            return sql_query
            
        except Exception as e:
            logger.error(f"Error generating SQL query: {str(e)}")
            raise
    
    def format_query_result(self, question: str, sql_query: str, query_result: Optional[pd.DataFrame]) -> SQLResult:
        """Format the SQL query results into a structured response using Claude 3"""
        try:
            if query_result is None:
                result_str = "No query executed"
            elif query_result.empty:
                logger.warning("Query result is empty - no data found")
                result_str = "No results found."
            else:
                # Debug the first few rows
                sample_data = query_result.head(3).to_dict(orient='records')
                logger.info(f"Sample data: {json.dumps(sample_data, default=str)}")
                
                try:
                    # Try using markdown table format first (requires tabulate)
                    result_str = query_result.to_markdown(index=False)
                    logger.info("Using markdown table formatting")
                except ImportError:
                    logger.info("Tabulate not available, falling back to alternative formatting")
                    # Fall back to a simple string representation if tabulate is not available
                    result_str = query_result.to_string(index=False)
                    if len(result_str) > 4000:  # If the string is too long, use a more compact representation
                        # Convert to JSON records format which is more readable
                        result_str = json.dumps(query_result.head(50).to_dict(orient='records'), indent=2, default=str)
                        if len(query_result) > 50:
                            result_str += f"\n\n[Note: Showing first 50 of {len(query_result)} records]"
            
            prompt = f"""You are an expert in analyzing and explaining data about Canadian government transfer payments.

USER QUESTION:
{question}

SQL QUERY EXECUTED:
```sql
{sql_query}
```

QUERY RESULTS:
{result_str}

Based on the query results, please provide a thorough answer to the user's question.
Your response must be a valid JSON object with these three fields:
1. "answer": A detailed answer to the question based on the data
2. "summary": A 1-2 sentence summary of key findings 
3. "related_questions": An array of 3-5 follow-up questions

Example format:
{{
  "answer": "The data shows that...",
  "summary": "In 2023, the top recipient was...",
  "related_questions": [
    "What was the trend for this recipient over time?",
    "How does this compare to other departments?",
    "Which programs received the most funding?"
  ]
}}
"""
            
            response = self.client.messages.create(
                model="claude-3-7-sonnet-20250219",
                max_tokens=1500,
                temperature=0.3,
                system="You are a data analyst explaining query results. Be accurate, clear, and concise. Always return valid JSON.",
                messages=[{"role": "user", "content": prompt}]
            )
            
            # Parse the JSON response
            response_text = response.content[0].text.strip()
            
            # Handle if the response is wrapped in code blocks
            if "```json" in response_text:
                response_text = response_text.split("```json")[1].split("```")[0].strip()
            elif "```" in response_text:
                response_text = response_text.split("```")[1].split("```")[0].strip()
            
            result_dict = json.loads(response_text)
            
            # Convert to SQLResult model
            result = SQLResult(
                answer=result_dict["answer"],
                summary=result_dict["summary"],
                related_questions=result_dict["related_questions"]
            )
            
            return result
            
        except Exception as e:
            logger.error(f"Error formatting query result: {str(e)}")
            # Fallback if JSON parsing fails
            return SQLResult(
                answer=f"Error processing results: {str(e)}",
                summary="An error occurred while analyzing the data.",
                related_questions=["Could you try rephrasing your question?"]
            )
    
    def _format_schema_for_prompt(self, schema: Dict[str, List[Dict[str, str]]]) -> str:
        """Format the database schema into a string for the prompt"""
        schema_parts = []
        
        for table_name, columns in schema.items():
            table_str = f"Table: {table_name}\nColumns:"
            
            for col in columns:
                name = col.get("name", "")
                col_type = col.get("type", "")
                description = col.get("description", "")
                
                col_str = f"  - {name} ({col_type})"
                if description:
                    col_str += f": {description}"
                
                table_str += f"\n{col_str}"
            
            schema_parts.append(table_str)
        
        return "\n\n".join(schema_parts) 
