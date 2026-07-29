import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

/**
 * Reusable inner-page header banner
 * Used at the top of all full-implemented pages
 */
export default function PageHeader({
  title,
  subtitle,
  icon: Icon = null,
  showBack = false,
  backPath = -1
}) {
  const navigate = useNavigate()

  return (
    <div className="relative border-b border-surface-200 bg-surface-50 pt-16 pb-12 md:pt-24 md:pb-16 overflow-hidden">
      <div className="container-editorial px-6 md:px-12 relative z-10">
        
        {/* Back button */}
        {showBack && (
          <button
            onClick={() => navigate(backPath)}
            className="flex items-center gap-2 text-[11px] md:text-xs font-bold uppercase tracking-[0.15em] text-surface-500 hover:text-emerald-700 transition-colors mb-6 md:mb-8 outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 rounded"
          >
            <ArrowLeft className="w-3.5 h-3.5 md:w-4 md:h-4" strokeWidth={2.5} />
            Kembali
          </button>
        )}

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6"
        >
          {Icon && (
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-white border border-surface-200 shadow-sm flex items-center justify-center flex-shrink-0 text-emerald-700">
              <Icon className="w-6 h-6 md:w-8 md:h-8" strokeWidth={2} />
            </div>
          )}
          <div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-surface-900 leading-tight tracking-tight mb-2 md:mb-3">
              {title}
            </h1>
            {subtitle && (
              <p className="text-sm md:text-base text-surface-600 font-medium leading-relaxed max-w-2xl">
                {subtitle}
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
