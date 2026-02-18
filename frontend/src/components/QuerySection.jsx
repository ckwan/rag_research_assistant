import { Search, Loader2, Brain, Zap } from 'lucide-react';
import Results from './Results';

export default function QuerySection({
  query, setQuery, documents, performQuery, loading, results, time, apiStatus
}) {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Search className="w-5 h-5" />
        Ask Questions
      </h2>

      <div className="flex gap-3 mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && performQuery()}
          placeholder="Ask anything about your documents..."
          className="flex-1 bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
          disabled={documents.length === 0 || apiStatus !== 'connected'}
        />
        <button
          onClick={performQuery}
          disabled={!query.trim() || documents.length === 0 || loading || apiStatus !== 'connected'}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:cursor-not-allowed px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Processing
            </>
          ) : (
            <>
              <Search className="w-5 h-5" />
              Search
            </>
          )}
        </button>
      </div>

      {!documents.length && (
        <p className="text-gray-400 text-sm text-center py-4">
          Upload documents first to start asking questions
        </p>
      )}

      {results && <Results results={results} time={time} />}
    </div>
  );
}
