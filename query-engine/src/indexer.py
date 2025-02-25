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
from llama_index.embeddings.cohere import CohereEmbedding

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
            num_docs = len(collection)
            logger.info(f"Collection {collection_name} already exists with {num_docs} documents. Skipping indexing.")
            return num_docs > 0
        except Exception as e:
            logger.error(f"Error checking collection existence: {str(e)}")
            return False

    async def initialize_and_index(self, schema_name: str, force_reindex: bool = False):
        """
        Initialize and index data for a specific schema.
        
        Args:
            schema_name: Name of the schema directory (e.g. 'transfer_payments')
            force_reindex: If True, reindex data even if collection exists
        """
        try:
            # Get paths for the schema
            csv_path, data_dict_path = self.get_schema_files(schema_name)
            
            # Initialize data dictionary
            self.initialize_data_dictionary(data_dict_path)

            self.weaviate_client.connect()
            
            # Create a class in Weaviate if it doesn't exist
            collection_name = schema_name.replace('-', '_').capitalize()
            
            # Create embedding model with Cohere
            embed_model = CohereEmbedding(
                cohere_api_key=os.getenv("COHERE_API_KEY"),
                model_name="embed-multilingual-v3.0"
            )
            
            # Check if collection already exists and has data (unless force_reindex is True)
            if not force_reindex and self._collection_exists_with_data(collection_name):
                # Create vector store for existing collection
                vector_store = WeaviateVectorStore(
                    weaviate_client=self.weaviate_client,
                    index_name=collection_name,
                    text_key="content"
                )
                storage_context = StorageContext.from_defaults(vector_store=vector_store)
                index = VectorStoreIndex.from_vector_store(
                    vector_store,
                    embed_model=embed_model
                )
            else:
                if force_reindex:
                    logger.info(f"Force reindexing collection {collection_name}")
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
                
                # Create index with explicit settings and Cohere embeddings
                index = VectorStoreIndex.from_documents(
                    documents,
                    storage_context=storage_context,
                    embed_model=embed_model,
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
                model="embed-multilingual-v3.0"
            ),
            properties=[
                Property(name="content", data_type=DataType.TEXT)
            ]
        )

    def _prepare_documents(self, df: pd.DataFrame) -> list[Document]:
        """
        Prepare separate English and French documents from DataFrame rows with enhanced natural language.
        """
        documents = []
        
        # Define semantic column groupings
        payment_context = ["FSCL_YR"]
        department_info = ["MINC", "MINE", "MINF", "DepartmentNumber-Numéro-de-Ministère", "DEPT_EN_DESC", "DEPT_FR_DESC"] 
        recipient_info = ["RCPNT_CLS_EN_DESC", "RCPNT_CLS_FR_DESC", "RCPNT_NML_EN_DESC", "RCPNT_NML_FR_DESC"]
        location_info = ["CTY_EN_NM", "CTY_FR_NM", "PROVTER_EN", "PROVTER_FR", "CNTRY_EN_NM", "CNTRY_FR_NM"]
        financial_info = ["TOT_CY_XPND_AMT", "AGRG_PYMT_AMT"]
    
        for idx, row in df.iterrows():
            # Skip rows with zero payment amount
            if row.get("AGRG_PYMT_AMT", 0) == 0:
                continue
                
            # Prepare structured data for both languages
            en_structured_data = {}
            fr_structured_data = {}
            
            # Process each column in the DataFrame
            for col in df.columns:
                value = row[col]
                if pd.isna(value):
                    continue
                
                # Get field information from data dictionary
                field_info = (self.data_dictionary.get_field_info(col) 
                            if self.data_dictionary else {'en_description': col, 'fr_description': col})
                
                # Store the original value in structured data
                col_lower = col.lower()
                if '_en_' in col_lower or col_lower.endswith('_en'):
                    en_structured_data[col] = value
                elif '_fr_' in col_lower or col_lower.endswith('_fr'):
                    fr_structured_data[col] = value
                else:
                    en_structured_data[col] = value
                    fr_structured_data[col] = value
        
            # Format values for narrative text - English
            fiscal_year = en_structured_data.get("FSCL_YR", "")
            dept_name = en_structured_data.get("DEPT_EN_DESC", "")
            ministry_code = en_structured_data.get("MINC", "")
            payment_amount = en_structured_data.get("AGRG_PYMT_AMT", 0)
            recipient_name = en_structured_data.get("RCPNT_NML_EN_DESC", "")
            recipient_class = en_structured_data.get("RCPNT_CLS_EN_DESC", "")
            city = en_structured_data.get("CTY_EN_NM", "")
            province = en_structured_data.get("PROVTER_EN", "")
            country = en_structured_data.get("CNTRY_EN_NM", "")
            
            # Format payment amount with commas
            formatted_payment = f"${payment_amount:,}" if isinstance(payment_amount, (int, float)) else payment_amount
            
            # Generate English narrative
            en_content = f"In fiscal year {fiscal_year}, the Department of {dept_name} (ministry code {ministry_code}) " \
                         f"made a payment of {formatted_payment} to {recipient_name}, categorized as {recipient_class}. "
            
            # Add location if available
            location_parts = [part for part in [city, province, country] if part and part.strip()]
            if location_parts:
                en_content += f"This recipient is located in {', '.join(location_parts)}."
            
            # Format values for narrative text - French
            fiscal_year_fr = fr_structured_data.get("FSCL_YR", "")
            dept_name_fr = fr_structured_data.get("DEPT_FR_DESC", "")
            ministry_code_fr = fr_structured_data.get("MINC", "")
            payment_amount_fr = fr_structured_data.get("AGRG_PYMT_AMT", 0)
            recipient_name_fr = fr_structured_data.get("RCPNT_NML_FR_DESC", "")
            recipient_class_fr = fr_structured_data.get("RCPNT_CLS_FR_DESC", "")
            city_fr = fr_structured_data.get("CTY_FR_NM", "")
            province_fr = fr_structured_data.get("PROVTER_FR", "")
            country_fr = fr_structured_data.get("CNTRY_FR_NM", "")
            
            # Format payment amount with commas
            formatted_payment_fr = f"{payment_amount_fr:,}$" if isinstance(payment_amount_fr, (int, float)) else payment_amount_fr
            
            # Generate French narrative
            fr_content = f"Pendant l'exercice financier {fiscal_year_fr}, le ministère de {dept_name_fr} " \
                     f"(code du ministère {ministry_code_fr}) a effectué un paiement de {formatted_payment_fr} " \
                     f"à {recipient_name_fr}, catégorisé comme {recipient_class_fr}. "
            
            # Add location if available
            location_parts_fr = [part for part in [city_fr, province_fr, country_fr] if part and part.strip()]
            if location_parts_fr:
                fr_content += f"Ce bénéficiaire est situé à {', '.join(location_parts_fr)}."
        
            # Create metadata with typed fields for Weaviate
            metadata = {
                "row_id": idx,
                "payment_type": "Transfer Payment",
                "fiscal_year": fiscal_year,
                "department_code": ministry_code,
                "department_name": dept_name,
                "recipient_name": recipient_name,
                "recipient_type": recipient_class,
                # Store numerical values in their native type
                "payment_amount": payment_amount,
                # Add geographical information for filtering
                "city": city,
                "province": province,
                "country": country
            }
        
            # Create documents with natural language and structured metadata
            documents.append(Document(
                text=en_content,
                metadata={**metadata, "language": "en"}
            ))
        
            # Create French document with French metadata
            fr_metadata = {
                "row_id": idx,
                "payment_type": "Paiement de transfert",
                "fiscal_year": fiscal_year_fr,
                "department_code": ministry_code_fr,
                "department_name": dept_name_fr,
                "recipient_name": recipient_name_fr,
                "recipient_type": recipient_class_fr,
                # Store numerical values in their native type
                "payment_amount": payment_amount_fr,
                # Add geographical information for filtering
                "city": city_fr,
                "province": province_fr,
                "country": country_fr
            }
                
            documents.append(Document(
                text=fr_content,
                metadata={**fr_metadata, "language": "fr"}
            ))
        
        return documents

    def close(self):
        """Close the Weaviate client connection."""
        if self.weaviate_client:
            self.weaviate_client.close()