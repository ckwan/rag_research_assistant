from fastapi import APIRouter, UploadFile, File
from app.embeddings import generate_embedding
from app.vector_store import VectorStore
import os

router = APIRouter()
vector_store = VectorStore(persist=True)


UPLOAD_DIR = "uploaded_docs"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/upload")
async def upload_documents(files: list[UploadFile] = File(...)):
    results = []
    # for file in files:
    #     text = await file.read()
    #     text = text.decode()
    #     chunks = chunk_text(text)
    #     doc_id = save_document(file.filename, len(chunks))
    #     save_chunks(doc_id, chunks)
    #     embeddings = [generate_embedding(c) for c in chunks]
    #     vector_store.add_vectors(embeddings, [doc_id]*len(chunks))
    #     results.append({"file": file.filename, "chunks": len(chunks)})
    return {"status": "success", "files": results}

