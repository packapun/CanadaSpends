from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
import uvicorn
from loguru import logger

from indexer import CSVIndexer

# Load environment variables
load_dotenv()

# Global variables
query_engine = None
indexing_status = {"status": "not_started", "message": "Initialization not started"}

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Initialize the query engine
    global query_engine, indexing_status
    try:
        indexing_status = {"status": "in_progress", "message": "Initializing indexer..."}
        logger.info("Starting indexer initialization...")
        
        indexer = CSVIndexer()
        indexing_status = {"status": "in_progress", "message": "Building index..."}
        query_engine = await indexer.initialize_and_index('transfer_payments')
        
        indexing_status = {"status": "ready", "message": "Index is ready"}
        logger.info("Indexer initialization complete")
    except Exception as e:
        error_msg = f"Failed to initialize query engine: {str(e)}"
        logger.error(error_msg)
        indexing_status = {"status": "failed", "message": error_msg}
        raise
    
    yield  # Server is running and handling requests
    
    # Cleanup
    if hasattr(indexer, 'close'):
        indexer.close()
    query_engine = None
    indexing_status = {"status": "shutdown", "message": "Service is shutting down"}

# Initialize FastAPI with lifespan
app = FastAPI(
    title="Canada Spends Query Engine",
    description="API for querying Canadian government spending data",
    version="1.0.0",
    lifespan=lifespan
)

@app.get("/query")
async def query_data(question: str):
    """
    Query the spending data with a natural language question.
    Returns both the question and the answer.
    """
    if not query_engine:
        raise HTTPException(status_code=503, detail="Query engine not initialized")
    try:
        response = await query_engine.query(question)
        return JSONResponse({
            "status": "success",
            "question": question,
            "answer": str(response)
        })
    except Exception as e:
        logger.error(f"Query error: {str(e)}")
        return JSONResponse(
            status_code=500,
            content={
                "status": "error",
                "error": str(e),
                "question": question
            }
        )

@app.get("/health")
async def health_check():
    """Check if the API and query engine are healthy."""
    return {
        "status": indexing_status["status"],
        "message": indexing_status["message"],
        "query_engine_ready": query_engine is not None
    }

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True) 