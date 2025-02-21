import os
import pandas as pd
from typing import Optional
from llama_index.core import Document, VectorStoreIndex, StorageContext, Settings
from llama_index.vector_stores.weaviate import WeaviateVectorStore
from llama_index.embeddings.openai import OpenAIEmbedding
import weaviate
from weaviate.embedded import EmbeddedOptions
from weaviate.collections import Collection
from weaviate.config import Config
import openai

class CSVIndexer:
    def __init__(self):
        # Initialize Weaviate client using v4 syntax
        http_port = int(os.getenv('WEAVIATE_PORT'))
        grpc_port = http_port + 1  # Use next port for gRPC
        
        self.weaviate_client = weaviate.WeaviateClient(
            connection_params=weaviate.connect.ConnectionParams(
                http={
                    "host": os.getenv('WEAVIATE_HOST'),
                    "port": http_port,
                    "secure": False,
                    "headers": {
                        "X-OpenAI-Api-Key": os.getenv("OPENAI_API_KEY")
                    }
                },
                grpc={
                    "host": os.getenv('WEAVIATE_HOST'),
                    "port": grpc_port,
                    "secure": False
                }
            )
        )
        
        # Initialize OpenAI client
        openai.api_key = os.getenv("OPENAI_API_KEY")
        
        # Initialize OpenAI embedding model
        self.embed_model = OpenAIEmbedding(
            api_key=os.getenv("OPENAI_API_KEY"),
            model="text-embedding-ada-002"
        )
        
        # Configure global settings
        Settings.embed_model = self.embed_model
        Settings.chunk_size = 512
        Settings.chunk_overlap = 20

    async def initialize_and_index(self, csv_path: str):
        try:
            # Read CSV file
            df = pd.read_csv(csv_path)
            
            # Create a class in Weaviate if it doesn't exist
            class_name = "CanadaSpends"
            self._create_weaviate_schema(class_name)
            
            # Convert DataFrame to documents
            documents = self._prepare_documents(df)
            
            # Create vector store
            vector_store = WeaviateVectorStore(
                weaviate_client=self.weaviate_client,
                index_name=class_name,
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
            print(f"Error during initialization: {str(e)}")
            raise

    def _create_weaviate_schema(self, class_name: str):
        # Delete if exists
        try:
            self.weaviate_client.collections.delete(class_name)
        except:
            pass
        
        # Create collection with v4 syntax
        collection = Configure.new_collection(
            name=class_name,
            vectorizer_config=Configure.Vectorizer.text2vec_openai(),
            properties=[
                {
                    "name": "content",
                    "dataType": ["text"],
                    "description": "The content of the document",
                    "indexFilterable": True,
                    "indexSearchable": True
                }
            ]
        )
        
        self.weaviate_client.collections.create(collection)

    def _prepare_documents(self, df: pd.DataFrame) -> list[Document]:
        documents = []
        
        for _, row in df.iterrows():
            # Create a structured text representation of the row
            content = f"""
            Department: {row['MINE']} ({row['MINF']})
            Fiscal Year: {row['FSCL_YR']}
            Description: {row['Description_EN']} ({row['Description_FR']})
            Total Net Expenditure: {row['Ttl-min-net-exp_Ttl-dép-min-nettes']}
            Consolidated Special Purpose Accounts: {row['Cons-spec-purpose-accnts_Cmpts-fins-dét-cons']}
            Accrual and Other Adjustments: {row['Accrual-and-other-adjs_Redressements-courus-et-autres']}
            Consolidated Crown Corps: {row["Cons-Crown-corps-and-other-ents_Socs-d'État-et-autres-ents-cons"]}
            Tax Credits and Repayments: {row['Tax-credits-and-repayments_Crédits-et-remboursements-fiscaux']}
            Internal Expenses: {row['Internal-expenses_Charges-internes']}
            """
            
            documents.append(Document(text=content))
        
        return documents