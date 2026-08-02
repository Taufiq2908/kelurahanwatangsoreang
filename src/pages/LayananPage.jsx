import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText, Search, Clock, CheckCircle2, ChevronDown, CheckSquare, AlertCircle } from 'lucide-react'
import SEO from '@/components/common/SEO'
import PageHeader from '@/components/common/PageHeader'
import SearchBar from '@/components/common/SearchBar'
import CategoryFilter from '@/components/common/CategoryFilter'
import LastUpdated from '@/components/common/LastUpdated'
import { useServices } from '@/hooks/useServices'

const fadeUpVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
}

const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const fadeUpStaggerItemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
}

function AccordionServiceCard({ service, isOpen, onToggle }) {
  const reqs = service.requirements || []
  const isPopular = service.featured === true || String(service.featured).toUpperCase() === 'TRUE'

  return (
    <motion.div variants={fadeUpStaggerItemVariants} className="bg-white border border-surface-200 rounded-2xl overflow-hidden hover:border-surface-300 hover:shadow-md transition-all duration-300">
      <button 
        onClick={onToggle}
        className="w-full flex items-start gap-4 p-5 md:p-6 text-left outline-none focus-visible:bg-surface-50"
      >
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-surface-50 flex items-center justify-center flex-shrink-0 border border-surface-100">
          <FileText className="w-5 h-5 text-emerald-700" strokeWidth={2} />
        </div>
        
        <div className="flex-1 min-w-0 pt-0.5">
          <div className="flex items-center flex-wrap gap-2 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-surface-500">
              {service.category || 'Layanan'}
            </span>
            {isPopular && (
              <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                Populer
              </span>
            )}
          </div>
          
          <h3 className="text-base md:text-lg font-bold text-surface-900 leading-tight mb-2 pr-6">
            {service.title}
          </h3>
          
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" strokeWidth={2.5} />
              <span className="text-xs font-semibold text-surface-600">
                {reqs.length} Syarat
              </span>
            </div>
          </div>
        </div>
        
        <ChevronDown 
          className={`w-5 h-5 text-surface-400 flex-shrink-0 mt-2 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="p-5 md:p-6 pt-0 border-t border-surface-100 mt-2">
              <div className="bg-surface-50 rounded-xl p-5 md:p-6 mb-6">
                <p className="text-sm md:text-base text-surface-700 leading-relaxed font-medium">
                  {service.description}
                </p>
              </div>

              <div className="w-full">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-surface-400 mb-4 flex items-center gap-2">
                    <CheckSquare className="w-4 h-4 text-emerald-600" /> Dokumen Persyaratan
                  </h4>
                  <ul className="space-y-3">
                    {reqs.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                        <span className="text-sm font-medium text-surface-700 leading-relaxed">{typeof req === 'object' ? req.label : req}</span>
                      </li>
                    ))}
                    {reqs.length === 0 && (
                      <li className="text-sm text-surface-500 italic">Tidak ada persyaratan khusus.</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function LayananPage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('semua')
  const [openServiceId, setOpenServiceId] = useState(null)
  
  const { services, loading, error } = useServices()

  const serviceCategories = useMemo(() => {
    const safeServices = services || [];
    const cats = ['semua', ...new Set(safeServices.map(s => s.category).filter(Boolean))]
    return cats.map(c => ({
      id: c,
      label: c === 'semua' ? 'Semua Layanan' : c
    }))
  }, [services])

  const filtered = useMemo(() => {
    const safeServices = services || [];
    if (!safeServices.length) return []
    return safeServices.filter((s) => {
      const matchCat = activeCategory === 'semua' || s.category === activeCategory
      const q = search.toLowerCase()
      const matchSearch = !q || s.title?.toLowerCase().includes(q) || s.description?.toLowerCase().includes(q)
      return matchCat && matchSearch
    })
  }, [services, search, activeCategory])

  const handleToggle = (id) => {
    setOpenServiceId(prev => prev === id ? null : id)
  }

  return (
    <div className="w-full">
      <SEO
        title="Layanan Kelurahan"
        description="Informasi layanan administrasi dan surat keterangan Kelurahan Watang Soreang, Kecamatan Soreang, Kota Parepare."
        path="/layanan"
      />

      <PageHeader 
        title="Layanan Publik"
        subtitle="Temukan informasi persyaratan dan prosedur pengurusan dokumen administrasi kependudukan di Kelurahan Watang Soreang."
        icon={FileText}
      />

      <section className="pt-8 pb-16 md:pt-12 md:pb-24 bg-surface-50">
        <div className="container-editorial px-6 md:px-12">
          
          {/* Sticky filter area */}
          <div className="sticky top-14 md:top-16 z-30 bg-surface-50/90 backdrop-blur-md py-4 md:py-6 mb-4 md:mb-8 border-b border-surface-200/50">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
              <div className="w-full md:w-96">
                <SearchBar
                  value={search}
                  onChange={setSearch}
                  placeholder="Cari surat keterangan, layanan..."
                />
              </div>

              <div className="w-full md:w-auto">
                <CategoryFilter
                  categories={serviceCategories}
                  active={activeCategory}
                  onChange={setActiveCategory}
                />
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-surface-500">
                Menampilkan {filtered.length} Layanan
              </span>
            </div>

            {loading ? (
              <div className="bg-white border border-surface-200 rounded-2xl p-12 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto mb-4"></div>
                <p className="text-sm text-surface-500">Memuat data layanan...</p>
              </div>
            ) : error ? (
              <div className="bg-white border border-surface-200 rounded-2xl p-12 text-center text-rose-600">
                <AlertCircle className="w-8 h-8 mx-auto mb-4" />
                <p className="text-sm font-medium">Gagal memuat layanan. Silakan muat ulang halaman.</p>
              </div>
            ) : filtered.length > 0 ? (
              <motion.div 
                variants={staggerContainerVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col gap-4"
              >
                {filtered.map((service) => (
                  <AccordionServiceCard 
                    key={service.id} 
                    service={service} 
                    isOpen={openServiceId === service.id}
                    onToggle={() => handleToggle(service.id)}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={fadeUpVariants}
                className="bg-white border border-surface-200 rounded-2xl p-12 text-center"
              >
                <div className="w-16 h-16 bg-surface-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-surface-100">
                  <FileText className="w-6 h-6 text-surface-400" />
                </div>
                <h3 className="text-lg font-bold text-surface-900 mb-2">Layanan tidak ditemukan</h3>
                <p className="text-sm text-surface-500 max-w-md mx-auto">
                  Coba gunakan kata kunci lain atau pilih kategori "Semua" untuk melihat daftar lengkap layanan.
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      <LastUpdated />
    </div>
  )
}
