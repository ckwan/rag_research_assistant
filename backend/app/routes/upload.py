from fastapi import APIRouter, UploadFile, File
from app.services.document_service import save_document
from app.vector_store import VectorStore
import os
from app.schemas.documents import DocumentOut
from app.utils.text_splitter import chunk_text

router = APIRouter()
vector_store = VectorStore(persist=False)


UPLOAD_DIR = "uploaded_docs"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/upload", response_model=DocumentOut)
async def upload_documents(file: UploadFile = File(...)):
    text = await file.read()
    text = text.decode()

    chunks = chunk_text(text)
    doc = save_document(file.filename, chunks)


    # return DocumentOut(id=doc.id, name=doc.name, chunks=doc.chunks)
    return {
        "id": doc.id,
        "name": doc.name,
        "num_chunks": doc.num_chunks,
        "chunks": chunks
    }
