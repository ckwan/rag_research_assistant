const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8001/api/v1';

/**
 * Check backend health
 */
export const checkApiHealth = async () => {
  const res = await fetch(`${API_URL}/health`);
  return res.ok ? 'connected' : 'error';
};

/**
 * Upload a single file
 */
export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const res = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      body: formData
    });

    if (res.ok) {
      const doc = await res.json();
      return doc;
    } else {
      const error = await res.json();
      alert(`Upload failed: ${error.detail}`);
    }
  } catch (err) {
    alert(`Upload error: ${err.message}`);
  }
};

/**
 * Perform RAG query
 */
export const performQuery = async (query, top_k = 3, threshold = 0.3) => {
  try {
    const res = await fetch(`${API_URL}/query`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: query,
        top_k: top_k,
        threshold: threshold
      })
    });

    if (res.ok) {
      const data = await res.json();
      return data;
    } else {
      const error = await res.json();
      alert(`Query failed: ${error.detail}`);
    }
  } catch (err) {
    alert(`Query error: ${err.message}. Make sure the backend is running on port 8000.`);
  }
};

/**
 * Reset system (delete all docs & vectors)
 */
export const resetSystem = async () => {
  const res = await fetch(`${API_URL}/reset`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Reset failed');
  return true;
};
