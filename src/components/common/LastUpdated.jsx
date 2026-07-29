import { Clock } from 'lucide-react'

export default function LastUpdated({ date = '12 Juli 2026' }) {
  return (
    <div className="bg-surface-50 border-t border-surface-200">
      <div className="container-editorial px-6 md:px-12 py-4 flex items-center justify-center md:justify-start gap-2 text-surface-500">
        <Clock className="w-4 h-4" />
        <span className="text-xs md:text-sm font-medium">
          Terakhir diperbarui: {date}
        </span>
      </div>
    </div>
  )
}
