import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Phone, MapPin, Mail, AlertCircle, PhoneCall, MessageCircle, Clock, Globe } from 'lucide-react'
import SEO from '@/components/common/SEO'
import PageHeader from '@/components/common/PageHeader'
import { useContacts } from '@/hooks/useContacts'
import { useSettings } from '@/contexts/SettingsContext'

function SkeletonLoader({ className }) {
  return <div className={`animate-pulse bg-surface-200 rounded ${className}`} />
}

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

const categoryLabels = {
  'darurat': 'Layanan Darurat 24 Jam',
  'kesehatan': 'Fasilitas Kesehatan',
  'keamanan': 'Keamanan & Ketertiban',
  'layanan': 'Layanan Publik',
  'pemerintahan': 'Instansi Pemerintah'
}

function ContactCard({ contact, index }) {
  return (
    <motion.div variants={fadeUpStaggerItemVariants} className="group bg-white border border-surface-200 rounded-2xl p-5 md:p-6 hover:border-emerald-500/30 hover:shadow-[0_4px_20px_-4px_rgba(16,185,129,0.1)] transition-all duration-300">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
              {contact.category || 'Lainnya'}
            </span>
          </div>
          <h3 className="text-base font-bold text-surface-900 group-hover:text-emerald-700 transition-colors leading-tight mb-1">
            {contact.name}
          </h3>
          {contact.description && (
            <p className="text-xs text-surface-500 line-clamp-2 leading-relaxed">
              {contact.description}
            </p>
          )}
        </div>
      </div>
      
      <div className="flex flex-col gap-2 pt-4 border-t border-surface-100">
        <div className="flex items-center gap-2 text-surface-700">
          <Phone className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span className="text-sm font-bold">{contact.phone}</span>
        </div>
        
        <div className="flex gap-2 mt-2">
          <a 
            href={`tel:${String(contact.phone || '').replace(/[^0-9+]/g, '')}`}
            className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-surface-100 hover:bg-surface-200 text-surface-700 text-xs font-bold transition-colors"
          >
            <PhoneCall className="w-4 h-4 text-surface-600" /> Panggil
          </a>
          {contact.whatsapp && (
            <a 
              href={`https://wa.me/${String(contact.whatsapp || '').replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" /> WhatsApp
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function KontakPage() {
  const [activeCategory, setActiveCategory] = useState('semua')
  
  const { contacts, loading: contactsLoading } = useContacts()
  const { settings, loading: settingsLoading } = useSettings()
  
  const loading = contactsLoading || settingsLoading

  const contactCategories = useMemo(() => {
    const cats = ['semua', ...new Set(contacts.map(c => c.category).filter(Boolean))]
    return cats.map(c => ({
      id: c,
      label: c === 'semua' ? 'Semua Kontak' : (categoryLabels[c] || c)
    }))
  }, [contacts])

  const filtered = useMemo(() => {
    if (activeCategory === 'semua') return contacts
    return contacts.filter((c) => c.category === activeCategory)
  }, [activeCategory, contacts])

  const grouped = useMemo(() => {
    if (activeCategory !== 'semua') return null
    const groups = {}
    contacts.forEach((c) => {
      const cat = c.category || 'Lainnya'
      if (!groups[cat]) groups[cat] = []
      groups[cat].push(c)
    })
    return groups
  }, [activeCategory, contacts])

  const mapsUrl = "https://maps.app.goo.gl/yJtX4L7XJqCjN2d69" // Replace with actual embed if provided or standard maps link
  const phone = settings?.contact?.phone && settings.contact.phone !== '-' ? settings.contact.phone : "(0421) 21234"
  const email = settings?.contact?.email && settings.contact.email !== '-' ? settings.contact.email : "watangsoreang@parepare.go.id"
  const address = settings?.contact?.address && settings.contact.address !== '-' ? settings.contact.address : "Jl. Bau Massepe No. 1, Kelurahan Watang Soreang, Kecamatan Soreang, Kota Parepare, Sulawesi Selatan 91131"
  const whatsapp = settings?.contact?.whatsapp && settings.contact.whatsapp !== '-' ? settings.contact.whatsapp : "6282198765432"
  const opHours = settings?.contact?.op_hours || "Senin – Jumat, Pukul 08.00 – 16.00 WITA"

  return (
    <div className="w-full">
      <SEO
        title="Direktori Kontak"
        description="Direktori kontak aparatur, RT/RW, dan nomor darurat Kelurahan Watang Soreang, Kota Parepare."
        path="/kontak"
      />

      <PageHeader 
        title="Direktori Kontak"
        subtitle="Daftar nomor telepon aparatur kelurahan, pengurus RT/RW, dan layanan darurat Kota Parepare yang dapat dihubungi."
        icon={Phone}
      />

      {/* ── KANTOR KELURAHAN (HERO CONTACT) ─────────────────────────────── */}
      <section className="pt-8 pb-12 md:pt-16 md:pb-16 bg-white border-b border-surface-200">
        <div className="container-editorial px-6 md:px-12">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
            className="bg-surface-50 border border-surface-200 rounded-3xl p-6 md:p-10 flex flex-col lg:flex-row gap-8 lg:gap-12"
          >
            <div className="flex-1">
              <h2 className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-surface-500 mb-2">
                Kontak Utama
              </h2>
              <h3 className="text-2xl md:text-3xl font-extrabold text-surface-900 mb-6 leading-tight">
                Kantor Kelurahan Watang Soreang
              </h3>

              <div className="space-y-4 mb-8">
                {loading ? (
                  <div className="space-y-4">
                    <SkeletonLoader className="h-4 w-full" />
                    <SkeletonLoader className="h-4 w-5/6" />
                    <SkeletonLoader className="h-4 w-3/4" />
                  </div>
                ) : (
                  <>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-emerald-600 mt-0.5" strokeWidth={2.5} />
                      <div>
                        <p className="text-sm md:text-base font-medium text-surface-900 leading-relaxed max-w-md whitespace-pre-wrap">
                          {address}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-emerald-600" strokeWidth={2.5} />
                      <p className="text-sm md:text-base font-medium text-surface-900">
                        {opHours}
                      </p>
                    </div>
                  </>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a 
                  href={`tel:${String(phone || '').replace(/[\s()-]/g, '')}`}
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition-all"
                >
                  <PhoneCall className="w-4 h-4" /> Telepon {phone}
                </a>
                <a 
                  href={`https://wa.me/${String(whatsapp || '').replace(/[\s+()-]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-surface-50 border border-surface-200 text-surface-900 font-bold text-sm transition-all"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" /> WhatsApp Kami
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── DIREKTORI ──────────────────────────────────────────────────────── */}
      <section className="pt-8 pb-16 md:pt-12 md:pb-24 bg-surface-50">
        <div className="container-editorial px-6 md:px-12">
          
          <div className="sticky top-14 md:top-16 z-30 bg-surface-50/90 backdrop-blur-md py-4 md:py-6 mb-4 md:mb-8 border-b border-surface-200/50">
            <div className="flex gap-2 overflow-x-auto w-full pb-2 md:pb-0 scrollbar-hide">
              {contactCategories.map((cat) => (
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

          <div className="max-w-4xl mx-auto">
            {activeCategory === 'semua' && grouped ? (
              <div className="space-y-12">
                {Object.entries(grouped).map(([category, items]) => (
                  <div key={category}>
                    <div className="flex items-center gap-4 mb-6">
                      <h2 className="text-lg md:text-xl font-extrabold text-surface-900">
                        {categoryLabels[category] || category}
                      </h2>
                      <div className="flex-1 h-px bg-surface-200" />
                    </div>
                    <motion.div 
                      variants={staggerContainerVariants}
                      initial="hidden"
                      animate="visible"
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                      {loading ? (
                        Array.from({ length: 4 }).map((_, i) => (
                          <div key={i} className="bg-white border border-surface-200 rounded-2xl p-5 md:p-6">
                            <SkeletonLoader className="h-4 w-1/4 mb-4" />
                            <SkeletonLoader className="h-5 w-3/4 mb-2" />
                            <SkeletonLoader className="h-4 w-1/2 mb-6" />
                            <SkeletonLoader className="h-10 w-full" />
                          </div>
                        ))
                      ) : (
                        items.map((contact, i) => (
                          <ContactCard key={contact.id} contact={contact} index={i} />
                        ))
                      )}
                    </motion.div>
                  </div>
                ))}
              </div>
            ) : (filtered.length > 0 || loading) ? (
              <motion.div 
                variants={staggerContainerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {loading ? (
                  Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="bg-white border border-surface-200 rounded-2xl p-5 md:p-6">
                      <SkeletonLoader className="h-4 w-1/4 mb-4" />
                      <SkeletonLoader className="h-5 w-3/4 mb-2" />
                      <SkeletonLoader className="h-4 w-1/2 mb-6" />
                      <SkeletonLoader className="h-10 w-full" />
                    </div>
                  ))
                ) : (
                  filtered.map((contact, i) => (
                    <ContactCard key={contact.id} contact={contact} index={i} />
                  ))
                )}
              </motion.div>
            ) : null}
            
            <p className="text-center text-xs md:text-sm font-medium text-surface-400 mt-12">
              * Nomor telepon dapat berubah sewaktu-waktu. Pastikan menghubungi pada jam operasional kelurahan kecuali nomor darurat.
            </p>
          </div>

        </div>
      </section>
    </div>
  )
}
