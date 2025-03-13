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
        # Connect to the SQLite container over the network
        self.db_path = "/app/data/transfer_payments.sqlite"  # Path inside the SQLite container
        
        logger.info(f"Connecting to SQLite: {self.db_path}")
    
    def get_connection(self):
        """Get a connection to the SQLite database"""
        try:
            conn = sqlite3.connect(f"file:{self.db_path}?mode=ro", uri=True)
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
            with open("/app/data/schema.sql", "r") as f:
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