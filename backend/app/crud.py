# crud.py
from sqlalchemy.orm import Session
from app.models import Document, Chunk
from sqlalchemy import text
from app.database.context import db_session
import chromadb

def create_document(db: Session, name: str):
    doc = Document(name=name)
    db.add(doc)
    db.commit()
    db.refresh(doc)
    return doc

def save_document(db: Session, filename: str, chunks: list):
    """Save a new document and its chunks into PostgreSQL."""
    doc = Document(name=filename)
    db.add(doc)
    db.commit()
    db.refresh(doc)

    for i, chunk_text in enumerate(chunks):
        chunk = Chunk(
            document_id=doc.id,
            text=chunk_text,
            chunk_index=i
        )
        db.add(chunk)
    db.commit()
    return doc.id

def get_document_by_id(db: Session, doc_id: int):
    return db.query(Document).filter(Document.id == doc_id).first()

def get_all_documents(db: Session):
    return db.query(Document).all()


def reset_postgres():
    with db_session() as db:
        db.execute(text("TRUNCATE TABLE chunks RESTART IDENTITY CASCADE;"))
        db.execute(text("TRUNCATE TABLE documents RESTART IDENTITY CASCADE;"))


def reset_vector_store():
    client = chromadb.PersistentClient(path="./chroma_db")

    try:
        client.delete_collection("documents")
    except Exception:
        Exception("Collection may not exist, skipping deletion.")

    client.create_collection("documents")

