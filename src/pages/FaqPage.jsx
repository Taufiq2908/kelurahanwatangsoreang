import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HelpCircle, Search, ChevronDown, Phone, MessageCircle, MessageCircleQuestion } from 'lucide-react'
import SEO from '@/components/common/SEO'
import PageHeader from '@/components/common/PageHeader'
import LastUpdated from '@/components/common/LastUpdated'
import { Link } from 'react-router-dom'
import { useFaq } from '@/hooks/useFaq'
import { useSettings } from '@/contexts/SettingsContext'
import { AlertCircle } from 'lucide-react'

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

function AccordionFaq({ item, isOpen, onToggle }) {
  return (
    <motion.div variants={fadeUpStaggerItemVariants} className="bg-white border border-surface-200 rounded-2xl overflow-hidden hover:border-surface-300 transition-colors">
      <button 
        onClick={onToggle}
        className="w-full flex items-start gap-4 p-5 md:p-6 text-left outline-none focus-visible:bg-surface-50"
      >
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0 border border-emerald-100/50">
          <MessageCircleQuestion className="w-5 h-5 text-emerald-600" strokeWidth={2} />
        </div>
        
        <div className="flex-1 min-w-0 pt-0.5">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
              {item.category || 'FAQ'}
            </span>
          </div>
          <h3 className="text-base md:text-lg font-bold text-surface-900 leading-tight pr-6">
            {item.question}
          </h3>
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
              <div className="bg-surface-50 rounded-xl p-5 md:p-6">
                <p className="text-sm md:text-base text-surface-700 leading-relaxed font-medium">
                  {item.answer}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FaqPage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('semua')
  const [openFaqId, setOpenFaqId] = useState(null)

  const { faqs, loading: faqLoading, error } = useFaq()
  const { settings, loading: settingsLoading } = useSettings()
  
  const loading = faqLoading || settingsLoading
  const faqItems = faqs
  const phone = settings?.contact?.phone || '(0421) 21234'

  const faqCategories = useMemo(() => {
    const safeFaq = faqItems || []
    const cats = ['semua', ...new Set(safeFaq.map(item => item.category).filter(Boolean))]
    return cats.map(c => ({
      id: c,
      label: c === 'semua' ? 'Semua Kategori' : c
    }))
  }, [faqItems])

  const filtered = useMemo(() => {
    const safeFaq = faqItems || []
    if (!safeFaq.length) return []
    return safeFaq.filter((item) => {
      const matchCat = activeCategory === 'semua' || item.category === activeCategory
      const q = search.toLowerCase()
      const matchSearch =
        !q ||
        item.question?.toLowerCase().includes(q) ||
        item.answer?.toLowerCase().includes(q)
      return matchCat && matchSearch
    })
  }, [faqItems, search, activeCategory])

  const faqSchema = useMemo(() => {
    if (!faqs || !faqs.length) return null;
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(item => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer
        }
      }))
    }
  }, [faqs])

  const handleToggle = (id) => {
    setOpenFaqId(prev => prev === id ? null : id)
  }

  return (
    <div className="w-full">
      <SEO
        title="Tanya Jawab (FAQ)"
        description="Pertanyaan yang sering diajukan tentang layanan dan administrasi Kelurahan Watang Soreang, Kota Parepare."
        path="/faq"
        schema={faqSchema}
      />

      <PageHeader 
        title="Tanya Jawab (FAQ)"
        subtitle="Temukan jawaban cepat untuk pertanyaan umum seputar layanan dan prosedur administrasi Kelurahan."
        icon={HelpCircle}
      />

      <section className="pt-8 pb-16 md:pt-12 md:pb-24 bg-surface-50">
        <div className="container-editorial px-6 md:px-12">
          
          {/* Sticky filter area */}
          <div className="sticky top-14 md:top-16 z-30 bg-surface-50/90 backdrop-blur-md py-4 md:py-6 mb-4 md:mb-8 border-b border-surface-200/50">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" strokeWidth={2.5} />
                <input
                  type="text"
                  placeholder="Cari pertanyaan..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-white border border-surface-200 rounded-xl pl-11 pr-4 py-3 text-sm font-medium text-surface-900 placeholder:text-surface-400 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all"
                />
              </div>

              <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
                {faqCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex-shrink-0 px-4 py-2 rounded-lg text-xs font-bold tracking-wide uppercase transition-all duration-200 ${
                      activeCategory === cat.id
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                        : 'bg-white border border-surface-200 text-surface-600 hover:bg-surface-50'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-surface-500">
                Menampilkan {filtered.length} Pertanyaan
              </span>
            </div>

            {loading ? (
              <div className="bg-white border border-surface-200 rounded-2xl p-12 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto mb-4"></div>
                <p className="text-sm text-surface-500">Memuat FAQ...</p>
              </div>
            ) : error ? (
              <div className="bg-white border border-surface-200 rounded-2xl p-12 text-center text-rose-600">
                <AlertCircle className="w-8 h-8 mx-auto mb-4" />
                <p className="text-sm font-medium">Gagal memuat FAQ. Silakan muat ulang halaman.</p>
              </div>
            ) : filtered.length > 0 ? (
              <motion.div 
                variants={staggerContainerVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col gap-3"
              >
                {filtered.map((item) => (
                  <AccordionFaq 
                    key={item.id} 
                    item={item} 
                    isOpen={openFaqId === item.id}
                    onToggle={() => handleToggle(item.id)}
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
                  <HelpCircle className="w-6 h-6 text-surface-400" />
                </div>
                <h3 className="text-lg font-bold text-surface-900 mb-2">Pertanyaan tidak ditemukan</h3>
                <p className="text-sm text-surface-500 max-w-md mx-auto">
                  Coba gunakan kata kunci lain atau pilih kategori "Semua" untuk melihat daftar lengkap FAQ.
                </p>
              </motion.div>
            )}

            {/* Need More Help CTA */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUpVariants}
              className="mt-12 md:mt-16 bg-white border border-emerald-100 rounded-2xl p-8 md:p-10 text-center"
            >
              <h3 className="text-lg md:text-xl font-bold text-surface-900 mb-2">Masih Butuh Bantuan?</h3>
              <p className="text-sm text-surface-600 max-w-md mx-auto mb-8">
                Jika Anda memiliki pertanyaan spesifik yang tidak tercantum di atas, silakan hubungi langsung petugas kelurahan kami.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href={`tel:${String(phone).replace(/[\s()-]/g, '')}`} className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-surface-50 hover:bg-surface-100 border border-surface-200 text-surface-800 text-sm font-bold transition-colors">
                  <Phone className="w-4 h-4" /> {phone}
                </a>
                <Link to="/kontak" className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-600/20 text-white text-sm font-bold transition-all">
                  <MessageCircle className="w-4 h-4" /> Lihat Direktori Kontak
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <LastUpdated />
    </div>
  )
}
