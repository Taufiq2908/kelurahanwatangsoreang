import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { AlertCircle, BellRing } from 'lucide-react'
import { useAnnouncements } from '@/hooks/useAnnouncements'
import { fadeUpStaggerItemVariants, staggerContainerVariants } from '@/design/motion'
import SectionHeader from '@/components/common/SectionHeader'

export default function AnnouncementPreview() {
  const { data, loading, error } = useAnnouncements({ limit: 4 })

  if (loading || error || data.length === 0) return null

  const formatAbsoluteDate = (dateString) => {
    try {
      const d = new Date(dateString)
      return new Intl.DateTimeFormat('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }).format(d)
    } catch {
      return dateString
    }
  }

  return (
    <section className="pt-16 md:pt-24 pb-8 md:pb-12 bg-surface-50 border-t border-surface-200">
      <div className="container-editorial px-6 md:px-12">
        <SectionHeader 
          label="Pusat Informasi"
          title="Pengumuman Resmi"
          description="Edaran dan informasi terbaru dari Kelurahan Watang Soreang."
          linkText="Arsip Pengumuman"
          linkTo="/pengumuman"
          icon={BellRing}
        />

        <motion.div 
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col border-l-2 border-surface-200 ml-2 md:ml-4"
        >
          {data.map((item, idx) => {
            const isImportant = item.priority === 'important'
            const isLatest = idx === 0 && !isImportant
            
            let label = ''
            let dotColor = 'bg-surface-300'
            let textColor = 'text-surface-900'
            
            if (isImportant) {
              label = 'Prioritas'
              dotColor = 'bg-rose-500'
              textColor = 'text-rose-900'
            } else if (isLatest) {
              label = 'Terbaru'
              dotColor = 'bg-emerald-500'
              textColor = 'text-surface-900'
            } else {
              label = 'Arsip'
              dotColor = 'bg-surface-300 group-hover:bg-surface-400'
              textColor = 'text-surface-700'
            }

            return (
              <motion.div
                key={item.id}
                variants={fadeUpStaggerItemVariants}
                className="relative pl-6 md:pl-10 pb-8 group"
              >
                {/* Timeline Dot */}
                <div className={`absolute left-[-5px] top-1.5 w-2 h-2 rounded-full ring-4 ring-white transition-colors duration-300 ${dotColor}`} />

                <Link 
                  to={`/pengumuman/${item.id}`} 
                  className="block group outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 rounded"
                >
                  <div className="flex flex-wrap items-center gap-3 mb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-surface-500">
                      {formatAbsoluteDate(item.date)}
                    </span>
                    {label !== 'Arsip' && (
                      <>
                        <div className="w-1 h-1 rounded-full bg-surface-300" />
                        <span className={`text-[9px] font-bold uppercase tracking-widest ${
                          isImportant ? 'text-rose-600' : 'text-emerald-700'
                        }`}>
                          {label}
                        </span>
                      </>
                    )}
                  </div>
                  <h3 className={`text-base md:text-lg font-bold leading-snug transition-colors duration-300 ${textColor} group-hover:text-emerald-700 break-words`}>
                    {item.title}
                  </h3>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
