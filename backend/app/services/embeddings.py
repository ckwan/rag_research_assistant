import numpy as np

def generate_embedding(text: str, dim: int = 384):
    vec = np.zeros(dim)
    for i, char in enumerate(text):
        vec[ord(char) % dim] += np.sin(i + ord(char))
    norm = np.linalg.norm(vec)
    return (vec / norm).tolist() if norm > 0 else vec.tolist()
