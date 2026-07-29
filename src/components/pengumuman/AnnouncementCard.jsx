import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, AlertCircle, Info, ChevronRight } from 'lucide-react'

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

export default function AnnouncementCard({ item, index = 0, showDetail = true }) {
  const isImportant = item.priority === 'important' || item.important === true

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.3 }}
    >
      <div
        className={`bg-white rounded-2xl border transition-all duration-300 hover:shadow-md ${
          isImportant
            ? 'border-rose-200 shadow-sm hover:border-rose-300'
            : 'border-surface-200 hover:border-emerald-200 hover:shadow-emerald-500/5'
        }`}
      >
        <div className="p-5 md:p-6">
          {/* Priority badge */}
          <div className="flex items-center gap-3 mb-4">
            {isImportant ? (
              <div className="flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-rose-500 flex-shrink-0" />
                <span className="badge bg-rose-50 text-rose-700 text-[10px] md:text-xs font-bold px-2.5 py-1 border border-rose-100 uppercase tracking-widest">
                  Penting
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <Info className="w-4 h-4 text-surface-400 flex-shrink-0" />
                <span className="badge bg-surface-50 text-surface-600 text-[10px] md:text-xs font-bold px-2.5 py-1 border border-surface-200 uppercase tracking-widest">
                  Informasi
                </span>
              </div>
            )}
            {item.category && (
              <>
                <div className="w-1 h-1 rounded-full bg-surface-300" />
                <span className="text-[10px] md:text-xs font-semibold text-surface-500 uppercase tracking-widest">
                  {item.category}
                </span>
              </>
            )}
          </div>

          {/* Title */}
          <h3
            className={`text-base md:text-lg font-bold leading-snug mb-3 line-clamp-2 break-words ${
              isImportant ? 'text-rose-950' : 'text-surface-900'
            }`}
          >
            {item.title}
          </h3>

          {/* Content preview */}
          <p className="text-sm text-surface-600 leading-relaxed line-clamp-2 mb-6 break-words">
            {(item.description || item.content || '').replace(/\n/g, ' ').substring(0, 160)}...
          </p>

          {/* Footer */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-surface-100">
            <span className="flex items-center gap-2 text-xs font-medium text-surface-500">
              <Calendar className="w-4 h-4 text-surface-400" />
              {formatDate(item.date)}
            </span>
            {showDetail && (
              <Link
                to={`/pengumuman/${item.id}`}
                className={`inline-flex items-center justify-center gap-2 text-xs font-bold px-4 py-2 rounded-lg transition-colors group ${
                  isImportant
                    ? 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                    : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                }`}
              >
                Baca Selengkapnya
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
