import { Brain, Zap } from 'lucide-react';

const Results = ({ results, time }) => {
  if (!results) return null;

  return (
    <div className="mt-6 space-y-4">
      {/* Answer */}
      <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
        <h3 className="font-bold mb-2 flex items-center gap-2">
          <Brain className="w-5 h-5 text-green-400" />
          Answer ({time.toFixed(0)}ms)
        </h3>
        <p className="text-gray-100 leading-relaxed whitespace-pre-wrap">{results.answer}</p>
      </div>

      {/* Reasoning
      <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
        <h3 className="font-bold mb-2">Pipeline Execution</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-start gap-2">
            <Zap className="w-4 h-4 text-purple-400 mt-0.5" />
            <span className="text-gray-300">{results.reasoning.embedding}</span>
          </div>
          <div className="flex items-start gap-2">
            <Zap className="w-4 h-4 text-purple-400 mt-0.5" />
            <span className="text-gray-300">{results.reasoning.retrieval}</span>
          </div>
          <div className="flex items-start gap-2">
            <Zap className="w-4 h-4 text-purple-400 mt-0.5" />
            <span className="text-gray-300">{results.reasoning.generation}</span>
          </div>
        </div>
      </div>


      <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
        <h3 className="font-bold mb-3">Retrieved Sources (Top-K)</h3>
        <div className="space-y-3">
          {results.sources.map((source, i) => (
            <div key={i} className="bg-slate-900/50 p-3 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <span className="font-medium text-blue-400">
                  {source.filename} (Chunk {source.chunk_index}/{source.total_chunks})
                </span>
                <span className="text-xs bg-blue-500/20 px-2 py-1 rounded">
                  {source.similarity}% match
                </span>
              </div>
              <p className="text-sm text-gray-400">{source.preview}</p>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default Results;
