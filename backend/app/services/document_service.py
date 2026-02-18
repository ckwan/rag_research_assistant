from app.database.context import db_session
from sqlalchemy.orm import Session
from app.models import Document, Chunk
from app.vector_store import VectorStore
from app.services.embeddings import generate_embedding
from sentence_transformers import SentenceTransformer


vector_store = VectorStore(persist=False)

def save_document(filename: str, chunks: list[str]):
    model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")
    try:

        with db_session() as db:
            doc = Document(name=filename, num_chunks=len(chunks))
            db.add(doc)

            db.flush()

            for i, chunk_text in enumerate(chunks):
                chunk = Chunk(
                    document_id=doc.id,
                    text=chunk_text,
                    chunk_index=i
                )
                db.add(chunk)

            db.refresh(doc)
            embeddings_list = model.encode(chunks)
            vector_store.add_documents(chunks, embeddings_list, doc.id)

        return doc
    except Exception as e:
        print(f"Error saving document: {e}")
        raise

