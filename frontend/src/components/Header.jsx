import { Brain, Database } from 'lucide-react';

export default function Header({ apiStatus }) {
  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center gap-3 mb-4">
        <Brain className="w-12 h-12 text-purple-400" />
        <h1 className="text-4xl font-bold">AI Research Assistant</h1>
      </div>
      <p className="text-gray-300 text-lg mb-3">RAG-Powered Document Analysis System</p>
      <div className="flex items-center justify-center gap-2 mb-3">
        <div className={`w-2 h-2 rounded-full ${
          apiStatus === 'connected' ? 'bg-green-400' :
          apiStatus === 'disconnected' ? 'bg-red-400' : 'bg-yellow-400'
        }`} />
        <span className="text-sm">
          {apiStatus === 'connected' ? 'Backend Connected' :
           apiStatus === 'disconnected' ? 'Backend Offline - Start server on port 8001' :
           'Checking connection...'}
        </span>
      </div>
    </div>
  );
}
