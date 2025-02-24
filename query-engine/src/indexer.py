from loguru import logger
import os
import pandas as pd
import xml.etree.ElementTree as ET

from llama_index.core import (
    Document, 
    VectorStoreIndex, 
    StorageContext
)
from llama_index.vector_stores.weaviate import WeaviateVectorStore

import weaviate
from weaviate.classes.config import (
    Configure,
    DataType,
    Property
)
from weaviate.classes.init import AdditionalConfig, Timeout


class DataDictionaryParser:
    def __init__(self, xml_path: str):
        """Initialize parser with path to data dictionary XML."""
        self.field_definitions = {}
        self._parse_xml(xml_path)
    
    def _parse_xml(self, xml_path: str):
        """Parse the XML data dictionary and store field definitions."""
        try:
            tree = ET.parse(xml_path)
            root = tree.getroot()
            
            for heading in root.findall('.//heading'):
                label = heading.find('label')
                if label is not None:
                    # Handle both simple labels and language-specific labels
                    if label.text:
                        label_text = label.text
                    else:
                        # Try to get English label
                        label_text = label.get('{http://www.w3.org/XML/1998/namespace}lang') or ''
                    
                    # Get English and French descriptions
                    descriptions = heading.findall('description')
                    en_desc = fr_desc = ""
                    for desc in descriptions:
                        if desc.get('{http://www.w3.org/XML/1998/namespace}lang') == 'en':
                            en_desc = desc.text
                        elif desc.get('{http://www.w3.org/XML/1998/namespace}lang') == 'fr':
                            fr_desc = desc.text
                    
                    self.field_definitions[label_text] = {
                        'en_description': en_desc or label_text,
                        'fr_description': fr_desc or label_text
                    }
        except Exception as e:
            logger.error(f"Error parsing data dictionary XML: {str(e)}")
            raise
    
    def get_field_info(self, field_name: str) -> dict:
        """Get the field information from the data dictionary."""
        return self.field_definitions.get(field_name, {
            'en_description': field_name,
            'fr_description': field_name
        })


class CSVIndexer:
    def __init__(self):
        # Initialize Weaviate client using v4 syntax
        http_port = int(os.getenv('WEAVIATE_HTTP_PORT'))
        grpc_port = int(os.getenv('WEAVIATE_GRPC_PORT'))

        self.weaviate_client = weaviate.connect_to_custom(
            http_host=os.getenv('WEAVIATE_HOST'),
            http_port=http_port,
            http_secure=False,
            grpc_host=os.getenv('WEAVIATE_HOST'),
            grpc_port=grpc_port,
            grpc_secure=False,          
            headers={
                "X-Cohere-Api-Key": os.getenv("COHERE_API_KEY")
            },
            additional_config=AdditionalConfig(
                timeout=Timeout(init=30, query=60, insert=120)  # Values in seconds
            )
        )
        
        self.data_dictionary = None
        logger.info(self.weaviate_client.is_ready())

    @staticmethod
    def get_schema_files(schema_name: str) -> tuple[str, str]:
        """
        Get the CSV and data dictionary paths for a given schema.
        
        Args:
            schema_name: Name of the schema (e.g. 'transfer_payments')
            
        Returns:
            tuple: (csv_path, dictionary_path)
        """
        base_path = os.path.join('data', schema_name)
        if not os.path.exists(base_path):
            raise ValueError(f"Schema directory {schema_name} does not exist")
            
        # Look for CSV and XML files
        files = os.listdir(base_path)
        csv_file = next((f for f in files if f.endswith('.csv')), None)
        xml_file = next((f for f in files if f.endswith('.xml')), None)
        
        if not csv_file or not xml_file:
            raise ValueError(f"Missing required files in {schema_name} directory. Need both CSV and XML files.")
            
        return (
            os.path.join(base_path, csv_file),
            os.path.join(base_path, xml_file)
        )

    def initialize_data_dictionary(self, xml_path: str):
        """Initialize the data dictionary parser."""
        try:
            self.data_dictionary = DataDictionaryParser(xml_path)
            logger.info("Data dictionary initialized successfully")
        except Exception as e:
            logger.error(f"Failed to initialize data dictionary: {str(e)}")
            self.data_dictionary = None

    def _collection_exists_with_data(self, collection_name: str) -> bool:
        """Check if collection exists and has data in Weaviate."""
        if not self.weaviate_client.collections.exists(collection_name):
            return False
        
        try:
            # Check if collection has data
            collection = self.weaviate_client.collections.get(collection_name)
            count = len(collection)
            return count > 0
        except Exception as e:
            logger.error(f"Error checking collection existence: {str(e)}")
            return False

    async def initialize_and_index(self, schema_name: str):
        """
        Initialize and index data for a specific schema.
        
        Args:
            schema_name: Name of the schema directory (e.g. 'transfer_payments')
        """
        try:
            # Get paths for the schema
            csv_path, data_dict_path = self.get_schema_files(schema_name)
            
            # Initialize data dictionary
            self.initialize_data_dictionary(data_dict_path)

            self.weaviate_client.connect()
            
            # Create a class in Weaviate if it doesn't exist
            collection_name = schema_name.replace('-', '_').capitalize()
            
            # Check if collection already exists and has data
            if self._collection_exists_with_data(collection_name):
                num_docs = len(self.weaviate_client.collections.get(collection_name))
                logger.info(f"Collection {collection_name} already exists with {num_docs} documents. Skipping indexing.")
                # Create vector store for existing collection
                vector_store = WeaviateVectorStore(
                    weaviate_client=self.weaviate_client,
                    index_name=collection_name,
                    text_key="content"
                )
                storage_context = StorageContext.from_defaults(vector_store=vector_store)
                index = VectorStoreIndex.from_vector_store(vector_store)
            else:
                logger.info(f"Collection {collection_name} does not exist or is empty. Creating and indexing...")
                # Create new collection and index data
                self._create_weaviate_schema(collection_name)
                
                # Read CSV file
                df = pd.read_csv(csv_path)
                logger.info(f"Loaded {len(df)} rows from {csv_path}")
                
                # Convert DataFrame to documents
                documents = self._prepare_documents(df)
                logger.info(f"Created {len(documents)} documents")
                
                # Create vector store
                vector_store = WeaviateVectorStore(
                    weaviate_client=self.weaviate_client,
                    index_name=collection_name,
                    text_key="content"
                )
                
                # Create storage context
                storage_context = StorageContext.from_defaults(vector_store=vector_store)
                
                # Create index with explicit settings
                index = VectorStoreIndex.from_documents(
                    documents,
                    storage_context=storage_context,
                    show_progress=True
                )
            
            from query_engine import QueryEngine
            return QueryEngine(index)
        except Exception as e:
            logger.error(f"Error during initialization: {str(e)}")
            raise

    def _create_weaviate_schema(self, collection_name: str):

        # Delete if exists
        try:
            self.weaviate_client.collections.delete(collection_name)
        except:
            pass
        
        # Create collection with v4 syntax
        self.weaviate_client.collections.create(
            name=collection_name,
            vectorizer_config=Configure.Vectorizer.text2vec_cohere(
                model="embed-multilingual-v2.0"
            ),
            properties=[
                Property(name="content", data_type=DataType.TEXT)
            ]
        )

    def _prepare_documents(self, df: pd.DataFrame) -> list[Document]:
        """
        Prepare documents from DataFrame rows dynamically.
        Handles any columns present in the data and uses data dictionary definitions.
        """
        documents = []
        
        for _, row in df.iterrows():
            content_parts = []
            
            # Process each column in the DataFrame
            for col in df.columns:
                value = row[col]
                if pd.isna(value):  # Handle missing values
                    continue
                
                # Get field information from data dictionary
                field_info = (self.data_dictionary.get_field_info(col) 
                            if self.data_dictionary else {'en_description': col})
                
                # Format the field value
                if isinstance(value, (int, float)):
                    formatted_value = f"{value:,}"
                else:
                    formatted_value = str(value).strip()
                
                # Skip empty values
                if not formatted_value:
                    continue
                
                # Add to content with both English and French descriptions when available
                if (field_info.get('fr_description') and 
                    field_info.get('fr_description') != field_info.get('en_description')):
                    content_parts.append(
                        f"{field_info['en_description']} ({field_info['fr_description']}): {formatted_value}"
                    )
                else:
                    content_parts.append(
                        f"{field_info['en_description']}: {formatted_value}"
                    )
            
            # Join all parts with proper formatting
            content = "\n".join(content_parts)
            documents.append(Document(text=content))
            
            # Log progress periodically
            if len(documents) % 1000 == 0:
                logger.info(f"Processed {len(documents)} documents")
        
        return documents

    def close(self):
        """Close the Weaviate client connection."""
        if self.weaviate_client:
            self.weaviate_client.close()