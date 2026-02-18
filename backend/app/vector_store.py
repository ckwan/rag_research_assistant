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
        # chromadb.CloudClient(
        #   api_key="${CHROMA_API_KEY}",
        #   tenant="${CHROMA_TENANT_ID}",
        #   database="{DATABASE_NAME}"
        # )
        self.client = chromadb.PersistentClient(path=persist_dir)

        # Create or get the collection
        self.collection = self.client.get_or_create_collection(name="documents")

    def add_documents(self, chunks, embeddings, doc_id):
        if len(chunks) != len(embeddings):
            raise ValueError("Length of chunks and embeddings must match")

        collection = self.client.get_or_create_collection(name="documents")
        collection.add(
            documents=chunks,
            metadatas=[{"doc_id": doc_id} for _ in chunks],
            ids=[f"{doc_id}_{i}" for i in range(len(chunks))],
            embeddings=embeddings
        )


    def query(self, embedding, top_k=3):
        collection = self.client.get_or_create_collection(name="documents")
        return collection.query(query_embeddings=[embedding], n_results=top_k)

    def persist(self):
        """
        Persist the vector database to disk (if enabled)
        """
        if hasattr(self.client, "persist"):
            self.client.persist()
