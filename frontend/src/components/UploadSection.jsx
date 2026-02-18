import { Upload, FileText, Trash2, Loader2 } from 'lucide-react';

export default function UploadSection({
  documents,
  uploading,
  handleFileUpload,
  resetSystem,
  apiStatus
}) {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 mb-6 border border-purple-500/20">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Upload className="w-5 h-5" />
          Document Upload
        </h2>
        {documents.length > 0 && (
          <button
            onClick={resetSystem}
            className="text-red-400 hover:text-red-300 flex items-center gap-2 text-sm"
          >
            <Trash2 className="w-4 h-4" />
            Reset All
          </button>
        )}
      </div>
      <label className="block">
        <div className="border-2 border-dashed border-purple-500/50 rounded-lg p-8 text-center hover:border-purple-500 transition-colors cursor-pointer bg-slate-900/30">
          <FileText className="w-12 h-12 mx-auto mb-3 text-purple-400" />
          {uploading ? (
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Processing...</span>
            </div>
          ) : (
            <>
              <p className="text-lg mb-2">Drop text files or click to upload</p>
              <p className="text-sm text-gray-400">Supports .txt and .md files</p>
            </>
          )}
          <input
            type="file"
            multiple
            accept=".txt,.md"
            onChange={handleFileUpload}
            className="hidden"
            disabled={uploading || apiStatus !== 'connected'}
          />
        </div>
      </label>
    </div>
  );
}
