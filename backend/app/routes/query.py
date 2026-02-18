from fastapi import APIRouter, HTTPException
from app.services.embeddings import generate_embedding
from app.vector_store import VectorStore
from app.schemas.rag import QueryRequest
from app.services.llm import call_llm_api


router = APIRouter()
vector_store = VectorStore(persist=False)

@router.post("/query/", tags=["query"])
async def query_rag(request: QueryRequest):
    if vector_store.collection.count() == 0:
        raise HTTPException(status_code=400, detail="No documents uploaded")

    query_embedding = generate_embedding(request.query)
    results = vector_store.query(query_embedding, top_k=5)

    if not results or not results.get("documents"):
        return "No relevant documents found."

    # Extract top-k chunks
    top_chunks = results["documents"][0]  # Chroma returns nested list

    # Join into context
    context = "\n\n---\n\n".join(top_chunks)

    # Call LLM with context and user query
    answer = call_llm_api(context, request.query)

    return {"answer": answer}


@router.get("/stats", tags=["query"])
async def inspect_chroma():
    vector_store = chromadb.PersistentClient(path="./chroma_db")
    collection = vector_store.get_collection(name="documents")
    return {
        "total_vectors": collection.count(),
        "collection_name": collection.name
    }
