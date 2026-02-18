from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship, declarative_base
from datetime import datetime

Base = declarative_base()

class Document(Base):
    __tablename__ = "documents"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    uploaded_at = Column(DateTime, default=datetime.utcnow)
    num_chunks = Column(Integer)

class Chunk(Base):
    __tablename__ = "chunks"
    id = Column(Integer, primary_key=True, index=True)
    document_id = Column(Integer, ForeignKey("documents.id"))
    text = Column(Text)
    vector = Column(Text)  # store as JSON string for simplicity
    chunk_index = Column(Integer)
    document = relationship("Document", back_populates="chunks")

Document.chunks = relationship("Chunk", back_populates="document", cascade="all, delete")
