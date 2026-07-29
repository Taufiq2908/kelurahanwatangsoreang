import { FileDown, FileText } from 'lucide-react'

export default function AttachmentList({ attachments = [] }) {
  if (!attachments || attachments.length === 0) return null

  return (
    <div className="mt-12 bg-surface-50 border border-surface-200 rounded-2xl p-6 md:p-8">
      <h3 className="text-sm md:text-base font-bold text-surface-900 mb-4 flex items-center gap-2">
        <FileText className="w-5 h-5 text-emerald-600" />
        Dokumen Lampiran
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {attachments.map((file, idx) => (
          <a 
            key={idx}
            href={file.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-4 bg-white border border-surface-200 rounded-xl hover:border-emerald-300 hover:shadow-sm transition-all group"
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
                <span className="text-red-600 text-xs font-black uppercase">{file.type || 'PDF'}</span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-surface-900 truncate group-hover:text-emerald-700 transition-colors">
                  {file.name}
                </p>
                <p className="text-xs font-medium text-surface-500 mt-0.5">
                  {file.size}
                </p>
              </div>
            </div>
            <FileDown className="w-5 h-5 text-surface-400 group-hover:text-emerald-600 transition-colors flex-shrink-0 ml-4" />
          </a>
        ))}
      </div>
    </div>
  )
}
