import sqlite3
import pandas as pd
import json
from loguru import logger
import os
from typing import List, Dict, Any, Union, Optional


class SQLiteConnector:
    """Connector for the SQLite database containing transfer payment information"""
    
    def __init__(self, db_path: Optional[str] = None):
        """Initialize the SQLite connector with the path to the database"""
        # Default path based on Docker setup
        self.db_path = db_path or "/app/data/sqlite/transfer_payments.sqlite"
        # Check if running locally for development
        if not os.path.exists(self.db_path):
            local_path = "query-engine/data/sqlite/transfer_payments.sqlite"
            if os.path.exists(local_path):
                self.db_path = local_path
                logger.info(f"Using local database at {local_path}")
            else:
                logger.warning(f"Database not found at {self.db_path} or {local_path}")
        
        logger.info(f"Initializing SQLite connector with DB path: {self.db_path}")
    
    def get_connection(self):
        """Get a connection to the SQLite database"""
        try:
            conn = sqlite3.connect(self.db_path)
            # Enable JSON serialization/deserialization
            conn.execute("PRAGMA foreign_keys = ON")
            sqlite3.register_adapter(dict, json.dumps)
            sqlite3.register_converter("JSON", json.loads)
            return conn
        except Exception as e:
            logger.error(f"Error connecting to SQLite database: {str(e)}")
            raise
    
    def execute_query(self, query: str) -> pd.DataFrame:
        """Execute a SQL query and return the results as a DataFrame"""
        try:
            conn = self.get_connection()
            logger.info(f"Executing SQL query: {query}")
            result = pd.read_sql_query(query, conn)
            conn.close()
            return result
        except Exception as e:
            logger.error(f"Error executing query: {str(e)}")
            raise
    
    def get_table_schema(self) -> Dict[str, List[Dict[str, str]]]:
        """Get the schema of all tables in the database"""
        try:
            conn = self.get_connection()
            cursor = conn.cursor()
            
            # Get list of tables
            cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
            tables = [row[0] for row in cursor.fetchall()]
            
            schema = {}
            for table in tables:
                cursor.execute(f"PRAGMA table_info({table})")
                columns = []
                for col in cursor.fetchall():
                    columns.append({
                        "name": col[1],
                        "type": col[2],
                        "description": self._get_comment_for_column(table, col[1])
                    })
                schema[table] = columns
            
            conn.close()
            return schema
        except Exception as e:
            logger.error(f"Error getting schema: {str(e)}")
            raise
    
    def _get_comment_for_column(self, table: str, column: str) -> str:
        """Extract column comment from schema.sql file if available"""
        try:
            # This is a naive implementation - in a real scenario you might want to parse the schema file
            # or store column descriptions in a dedicated table
            with open("query-engine/sqlite/schema.sql", "r") as f:
                schema_sql = f.read()
                
            # Very basic parsing - look for comments after column definitions
            # This is just a placeholder and might need to be improved
            target = f"{column} "
            if target in schema_sql:
                line_start = schema_sql.find(target)
                line_end = schema_sql.find("\n", line_start)
                line = schema_sql[line_start:line_end]
                if "--" in line:
                    return line.split("--")[1].strip()
            return ""
        except Exception:
            return ""