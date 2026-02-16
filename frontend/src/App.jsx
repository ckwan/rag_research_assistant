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
  const [showArchitecture, setShowArchitecture] = useState(false);
  const [stats, setStats] = useState(null);
  const [apiStatus, setApiStatus] = useState('checking');

  useEffect(() => {
    api.checkApiHealth(setApiStatus)
      .then(status => setApiStatus(status))
      .catch(() => setApiStatus('disconnected'));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <Header apiStatus={apiStatus} />
        {/* <StatsBar stats={stats} /> */}
        <UploadSection
          documents={documents}
          uploading={uploading}
          handleFileUpload={"/* pass handler */"}
          resetSystem={"/* pass handler */"}
          apiStatus={apiStatus}
        />
        <QuerySection
          query={query}
          setQuery={setQuery}
          documents={documents}
          performQuery={"/* pass handler */"}
          loading={loading}
          results={results}
          apiStatus={apiStatus}
        />
      </div>
    </div>
  );
}
