from llama_index.core.indices import VectorStoreIndex

class QueryEngine:
    def __init__(self, index: VectorStoreIndex):
        self.index = index
        self.query_engine = index.as_query_engine(
            similarity_top_k=10,
            response_mode="no_text"
        )

    async def query(self, question: str) -> str:
        try:
            response = self.query_engine.query(question)
            # Extract just the text content from each source node
            source_texts = [node.text for node in response.source_nodes]
            return "\n".join(source_texts)
        except Exception as e:
            raise Exception(f"Error querying index: {str(e)}") from e