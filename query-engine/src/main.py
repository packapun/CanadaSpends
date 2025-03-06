from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from dotenv import load_dotenv
import uvicorn
from loguru import logger
import os

from indexer import CSVIndexer
from sql_connector import SQLiteConnector
from claude_client import ClaudeClient, SQLResult

# Load environment variables
load_dotenv()

# Define request models
class QueryRequest(BaseModel):
    query: str
    source: str = "web"  # default to web if not specified

class SQLQueryRequest(BaseModel):
    question: str
    source: str = "web"  # default to web if not specified

# Global variables
sql_connector = None
claude_client = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Initialize the query engine
    global sql_connector, claude_client
    try:
        # Initialize SQL connector
        sql_connector = SQLiteConnector()
        
        # Initialize Claude client
        anthropic_api_key = os.environ.get("ANTHROPIC_API_KEY")
        if not anthropic_api_key:
            logger.warning("ANTHROPIC_API_KEY not set. SQL query functionality will be limited.")
        claude_client = ClaudeClient(api_key=anthropic_api_key)
        
        indexing_status = {"status": "ready", "message": "Index is ready"}
        logger.info("Indexer initialization complete")
    except Exception as e:
        error_msg = f"Failed to initialize query engine: {str(e)}"
        logger.error(error_msg)
        indexing_status = {"status": "failed", "message": error_msg}
        raise
    
    yield  # Server is running and handling requests

# Initialize FastAPI with lifespan
app = FastAPI(
    title="Canada Spends Query Engine",
    description="API for querying Canadian government spending data",
    version="1.0.0",
    lifespan=lifespan
)

@app.post("/query")
async def query_data(request: QueryRequest):
    """
    Query the spending data with a natural language question.
    Accepts a JSON body with the query and optional source.
    """
    if not query_engine:
        raise HTTPException(status_code=503, detail="Query engine not initialized")
    try:
        logger.info(f"Received query from {request.source}: {request.query}")
        response = await query_engine.query(request.query)
        return JSONResponse({
            "status": "success",
            "question": request.query,
            "response": str(response),  # Changed from 'answer' to 'response' to match Slack code
            "source": request.source
        })
    except Exception as e:
        logger.error(f"Query error: {str(e)}")
        return JSONResponse(
            status_code=500,
            content={
                "status": "error",
                "error": str(e),
                "question": request.query,
                "source": request.source
            }
        )

@app.post("/sql/query")
async def sql_query(request: SQLQueryRequest):
    """
    Query the SQLite database using Claude 3.7 to generate SQL from natural language.
    
    Workflow:
    1. Convert natural language question to SQL using Claude 3.7
    2. Execute SQL against the SQLite database
    3. Format results into a comprehensive answer using Claude 3.7
    """
    if not sql_connector or not claude_client:
        raise HTTPException(status_code=503, detail="SQL query services not initialized")
    
    try:
        logger.info(f"Received SQL query from {request.source}: {request.question}")
        
        # Step 1: Get database schema for Claude context
        schema = sql_connector.get_table_schema()
        
        # Step 2: Generate SQL query from natural language using Claude
        sql_query = claude_client.generate_sql_query(request.question, schema)
        
        # Step 3: Execute the SQL query
        query_result = sql_connector.execute_query(sql_query)
        
        # Step 4: Format the results with Claude and instructor
        formatted_response: SQLResult = claude_client.format_query_result(
            request.question, sql_query, query_result
        )
        
        # Return the structured response
        return JSONResponse({
            "status": "success",
            "question": request.question,
            "sql_query": sql_query,
            "answer": formatted_response.answer,
            "summary": formatted_response.summary,
            "related_questions": formatted_response.related_questions,
            "source": request.source
        })
        
    except Exception as e:
        logger.error(f"SQL query error: {str(e)}")
        return JSONResponse(
            status_code=500,
            content={
                "status": "error",
                "error": str(e),
                "question": request.question,
                "source": request.source
            }
        )

@app.get("/health")
async def health_check():
    """Check if the API and query engine are healthy."""
    return {
        "sql_connector_ready": sql_connector is not None,
        "claude_client_ready": claude_client is not None
    }

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True) 