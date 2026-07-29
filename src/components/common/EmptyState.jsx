import { motion } from 'framer-motion'
import { SearchX, FolderOpen } from 'lucide-react'

/**
 * Reusable empty state component
 * Shown when search/filter yields no results
 */
export default function EmptyState({
  title = 'Tidak ditemukan',
  description = 'Coba kata kunci atau filter yang berbeda.',
  icon: Icon = SearchX,
  action = null,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col items-center text-center py-14 px-6"
    >
      <div className="w-16 h-16 rounded-3xl bg-surface-100 flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-surface-400" />
      </div>
      <p className="text-base font-bold text-surface-700 mb-1">{title}</p>
      <p className="text-sm text-surface-400 leading-relaxed max-w-xs">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </motion.div>
  )
}
