import chromadb
from typing import List, Dict, Any
import numpy as np

# https://docs.trychroma.com/docs/overview/migration

class VectorStore:
    def __init__(self, persist: bool = False, persist_dir: str = "./chroma_db"):
        """
        Initialize Chroma vector store
        :param persist: whether to persist vectors to disk
        :param persist_dir: directory to persist Chroma DB
        """
        if persist:
            self.client = chromadb.PersistentClient(path="./chroma_db")
        else:
            self.client = chromadb.Client()

        # Create or get the collection
        self.collection = self.client.get_or_create_collection(name="documents")

    def add_documents(self, documents: List[str], metadatas: List[Dict[str, Any]], ids: List[str]):
        """
        Add text documents to the vector store with metadata
        """
        if len(documents) != len(ids) or len(documents) != len(metadatas):
            raise ValueError("Length of documents, ids, and metadatas must match")

        self.collection.add(
            documents=documents,
            metadatas=metadatas,
            ids=ids
        )

    def query(self, query_embedding: List[float], n_results: int = 3):
        """
        Query top-n similar documents by embedding
        :param query_embedding: embedding vector of query
        :param n_results: number of results to return
        """
        results = self.collection.query(
            query_embeddings=[query_embedding],
            n_results=n_results
        )
        # Return list of documents with metadata and score
        hits = []
        for i in range(len(results['ids'][0])):
            hits.append({
                "id": results['ids'][0][i],
                "document": results['documents'][0][i],
                "metadata": results['metadatas'][0][i],
                "score": results['distances'][0][i]
            })
        return hits

    def persist(self):
        """
        Persist the vector database to disk (if enabled)
        """
        if hasattr(self.client, "persist"):
            self.client.persist()
