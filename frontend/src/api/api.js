const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8001/api';

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

  const res = await fetch(`${API_URL}/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.detail || 'Upload failed');
  }

  return res.json();
};

/**
 * Perform RAG query
 */
export const performQuery = async (query, top_k = 3, threshold = 0.3) => {
  const res = await fetch(`${API_URL}/query`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, top_k, threshold }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.detail || 'Query failed');
  }

  return res.json();
};

/**
 * Reset system (delete all docs & vectors)
 */
export const resetSystem = async () => {
  const res = await fetch(`${API_URL}/reset`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Reset failed');
  return true;
};
