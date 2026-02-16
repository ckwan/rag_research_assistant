import { Database, Upload, Brain, ChevronDown, ChevronUp } from 'lucide-react';

export default function ArchitecturePanel({ showArchitecture, setShowArchitecture }) {
  return (
    <div className="mb-6">
      <button
        onClick={() => setShowArchitecture(!showArchitecture)}
        className="w-full bg-slate-800/50 hover:bg-slate-800 px-4 py-3 rounded-lg flex items-center justify-between transition-all"
      >
        <span className="font-semibold flex items-center gap-2">
          <Database className="w-5 h-5" />
          System Architecture
        </span>
        {showArchitecture ? <ChevronUp /> : <ChevronDown />}
      </button>


      {showArchitecture && (
        <div className="mt-4 bg-slate-800/50 p-6 rounded-lg space-y-4">
          {/* Your 3 step boxes and pipeline description */}
          {/* Could further break into StepBox component */}
        </div>
      )}
    </div>
  );
}
