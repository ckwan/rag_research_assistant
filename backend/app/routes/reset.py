from fastapi import APIRouter

from app.crud import reset_postgres, reset_vector_store

router = APIRouter()

@router.delete("/reset", tags=["delete"])
def reset_system():
    reset_postgres()
    reset_vector_store()

    return {"status": "System reset successfully"}
