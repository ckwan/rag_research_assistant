from fastapi import APIRouter, HTTPException
from app.embeddings import generate_embedding
from app.vector_store import VectorStore
from app.schemas.rag import QueryRequest
# from app.llm import call_llm_api  # implement a wrapper for Claude/OpenAI API

router = APIRouter()
vector_store = VectorStore(persist=True)

@router.post("/query/", tags=["query"])
async def query_rag(request: QueryRequest):
    if len(vector_store.collection.count()) == 0:
        raise HTTPException(status_code=400, detail="No documents uploaded")

    query_embedding = generate_embedding(request.query)
    results = vector_store.search(query_embedding, top_k=3)

    # Combine retrieved chunks for LLM input
    context = "\n".join([meta['text'] for meta in results if meta])

    # Call LLM with context and user query
    # answer = call_llm_api(context, request.query)

    # For now, return dummy answer
    answer = "This is a placeholder answer."

    return {"answer": answer}

