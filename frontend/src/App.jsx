import { useState, useEffect } from 'react';
import Header from './components/Header';
import StatsBar from './components/StatsBar';
import UploadSection from './components/UploadSection';
import QuerySection from './components/QuerySection';
import * as api from './api/api';

export default function App() {
  const [documents, setDocuments] = useState([]);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [stats, setStats] = useState(null);
  const [apiStatus, setApiStatus] = useState('checking');
  const [time, setTime] = useState(0);

  useEffect(() => {
    api.checkApiHealth(setApiStatus)
      .then(status => setApiStatus(status))
      .catch(() => setApiStatus('disconnected'));
  }, []);

  const handleFileUpload = async (e) => {
      const files = Array.from(e.target.files);
      setUploading(true);

      for (const file of files) {
        if (file.type === 'text/plain' || file.name.endsWith('.txt') || file.name.endsWith('.md')) {
          try {
            api.uploadFile(file)
              .then(doc => setDocuments(prev => [...prev, doc]))
              .catch(err => alert(`Upload failed: ${err.message}`));
          } catch (err) {
            alert(`Upload error: ${err.message}`);
          }
        } else {
          alert(`Unsupported file type: ${file.name}`);
        }
      }

      setUploading(false);
      e.target.value = '';
    };

  const resetSystem = async () => {
    if (!confirm('Delete all documents and vectors?')) return;

    try {
      const res = await api.resetSystem();
      if (res.ok) {
        setDocuments([]);
        setResults(null);
        setStats(null);
      }
    } catch (err) {
      alert(`Reset error: ${err.message}`);
    }
  };

  const callApi = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setResults(null);
    setTime(0);
    try {
      const start = performance.now();
      const data = await api.performQuery(query);
      const end = performance.now();
      setResults(data);
      setTime(end - start);
    } catch (err) {
      alert(`Query error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <Header apiStatus={apiStatus} />
        {/* <StatsBar stats={stats} /> */}
        <UploadSection
          documents={documents}
          uploading={uploading}
          handleFileUpload={handleFileUpload}
          resetSystem={resetSystem}
          apiStatus={apiStatus}
        />
        <QuerySection
          query={query}
          setQuery={setQuery}
          documents={documents}
          performQuery={callApi}
          loading={loading}
          results={results}
          time={time}
          apiStatus={apiStatus}
        />
      </div>
    </div>
  );
}
