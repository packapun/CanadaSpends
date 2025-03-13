from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from dotenv import load_dotenv
import uvicorn
from loguru import logger
import os
from typing import Optional, List
from datetime import datetime

from indexer import CSVIndexer
from sql_connector import SQLiteConnector
from claude_client import ClaudeClient, SQLResult
from chat_session import SessionManager, ChatSession

# Load environment variables
load_dotenv()

class SQLQueryRequest(BaseModel):
    question: str
    source: str = "web"  # default to web if not specified
    session_id: Optional[str] = None  # Session ID for conversation history

# Global variables
sql_connector = None
claude_client = None
session_manager = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Initialize the query engine
    global sql_connector, claude_client, session_manager
    try:
        # Initialize SQL connector
        sql_connector = SQLiteConnector()
        
        # Initialize Claude client
        anthropic_api_key = os.environ.get("ANTHROPIC_API_KEY")
        if not anthropic_api_key:
            logger.warning("ANTHROPIC_API_KEY not set. SQL query functionality will be limited.")
        claude_client = ClaudeClient(api_key=anthropic_api_key)
        
        # Initialize session manager with persistence
        sessions_dir = os.environ.get("SESSIONS_DIR", "./sessions")
        session_manager = SessionManager(storage_dir=sessions_dir)
        logger.info(f"Session storage directory: {sessions_dir}")
        
        # No need to create a default session here - we'll create sessions per user request
        
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

@app.post("/sql/query")
async def sql_query(request: SQLQueryRequest):
    """
    Query the SQLite database using Claude 3.7 to generate SQL from natural language.
    
    Workflow:
    1. Convert natural language question to SQL using Claude 3.7
    2. Execute SQL against the SQLite database
    3. Format results into a comprehensive answer using Claude 3.7
    """
    if not sql_connector or not claude_client or not session_manager:
        raise HTTPException(status_code=503, detail="SQL query services not initialized")
    
    try:
        logger.info(f"Received SQL query from {request.source}: {request.question}")
        logger.info(f"Request session_id: {request.session_id}")
        
        # Session handling - proper continuation logic
        if request.session_id:
            # Try to get existing session
            session = session_manager.get_session(request.session_id)
            if not session:
                logger.warning(f"Session {request.session_id} not found, creating new session")
                session = session_manager.create_session()
        else:
            # For a new conversation, create a new session
            session = session_manager.create_session()
            logger.info(f"Created new session: {session.session_id}")
        
        logger.info(f"Using session: {session.session_id} (message count: {len(session.messages)})")
        
        # Check for special commands - ensure we use the existing session
        if request.question.strip().lower().startswith("/"):
            command = request.question.strip().lower()
            
            # Command: Show conversation context
            if command == "/context":
                all_history = session.get_history_as_text(include_timestamps=True)
                if not all_history:
                    all_history = "No messages in current session."
                
                # Add session metadata
                session_info = (
                    f"Session ID: {session.session_id}\n"
                    f"Created: {session.created_at.strftime('%Y-%m-%d %H:%M:%S')}\n"
                    f"Last updated: {session.last_updated.strftime('%Y-%m-%d %H:%M:%S')}\n"
                    f"Message count: {len(session.messages)}\n\n"
                    f"--- CONVERSATION HISTORY ---\n\n"
                )
                
                return JSONResponse({
                    "status": "success",
                    "question": request.question,
                    "command": "context",
                    "answer": f"{session_info}{all_history}",
                    "summary": "Displayed full conversation context",
                    "related_questions": [],
                    "source": request.source,
                    "session_id": session.session_id  # Return the session ID to maintain continuity
                })
            
            # Command: Clear conversation history
            elif command == "/clear":
                session.clear_history()
                
                # Add system messages after clearing
                if hasattr(session_manager, "_initialize_session_with_system_messages"):
                    session_manager._initialize_session_with_system_messages(session)
                else:
                    # Fallback if method doesn't exist
                    session.add_message("system", "I am a data analyst assistant for Canadian government spending data. I can help you query and analyze transfer payment information.")
                    session.add_message("system", "You can ask me questions about recipients, programs, departments, and financial amounts. I'll use Claude to generate SQL to answer your questions.")
                
                # Save the cleared session if persistence is enabled
                if hasattr(session_manager, "_save_session"):
                    session_manager._save_session(session)
                
                return JSONResponse({
                    "status": "success",
                    "question": request.question,
                    "command": "clear",
                    "answer": "Conversation history has been cleared and system messages re-initialized.",
                    "summary": "Chat history cleared",
                    "related_questions": [],
                    "source": request.source,
                    "session_id": session.session_id
                })
                
            # Command: Help - show available commands
            elif command == "/help":
                help_text = """
Available commands:
/context - Show the current conversation history
/clear - Clear the conversation history and reinitialize system messages
/help - Show this help message
/sessions - List all available sessions
                """
                
                return JSONResponse({
                    "status": "success",
                    "question": request.question,
                    "command": "help",
                    "answer": help_text,
                    "summary": "Command help information",
                    "related_questions": [],
                    "source": request.source,
                    "session_id": session.session_id
                })
            
            # Command: List all sessions
            elif command == "/sessions":
                # Get list of all sessions
                sessions_info = []
                for session_id, sess in session_manager.sessions.items():
                    sessions_info.append({
                        "session_id": session_id,
                        "created_at": sess.created_at.strftime("%Y-%m-%d %H:%M:%S"),
                        "message_count": len(sess.messages),
                        "last_updated": sess.last_updated.strftime("%Y-%m-%d %H:%M:%S"),
                        "is_current": session_id == session.session_id
                    })
                
                # Sort by most recently updated
                sessions_info.sort(key=lambda x: x["last_updated"], reverse=True)
                
                # Format as text
                if not sessions_info:
                    sessions_text = "No active sessions found."
                else:
                    sessions_text = f"Found {len(sessions_info)} active sessions:\n\n"
                    for i, sess in enumerate(sessions_info):
                        current_marker = " (current)" if sess["is_current"] else ""
                        sessions_text += (
                            f"{i+1}. Session {sess['session_id']}{current_marker}\n"
                            f"   Created: {sess['created_at']}\n"
                            f"   Last updated: {sess['last_updated']}\n"
                            f"   Messages: {sess['message_count']}\n\n"
                        )
                    
                    # Add note about session_id
                    sessions_text += "\nIMPORTANT: To continue a conversation, include the session_id in your requests. Without a session_id, a new session will be created for each request."
                
                return JSONResponse({
                    "status": "success",
                    "question": request.question,
                    "command": "sessions",
                    "answer": sessions_text,
                    "summary": f"Listed {len(sessions_info)} active sessions",
                    "related_questions": [],
                    "source": request.source,
                    "session_id": session.session_id
                })
            
            # Unknown command
            else:
                return JSONResponse({
                    "status": "error",
                    "question": request.question,
                    "error": f"Unknown command: {command}",
                    "source": request.source,
                    "session_id": session.session_id
                })
        
        # Add the user's question to the session history
        if request.source == "system":
            session.add_message("system", request.question)
        elif request.source == "assistant":
            session.add_message("assistant", request.question)
        else:
            session.add_message("user", request.question)
        
        # Step 1: Get database schema for Claude context
        schema = sql_connector.get_table_schema()
        
        # Step 2: Generate SQL query from natural language using Claude with chat history
        sql_query = claude_client.generate_sql_query(
            request.question, 
            schema, 
            chat_history=session.get_history_as_text(max_messages=5)
        )
        
        # Step 3: Execute the SQL query
        # Validate query starts with SELECT for security
        if sql_query.strip().upper().startswith('SELECT') or sql_query.strip().upper().startswith('--'):
            query_result = sql_connector.execute_query(sql_query)
        else:
            query_result = None
        
        # Step 4: Format the results with Claude and instructor
        formatted_response: SQLResult = claude_client.format_query_result(
            request.question, sql_query, query_result, 
            chat_history=session.get_history_as_text(max_messages=5)
        )
        
        # Add the assistant's response to the session history
        session.add_message("assistant", formatted_response.answer)
        
        # Convert the SQLResult model to a dictionary for JSON serialization
        # Use the new to_dict() method of SQLResult
        response_dict = formatted_response.to_dict()
        
        # Add additional API response fields
        response_dict.update({
            "status": "success",
            "question": request.question,
            "sql_query": sql_query,
            "source": request.source,
            "session_id": session.session_id  # Return the session ID for future requests
        })
            
        # Return the structured response
        return JSONResponse(response_dict)
        
    except Exception as e:
        logger.error(f"SQL query error: {str(e)}")
        return JSONResponse(
            status_code=500,
            content={
                "status": "error",
                "error": str(e),
                "question": request.question,
                "source": request.source,
                "session_id": request.session_id
            }
        )

@app.get("/sessions/{session_id}")
async def get_session(session_id: str):
    """Get details about a specific chat session."""
    if not session_manager:
        raise HTTPException(status_code=503, detail="Session manager not initialized")
    
    session = session_manager.get_session(session_id)
    if not session:
        raise HTTPException(status_code=404, detail=f"Session {session_id} not found")
    
    # Convert messages to a serializable format
    messages = [
        {
            "role": msg.role,
            "content": msg.content,
            "timestamp": msg.timestamp.isoformat()
        }
        for msg in session.messages
    ]
    
    return {
        "session_id": session.session_id,
        "messages": messages,
        "created_at": session.created_at.isoformat(),
        "last_updated": session.last_updated.isoformat(),
        "message_count": len(session.messages)
    }

@app.get("/health")
async def health_check():
    """Check if the API and query engine are healthy."""
    return {
        "sql_connector_ready": sql_connector is not None,
        "claude_client_ready": claude_client is not None,
        "session_manager_ready": session_manager is not None
    }

@app.post("/sessions")
async def create_session():
    """Create a new chat session."""
    if not session_manager:
        raise HTTPException(status_code=503, detail="Session manager not initialized")
    
    session = session_manager.create_session()
    
    # No need to add system message here as App.js handles the greeting
    
    return {
        "status": "success",
        "session_id": session.session_id,
        "created_at": session.created_at.isoformat()
    }

@app.delete("/sessions/{session_id}")
async def delete_session(session_id: str):
    """Delete a chat session."""
    if not session_manager:
        raise HTTPException(status_code=503, detail="Session manager not initialized")
    
    # Use the SessionManager's delete_session method
    success = session_manager.delete_session(session_id)
    if not success:
        raise HTTPException(status_code=404, detail=f"Session {session_id} not found")
    
    return {
        "status": "success",
        "message": f"Session {session_id} deleted"
    }

@app.get("/sessions")
async def list_sessions():
    """List all active chat sessions."""
    if not session_manager:
        raise HTTPException(status_code=503, detail="Session manager not initialized")
    
    sessions_info = []
    for session_id, session in session_manager.sessions.items():
        sessions_info.append({
            "session_id": session_id,
            "created_at": session.created_at.isoformat(),
            "last_updated": session.last_updated.isoformat(),
            "message_count": len(session.messages)
        })
    
    return {"sessions": sessions_info}

@app.post("/summarize")
async def summarize():
    """Create a new session and provide a database summary."""
    if not sql_connector or not claude_client or not session_manager:
        raise HTTPException(status_code=503, detail="Services not initialized")
    
    try:
        # Create a new session
        session = session_manager.create_session()
        logger.info(f"Created new session for summarization: {session.session_id}")
        
        # Create a query request object
        summary_query = SQLQueryRequest(
            question="Summarize the data and provide high-level spending amounts over the past 20 years.",
            source="summary",
            session_id=session.session_id
        )
        
        # Call the existing sql_query function
        query_response = await sql_query(summary_query)
        
        # Since sql_query now returns a JSONResponse, we need to extract its content
        if isinstance(query_response, JSONResponse):
            response_data = query_response.body
            if isinstance(response_data, bytes):
                import json
                response_data = json.loads(response_data)
        else:
            response_data = query_response
        
        # Build and return the summary response
        return {
            "status": "success",
            "session_id": session.session_id,
            "summary": response_data.get("answer", "Database summary not available."),
            "related_questions": response_data.get("related_questions", []),
            "charts": response_data.get("charts", [])
        }
        
    except Exception as e:
        logger.error(f"Summarization error: {str(e)}")
        return JSONResponse(
            status_code=500,
            content={
                "status": "error",
                "error": str(e)
            }
        )

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True) 