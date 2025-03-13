import os
import json
import pandas as pd
from typing import Dict, List, Any, Optional, Union
from loguru import logger
from anthropic import Anthropic
from pydantic import BaseModel, Field


class ChartConfig(BaseModel):
    """Configuration for a D3.js visualization chart"""
    chart_type: str = Field(..., description="Type of chart (e.g. 'bar', 'line', 'pie')")
    title: str = Field(..., description="Chart title")
    x_axis_label: Optional[str] = Field(None, description="X-axis label (if applicable)")
    y_axis_label: Optional[str] = Field(None, description="Y-axis label (if applicable)")
    data: Dict[str, List] = Field(..., description="Data for the chart in D3.js format with x and y arrays")
    layout: Dict[str, Any] = Field(default_factory=dict, description="Additional layout configuration")


class SQLResult(BaseModel):
    """A structured result for a SQL query response"""
    answer: str = Field(..., description="Full answer to the user's question based on the SQL results")
    summary: str = Field(..., description="A 1-2 sentence summary of the key findings")
    related_questions: List[str] = Field(..., description="3-5 follow-up questions the user might want to ask")
    charts: Optional[List[ChartConfig]] = Field(None, description="Chart configurations for visualizing the data")
    
    def to_dict(self) -> Dict[str, Any]:
        """Convert SQLResult to a dictionary suitable for JSON serialization"""
        result = {
            "answer": self.answer,
            "summary": self.summary,
            "related_questions": self.related_questions,
        }
        
        if self.charts:
            result["charts"] = [chart.dict() for chart in self.charts]
        else:
            result["charts"] = []
            
        return result


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
    
    def generate_sql_query(self, question: str, schema: Dict[str, List[Dict[str, str]]], chat_history: str = "") -> str:
        """Generate a SQL query from a natural language question using Claude 3.7"""
        try:
            # Format schema information for the prompt
            schema_str = self._format_schema_for_prompt(schema)
            
            # Include chat history if available
            history_section = ""
            if chat_history:
                history_section = f"""CHAT HISTORY:
{chat_history}

"""
            
            prompt = f"""{history_section}You are an expert in translating natural language questions into SQL queries for a database containing Canadian government transfer payment information.

SCHEMA:
{schema_str}

USER QUESTION:
{question}

Your task is to write a SQL query that answers this question. Focus on:
1. Writing valid SQLite syntax, only one statement per query
2. Using only tables and columns defined in the schema
3. Including appropriate JOINs, WHERE clauses, and aggregations
4. Grouping and sorting over time as much as possible
5. Keeping the query efficient and focused on answering the specific question
6. Adding comments to explain complex parts of your query
7. Refer to the chat history for important context
8. Remember order by should always come after union all

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
    
    def format_query_result(self, question: str, sql_query: str, query_result: Optional[pd.DataFrame], chat_history: str = "") -> SQLResult:
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
            
            # Include chat history if available
            history_section = ""
            if chat_history:
                history_section = f"""CHAT HISTORY:
{chat_history}

"""
            
            # Generate chart data if we have query results
            chart_data_str = ""
            if query_result is not None and not query_result.empty:
                # Convert DataFrame to JSON for chart data
                chart_data = json.dumps(query_result.to_dict(orient='records'), default=str)
                chart_data_str = f"""
CHART DATA (JSON):
{chart_data}
"""
            
            # Create a non-f-string for the part with JSON examples to avoid format specifier issues
            d3_chart_data_example = """
IMPORTANT: For D3.js, the "data" field in each chart must be an object with arrays for x and y values.

For example, correct format for D3.js:
"data": {
  "x": ["Category A", "Category B", "Category C"],
  "y": [10, 20, 30]
}

For a pie chart, use:
"data": {
  "labels": ["Category A", "Category B", "Category C"],
  "values": [10, 20, 30]
}

HERE IS A COMPLETE EXAMPLE of valid JSON output:
{
  "answer": "Based on the data, Department X has the highest spending at $100 million in 2023.",
  "summary": "Department X leads government spending with $100 million in 2023.",
  "related_questions": [
    "How has Department X spending changed over time?",
    "Which programs received the most funding from Department X?",
    "How does Department X compare to Department Y?"
  ],
  "charts": [
    {
      "chart_type": "bar",
      "title": "Top 5 Departments by Spending",
      "x_axis_label": "Department",
      "y_axis_label": "Amount (in millions)",
      "data": {
        "x": ["Dept X", "Dept Y", "Dept Z", "Dept A", "Dept B"],
        "y": [100, 75, 50, 40, 30]
      },
      "layout": {
        "margin": {"top": 30, "right": 20, "bottom": 40, "left": 50}
      }
    }
  ]
}
"""
            
            # Simplify the chart generation instructions to reduce complexity
            prompt = f"""{history_section}You are an expert in analyzing and explaining data about Canadian government transfer payments.

USER QUESTION:
{question}

SQL QUERY EXECUTED:
```sql
{sql_query}
```

QUERY RESULTS:
{result_str}
{chart_data_str}
Based on the query results, please provide a thorough answer to the user's question.

You should create ONE simple data visualization for this data to show the key insight.
Focus on producing ONLY ONE high-quality chart with simple structure that will work with D3.js.

Your response must be a valid JSON object with these fields:
1. "answer": A detailed answer to the question based on the data
2. "summary": A 1-2 sentence summary of key findings 
3. "related_questions": An array of 3-5 follow-up questions
4. "charts": An array with just one chart configuration containing:
   - "chart_type": One of "bar", "line", "pie" (prefer bar charts for simplicity)
   - "title": A descriptive title for the chart
   - "x_axis_label": Label for the x-axis (for bar/line charts)
   - "y_axis_label": Label for the y-axis (for bar/line charts)
   - "data": An object with "x" and "y" arrays (or "labels" and "values" for pie charts)
   - "layout": A simple layout object with minimal options

Choose the most appropriate chart type for the data:
- Use BAR charts for comparing categories (PREFERRED for simplicity)
- Use LINE charts only for time series with clear trends
- Use PIE charts only for showing proportions of a whole with few categories (max 5-7 slices)
{d3_chart_data_example}
Return VALID JSON that can be parsed by Python's json.loads().
"""
            
            # Add a stronger system message about valid JSON formatting
            system_message = """You are a data analyst explaining query results. Be accurate, clear, and concise.
IMPORTANT: You must return ONLY valid JSON with no explanation text before or after.
Do not include any text outside of the JSON object. No explanations, no notes, no preamble.
Escape all special characters inside strings properly.
Use double quotes for JSON keys and string values.
Keep JSON structure simple and minimal."""

            try:
                # Set a timeout for the Claude API call
                response = self.client.messages.create(
                    model="claude-3-7-sonnet-20250219",
                    max_tokens=2500,
                    temperature=0.3,
                    system=system_message,
                    messages=[{"role": "user", "content": prompt}]
                )
                
                # Parse the JSON response
                response_text = response.content[0].text.strip()
                
                # Handle if the response is wrapped in code blocks
                if "```json" in response_text:
                    response_text = response_text.split("```json")[1].split("```")[0].strip()
                elif "```" in response_text:
                    response_text = response_text.split("```")[1].split("```")[0].strip()
                
            except Exception as claude_err:
                logger.error(f"Error calling Claude API: {str(claude_err)}")
                # Return a simplified response
                return SQLResult(
                    answer=f"I analyzed your query about '{question}' but encountered an error communicating with the AI. Here's what I know: The query was executed successfully and returned data about Canadian government transfer payments.",
                    summary="Error connecting to AI service.",
                    related_questions=["What are the top departments by spending?", 
                                        "How have payments changed over time?", 
                                        "What are the largest payment recipients?"],
                    charts=None
                )
            
            # Add detailed debugging for JSON parsing errors
            try:
                # Log a snippet around potential problem areas to help debugging
                if len(response_text) > 500:
                    logger.info(f"JSON response (truncated): {response_text[:500]}...")
                else:
                    logger.info(f"JSON response: {response_text}")
                
                result_dict = json.loads(response_text)
            except json.JSONDecodeError as json_err:
                logger.error(f"JSON parsing error: {str(json_err)}")
                
                # Find the problematic area in the response
                error_pos = json_err.pos
                start_pos = max(0, error_pos - 50)
                end_pos = min(len(response_text), error_pos + 50)
                error_context = response_text[start_pos:end_pos]
                
                logger.error(f"Error context: ...{error_context}...")
                logger.error(f"Error position indicator: {' ' * (error_pos - start_pos + 3)}^")
                
                # Try to sanitize the JSON by handling common issues
                sanitized_text = response_text
                
                # Fix unescaped quotes inside strings
                # This is an overly simplistic fix but might handle some common cases
                # For more complex cases, a proper JSON validator would be needed
                try:
                    sanitized_text = sanitized_text.replace('\\"', '"')  # Fix escaped quotes
                    sanitized_text = sanitized_text.replace("\\n", "\\\\n")  # Escape newlines properly
                    sanitized_text = sanitized_text.replace("\n", " ")  # Replace actual newlines with spaces
                    
                    # Try parsing the sanitized JSON
                    logger.info("Attempting to parse sanitized JSON")
                    result_dict = json.loads(sanitized_text)
                    logger.info("Successfully parsed sanitized JSON")
                except Exception as sanitize_err:
                    logger.error(f"Failed to sanitize and parse JSON: {str(sanitize_err)}")
                    # Return a fallback response without charts
                    return SQLResult(
                        answer=f"I analyzed the data but encountered an error formatting the results. The core findings are that the query returned data related to Canadian government transfer payments. To get more specific insights, please try asking a more targeted question.",
                        summary="Error processing query results.",
                        related_questions=["What are the top 5 departments by total transfer payments?", 
                                         "How have transfer payments changed over the last 3 years?",
                                         "Which recipients received the largest payments?"],
                        charts=None
                    )
            
            # Fix chart data format if needed
            if "charts" in result_dict and result_dict["charts"]:
                charts_to_keep = []
                for i, chart in enumerate(result_dict["charts"]):
                    try:
                        # Ensure we have a valid layout
                        if not chart.get("layout"):
                            logger.warning(f"Chart {i} is missing layout, adding empty layout")
                            chart["layout"] = {}
                            
                        # Ensure data is a dictionary with x and y arrays for D3.js
                        if not isinstance(chart.get("data"), dict):
                            logger.warning(f"Chart {i} data is not a dictionary, skipping")
                            continue
                        
                        # For pie charts, ensure we have labels and values
                        if chart.get("chart_type", "").lower() == "pie":
                            if not chart["data"].get("labels") and chart["data"].get("x"):
                                chart["data"]["labels"] = chart["data"]["x"]
                            if not chart["data"].get("values") and chart["data"].get("y"):
                                chart["data"]["values"] = chart["data"]["y"]
                        
                        # For bar/line charts, ensure we have x and y arrays
                        else:
                            if not chart["data"].get("x") or not chart["data"].get("y"):
                                logger.warning(f"Chart {i} is missing x or y data, skipping")
                                continue
                                
                        # Only keep valid charts
                        charts_to_keep.append(chart)
                    except Exception as chart_err:
                        logger.error(f"Error processing chart {i}: {str(chart_err)}")
                        # Skip this chart but continue processing
                        
                # Replace with only valid charts
                result_dict["charts"] = charts_to_keep
                        
            # Convert to SQLResult model
            try:
                result = SQLResult(
                    answer=result_dict["answer"],
                    summary=result_dict["summary"],
                    related_questions=result_dict["related_questions"],
                    charts=result_dict.get("charts", None)  # Optional charts field
                )
                
                return result
            except Exception as validation_err:
                logger.error(f"Validation error creating SQLResult: {str(validation_err)}")
                # Return a simplified result without charts when validation fails
                return SQLResult(
                    answer=result_dict["answer"],
                    summary=result_dict["summary"],
                    related_questions=result_dict["related_questions"],
                    charts=None
                )
            
        except Exception as e:
            logger.error(f"Error formatting query result: {str(e)}")
            # Fallback if JSON parsing fails
            return SQLResult(
                answer=f"Error processing results: {str(e)}",
                summary="An error occurred while analyzing the data.",
                related_questions=["Could you try rephrasing your question?"],
                charts=None
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
