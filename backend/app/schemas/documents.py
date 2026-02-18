from pydantic import BaseModel

class DocumentOut(BaseModel):
    id: int
    name: str
    chunks: int

class DocumentOut(BaseModel):
    id: int
    name: str
    num_chunks: int
    chunks: list[str]
