export default function StatsBar({ stats }) {
  if (!stats) return null;
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 mb-6 border border-purple-500/20">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div>
          <div className="text-2xl font-bold text-purple-400">{stats.total_documents}</div>
          <div className="text-sm text-gray-400">Documents</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-blue-400">{stats.total_chunks}</div>
          <div className="text-sm text-gray-400">Chunks</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-green-400">{stats.vector_dimension}</div>
          <div className="text-sm text-gray-400">Dimensions</div>
        </div>
        <div>
          <div className="text-sm font-mono text-gray-300">{stats.model}</div>
          <div className="text-sm text-gray-400">Embedding Model</div>
        </div>
      </div>
    </div>
  );
}
