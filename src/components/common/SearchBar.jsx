import { Search, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Reusable search bar component
 */
export default function SearchBar({ value, onChange, placeholder = 'Cari...', className = '' }) {
  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400 pointer-events-none" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white border border-surface-200 rounded-xl pl-10 pr-10 py-2.5 text-sm text-surface-800 placeholder-surface-400 outline-none focus:border-surface-400 focus:ring-2 focus:ring-surface-200/60 transition-all duration-200"
      />
      <AnimatePresence>
        {value && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
            onClick={() => onChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-surface-200 flex items-center justify-center hover:bg-surface-300 transition-colors"
            aria-label="Hapus pencarian"
          >
            <X className="w-3 h-3 text-surface-600" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
