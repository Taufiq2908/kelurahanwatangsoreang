import { motion } from 'framer-motion'

/**
 * Reusable category filter pill row
 * Scrollable horizontally on mobile
 */
export default function CategoryFilter({ categories, active, onChange, className = '' }) {
  return (
    <div className={`flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide ${className}`}>
      {categories.map((cat) => {
        const isActive = active === cat.id
        return (
          <motion.button
            key={cat.id}
            onClick={() => onChange(cat.id)}
            whileTap={{ scale: 0.95 }}
            className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
              isActive
                ? 'bg-surface-900 text-white shadow-sm'
                : 'bg-white text-surface-600 border border-surface-200 hover:border-surface-400 hover:text-surface-900'
            }`}
          >
            {cat.label}
          </motion.button>
        )
      })}
    </div>
  )
}
