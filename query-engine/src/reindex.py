#!/usr/bin/env python3
import os
import sys
import asyncio
import argparse
from loguru import logger
from indexer import CSVIndexer

async def reindex_schemas(schemas, force=True):
    """Reindex specified schemas"""
    indexer = CSVIndexer()
    
    for schema in schemas:
        try:
            logger.info(f"Force reindexing schema: {schema}")
            await indexer.initialize_and_index(schema, force_reindex=force)
            logger.success(f"Successfully reindexed schema: {schema}")
        except Exception as e:
            logger.error(f"Failed to reindex schema {schema}: {e}")
    
    indexer.close()
    logger.info("Reindexing process completed")

def get_available_schemas():
    """Get all available schemas in the data directory"""
    data_dir = 'data'
    if not os.path.exists(data_dir):
        logger.error(f"Data directory {data_dir} not found")
        return []
    
    return [d for d in os.listdir(data_dir) 
            if os.path.isdir(os.path.join(data_dir, d))]

def main():
    parser = argparse.ArgumentParser(description='Force reindex schemas in the query engine')
    parser.add_argument('schemas', nargs='*', help='Specific schemas to reindex (leave empty for all)')
    parser.add_argument('--list', action='store_true', help='List available schemas')
    args = parser.parse_args()
    
    available_schemas = get_available_schemas()
    
    if args.list:
        print("Available schemas:")
        for schema in available_schemas:
            print(f"  - {schema}")
        return
    
    schemas_to_reindex = args.schemas if args.schemas else available_schemas
    
    # Validate schemas
    for schema in schemas_to_reindex:
        if schema not in available_schemas:
            logger.error(f"Schema '{schema}' not found. Available schemas: {', '.join(available_schemas)}")
            return
    
    if not schemas_to_reindex:
        logger.warning("No schemas found to reindex")
        return
    
    logger.info(f"Starting reindexing for schemas: {', '.join(schemas_to_reindex)}")
    asyncio.run(reindex_schemas(schemas_to_reindex))

if __name__ == "__main__":
    main() 