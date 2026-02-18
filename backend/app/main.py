from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.models import Document
from app.services.embeddings import generate_embedding
from sqlalchemy.orm import Session
from typing import List
from app.routes import query, upload, reset
from app.database.database import engine
from .models import Base

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="RAG Research Assistant",
    description="Upload documents, perform semantic search, and get AI-generated answers using RAG.",
    version="1.0.0"
)

version = "v1"
app.router.prefix = "/api/{version}"
app.include_router(upload.router, tags=["upload"])
app.include_router(query.router, tags=["query"])
app.include_router(reset.router, tags=["delete"])

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For dev, later restrict to frontend domain
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/health")
def health_check():
    return {"status": "ok"}
