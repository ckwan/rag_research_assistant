import { Brain, Zap } from 'lucide-react';

const Results = ({ results, time }) => {
  if (!results) return null;

  return (
    <div className="mt-6 space-y-4">
      <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
        <h3 className="font-bold mb-2 flex items-center gap-2">
          <Brain className="w-5 h-5 text-green-400" />
          Answer
          {/* ({time.toFixed(0)}ms) */}
        </h3>
        <p className="text-gray-100 leading-relaxed whitespace-pre-wrap">{results.answer}</p>
      </div>
    </div>
  );
};

export default Results;
