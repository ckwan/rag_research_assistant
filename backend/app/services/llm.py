import requests

OLLAMA_URL = "http://host.docker.internal:11434/api/generate"
OLLAMA_MODEL = "llama3.2:latest"  # make sure this matches `ollama list`


def call_llm_api(context: str, query: str) -> str:
    """
    Call the Ollama API with the given context and query
    :param context: The retrieved document chunks to provide as context
    :param query: The user's original question
    :return: The generated answer from the LLM
    """
    payload = {
        "model": OLLAMA_MODEL,
        "prompt": f"""
        System: You are a helpful AI research assistant. Answer the question using ONLY the context below.
        If the answer is not contained in the context, say: "I don't have enough information in the provided documents."

        User: Context:
        {context}

        Question:
        {query}""",
        "max_tokens": 500,
        "temperature": 0.7,
        "stream": False
    }

    try:
        response = requests.post(OLLAMA_URL, json=payload)
        response.raise_for_status()
        data = response.json()

        return data["response"]
    except requests.RequestException as e:
        print(f"Error calling LLM API: {e}")
        return "Sorry, I couldn't generate an answer at this time."