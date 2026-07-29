import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const categoryColors = {
  pelayanan:    { bg: 'bg-primary-50',  text: 'text-primary-700' },
  administrasi: { bg: 'bg-blue-50',    text: 'text-blue-700' },
  kependudukan: { bg: 'bg-emerald-50', text: 'text-emerald-700' },
  umum:         { bg: 'bg-amber-50',   text: 'text-amber-700' },
}

export default function FaqAccordion({ items }) {
  const [openId, setOpenId] = useState(null)

  const toggle = (id) => setOpenId((prev) => (prev === id ? null : id))

  return (
    <div className="space-y-2">
      {items.map((item, index) => {
        const isOpen = openId === item.id
        const colors = categoryColors[item.category] || { bg: 'bg-surface-50', text: 'text-surface-600' }

        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.04, duration: 0.3 }}
            className={`card overflow-hidden transition-shadow duration-200 ${isOpen ? 'shadow-card-hover' : ''}`}
          >
            {/* Question row */}
            <button
              onClick={() => toggle(item.id)}
              className="w-full flex items-start gap-3 px-4 py-4 text-left"
              aria-expanded={isOpen}
            >
              {/* Number badge */}
              <div className={`w-6 h-6 rounded-lg ${colors.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                <span className={`text-[10px] font-black ${colors.text}`}>{index + 1}</span>
              </div>

              <p className={`flex-1 text-sm font-semibold leading-snug transition-colors duration-200 ${
                isOpen ? 'text-primary-700' : 'text-surface-800'
              }`}>
                {item.question}
              </p>

              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.25 }}
                className="flex-shrink-0 mt-0.5"
              >
                <ChevronDown className={`w-4.5 h-4.5 transition-colors duration-200 ${
                  isOpen ? 'text-primary-500' : 'text-surface-400'
                }`} style={{ width: 18, height: 18 }} />
              </motion.div>
            </button>

            {/* Answer panel */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="answer"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 pt-0">
                    <div className="border-t border-surface-100 pt-3">
                      <p className="text-sm text-surface-600 leading-relaxed">{item.answer}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )
      })}
    </div>
  )
}
