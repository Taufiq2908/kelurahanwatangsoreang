import { motion } from 'framer-motion'
import { WifiOff, RefreshCw } from 'lucide-react'

/**
 * User-friendly error state — never shows raw error messages.
 */
export default function ErrorState({
  message = 'Informasi belum tersedia. Silakan coba kembali nanti.',
  onRetry = null,
  className = '',
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className={`flex flex-col items-center text-center py-12 px-6 ${className}`}
    >
      <div className="w-14 h-14 rounded-2xl bg-surface-100 flex items-center justify-center mb-4">
        <WifiOff className="w-7 h-7 text-surface-400" />
      </div>
      <p className="text-sm font-bold text-surface-700 mb-1">Tidak dapat memuat konten</p>
      <p className="text-xs text-surface-400 leading-relaxed max-w-xs mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-50 text-primary-700 text-sm font-semibold hover:bg-primary-100 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Coba Lagi
        </button>
      )}
    </motion.div>
  )
}
