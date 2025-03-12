from typing import Dict, List, Optional
import uuid
import json
import os
from datetime import datetime
from pydantic import BaseModel, Field
from loguru import logger


class Message(BaseModel):
    """A single message in a chat conversation"""
    role: str  # 'user' or 'assistant'
    content: str
    timestamp: datetime = Field(default_factory=datetime.now)


class ChatSession(BaseModel):
    """A chat session containing the history of a conversation"""
    session_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    messages: List[Message] = Field(default_factory=list)
    created_at: datetime = Field(default_factory=datetime.now)
    last_updated: datetime = Field(default_factory=datetime.now)
    metadata: Dict = Field(default_factory=dict)
    
    # This ensures each instance gets its own copy of mutable defaults
    model_config = {
        "arbitrary_types_allowed": True,
    }
    
    def add_message(self, role: str, content: str) -> None:
        """Add a new message to the chat history"""
        # Create a new message
        message = Message(role=role, content=content)
        # Add to this session's messages
        self.messages.append(message)
        # Update last_updated timestamp
        self.last_updated = datetime.now()
        logger.debug(f"Added {role} message to session {self.session_id}. Total messages: {len(self.messages)}")
    
    def clear_history(self) -> None:
        """Clear all messages from the chat history"""
        self.messages = []
        self.last_updated = datetime.now()
        logger.info(f"Cleared history for session: {self.session_id}")
    
    def get_history_as_text(self, max_messages: int = None, include_timestamps: bool = False) -> str:
        """Get the chat history formatted as text for Claude context"""
        if not self.messages:
            return ""
            
        history_parts = []
        
        messages_to_include = self.messages
        if max_messages and len(self.messages) > max_messages:
            messages_to_include = self.messages[-max_messages:]
            history_parts.append(f"[Showing last {max_messages} of {len(self.messages)} messages]")
            
        for i, msg in enumerate(messages_to_include):
            # Format each message with role in uppercase
            role_display = msg.role.upper()
            
            # Add timestamp if requested
            timestamp_display = ""
            if include_timestamps and msg.timestamp:
                timestamp_display = f" [{msg.timestamp.strftime('%Y-%m-%d %H:%M:%S')}]"
            
            # Build the message entry
            message_entry = f"{i+1}. {role_display}{timestamp_display}: {msg.content}"
            history_parts.append(message_entry)
            
        return "\n\n".join(history_parts)


class SessionManager:
    """Manages multiple chat sessions with optional persistence"""
    def __init__(self, storage_dir: str = None):
        self.sessions: Dict[str, ChatSession] = {}
        self.storage_dir = storage_dir
        
        # Create storage directory if it doesn't exist
        if storage_dir:
            os.makedirs(storage_dir, exist_ok=True)
            self._load_sessions()
    
    def _session_file_path(self, session_id: str) -> str:
        """Get the file path for a session's storage file"""
        if not self.storage_dir:
            return None
        return os.path.join(self.storage_dir, f"session_{session_id}.json")
    
    def _save_session(self, session: ChatSession) -> None:
        """Save a session to disk"""
        if not self.storage_dir:
            return
            
        file_path = self._session_file_path(session.session_id)
        try:
            # Convert to JSON compatible format
            session_data = session.model_dump_json()
            
            with open(file_path, 'w') as f:
                f.write(session_data)
                
            logger.debug(f"Saved session {session.session_id} to {file_path}")
        except Exception as e:
            logger.error(f"Failed to save session {session.session_id}: {str(e)}")
    
    def _load_sessions(self) -> None:
        """Load all sessions from disk"""
        if not self.storage_dir or not os.path.exists(self.storage_dir):
            return
            
        try:
            # Find all session files
            session_files = [f for f in os.listdir(self.storage_dir) 
                            if f.startswith("session_") and f.endswith(".json")]
            
            for file_name in session_files:
                try:
                    file_path = os.path.join(self.storage_dir, file_name)
                    with open(file_path, 'r') as f:
                        session_data = json.load(f)
                    
                    # Create session from data
                    session = ChatSession.model_validate(session_data)
                    self.sessions[session.session_id] = session
                    
                    logger.info(f"Loaded session {session.session_id} with {len(session.messages)} messages")
                except Exception as e:
                    logger.error(f"Failed to load session from {file_name}: {str(e)}")
                    
            logger.info(f"Loaded {len(self.sessions)} sessions from {self.storage_dir}")
        except Exception as e:
            logger.error(f"Failed to load sessions: {str(e)}")
    
    def _initialize_session_with_system_messages(self, session: ChatSession) -> None:
        """Initialize a session with system messages that set context"""
        # Only add system messages if the session is empty
        if len(session.messages) == 0:
            session.add_message("system", "I am a data analyst assistant for Canadian government spending data. I can help you query and analyze transfer payment information.")
            logger.info(f"Initialized session {session.session_id} with system message")
    
    def get_session(self, session_id: str) -> Optional[ChatSession]:
        """Get a session by ID, returning None if not found"""
        return self.sessions.get(session_id)
    
    def create_session(self, metadata: Dict = None) -> ChatSession:
        """Create a new chat session with system messages"""
        session = ChatSession(metadata=metadata or {})
        self._initialize_session_with_system_messages(session)
        self.sessions[session.session_id] = session
        
        # Save to disk if persistence is enabled
        self._save_session(session)
        
        logger.info(f"Created new session: {session.session_id}")
        return session
    
    def get_or_create_session(self, session_id: Optional[str] = None) -> ChatSession:
        """Get an existing session by ID or create a new one with system messages"""
        if session_id and session_id in self.sessions:
            return self.sessions[session_id]
        return self.create_session()
    
    def add_message_to_session(self, session_id: str, role: str, content: str) -> Optional[ChatSession]:
        """Add a message to a session, creating the session if it doesn't exist"""
        session = self.get_or_create_session(session_id)
        session.add_message(role, content)
        
        # Save to disk if persistence is enabled
        self._save_session(session)
        
        return session
    
    def delete_session(self, session_id: str) -> bool:
        """Delete a session, returning True if successful"""
        if session_id not in self.sessions:
            return False
            
        # Remove from memory
        del self.sessions[session_id]
        
        # Remove from disk if persistence is enabled
        if self.storage_dir:
            file_path = self._session_file_path(session_id)
            if os.path.exists(file_path):
                try:
                    os.remove(file_path)
                    logger.info(f"Deleted session file: {file_path}")
                except Exception as e:
                    logger.error(f"Failed to delete session file {file_path}: {str(e)}")
        
        return True 