from app.database.context import db_session
from sqlalchemy.orm import Session
from app.models import Document, Chunk
from app.vector_store import VectorStore
from app.services import embeddings


# def save_document(filename: str, chunk_count: int):
#     conn = get_connection()
#     cursor = conn.cursor()

#     cursor.execute(
#         "INSERT INTO documents (filename, chunk_count) VALUES (?, ?)",
#         (filename, chunk_count)
#     )

#     doc_id = cursor.lastrowid
#     conn.commit()
#     conn.close()

#     return doc_id


# def save_chunks(doc_id: int, chunks: list[str]):
#     conn = get_connection()
#     cursor = conn.cursor()

#     for chunk in chunks:
#         cursor.execute(
#             "INSERT INTO chunks (document_id, content) VALUES (?, ?)",
#             (doc_id, chunk)
#         )

#     conn.commit()
#     conn.close()

vector_store = VectorStore(persist=False)

def create_document(db: Session, name: str):
    db = get_connection()
    doc = Document(name=name)
    db.add(doc)
    db.commit()
    db.refresh(doc)
    return doc

def save_document(filename: str, chunks: list[str]):
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
            embeddings_list = [embeddings.generate_embedding(c) for c in chunks]
            vector_store.add_documents(chunks, embeddings_list, doc.id)

        return doc
    except Exception as e:
        print(f"Error saving document: {e}")
        raise

def get_document_by_id(db: Session, doc_id: int):
    return db.query(Document).filter(Document.id == doc_id).first()

def get_all_documents(db: Session):
    return db.query(Document).all()
