import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Building2, Users, Target, User, Info } from 'lucide-react'
import SEO from '@/components/common/SEO'
import PageHeader from '@/components/common/PageHeader'
import SectionHeader from '@/components/common/SectionHeader'
import { useProfile } from '@/hooks/useProfile'
import { useApparatus } from '@/hooks/useApparatus'

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

function getInitials(name) {
  if (!name) return 'WS'
  const words = name.split(' ')
  if (words.length > 1) {
    return (words[0][0] + words[1][0]).toUpperCase()
  }
  return name.substring(0, 2).toUpperCase()
}

export default function ProfilPage() {
  const [showFullSambutan, setShowFullSambutan] = useState(false)
  const { profile, loading: profileLoading } = useProfile()
  const { apparatus, loading: apparatusLoading } = useApparatus()

  const loading = profileLoading || apparatusLoading

  const sambutan = profile?.sambutan || 'Selamat datang di website resmi Kelurahan.'
  const sambutanParts = sambutan.split('\n').filter(Boolean)
  const lurahName = profile?.lurah_name || 'Kepala Kelurahan'
  const lurahPosition = profile?.lurah_position || 'Lurah'
  const lurahPhoto = profile?.lurah_photo || ''
  
  const visi = profile?.visi || 'Membangun Kelurahan'
  const misiRaw = profile?.misi || ''
  const misiList = misiRaw.split('\n').filter(Boolean)
  const sejarah = profile?.sejarah || ''
  
  const stats = [
    { label: 'Penduduk', value: profile?.demografi_penduduk || '0' },
    { label: 'Kepala Keluarga', value: profile?.demografi_kk || '0' },
    { label: 'Rukun Tetangga (RT)', value: profile?.demografi_rt || '0' },
    { label: 'Rukun Warga (RW)', value: profile?.demografi_rw || '0' },
  ]

  return (
    <div className="w-full">
      <SEO
        title="Profil Kelurahan"
        description="Profil, sejarah, visi misi, dan data aparatur Kelurahan Watang Soreang, Kecamatan Soreang, Kota Parepare."
        path="/profil"
      />

      <PageHeader 
        title="Profil Kelurahan"
        subtitle="Mengenal lebih dekat sejarah, visi misi, dan struktur organisasi Pemerintah Kelurahan Watang Soreang."
        icon={Building2}
      />

      {/* ── SAMBUTAN LURAH ─────────────────────────────────────────────── */}
      <section className="pt-8 pb-16 md:pt-12 md:pb-24 bg-surface-50 border-b border-surface-200">
        <div className="container-editorial px-6 md:px-12">
          <SectionHeader label="Sambutan" title="Kepala Kelurahan" />
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariants}
            className="flex flex-col md:flex-row gap-8 md:gap-12 mt-10 md:mt-16"
          >
            <motion.div variants={fadeUpVariants} className="max-w-xs mx-auto mb-16 shrink-0">
              <div className="bg-white border border-surface-200 rounded-2xl overflow-hidden hover:border-surface-300 hover:shadow-md transition-all duration-300 group w-64">
                <div className="aspect-[4/5] w-full bg-surface-100 flex items-center justify-center overflow-hidden">
                  {loading ? (
                    <SkeletonLoader className="w-full h-full" />
                  ) : lurahPhoto ? (
                    <img src={lurahPhoto} alt={lurahName} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300" loading="lazy" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-surface-200 to-surface-300 flex items-center justify-center text-white/90 text-6xl font-black uppercase tracking-tighter shadow-inner group-hover:scale-[1.02] transition-transform duration-300">
                      {getInitials(lurahName)}
                    </div>
                  )}
                </div>
                <div className="p-6 text-center border-t border-surface-100">
                  {loading ? (
                    <>
                      <SkeletonLoader className="h-6 w-3/4 mx-auto mb-2" />
                      <SkeletonLoader className="h-4 w-1/2 mx-auto" />
                    </>
                  ) : (
                    <>
                      <h4 className="text-lg font-bold text-surface-900 mb-1">{lurahName}</h4>
                      <p className="text-sm font-medium text-emerald-700">{lurahPosition}</p>
                    </>
                  )}
                </div>
              </div>
            </motion.div>

            <div className="flex-1 flex flex-col justify-center">
              {loading ? (
                <div className="space-y-4">
                  <SkeletonLoader className="h-4 w-full" />
                  <SkeletonLoader className="h-4 w-5/6" />
                  <SkeletonLoader className="h-4 w-4/5" />
                </div>
              ) : (
                <>
                  {sambutanParts.slice(0, 1).map((p, i) => (
                    <p key={i} className="text-surface-700 text-base md:text-lg leading-relaxed mb-6 font-medium">"{p}"</p>
                  ))}
              
              <AnimatePresence initial={false}>
                {showFullSambutan ? (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    {sambutanParts.slice(1).map((p, i) => (
                      <p key={i} className="text-surface-600 text-sm md:text-base leading-relaxed mb-6">{p}</p>
                    ))}
                  </motion.div>
                ) : (
                  sambutanParts.length > 1 && (
                    <p className="text-surface-600 text-sm md:text-base leading-relaxed mb-6">
                      {sambutanParts[1].substring(0, 150)}...
                    </p>
                  )
                )}
              </AnimatePresence>

                  {sambutanParts.length > 1 && (
                    <button 
                      onClick={() => setShowFullSambutan(!showFullSambutan)}
                      className="self-start text-emerald-600 font-bold text-sm hover:text-emerald-700 transition-colors"
                    >
                      {showFullSambutan ? 'Tutup' : 'Baca Selengkapnya'}
                    </button>
                  )}
                </>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SEJARAH / GAMBARAN UMUM ──────────────────────────────────────────────────── */}
      {(sejarah || loading) && (
        <section className="pt-16 pb-12 md:pt-24 md:pb-20 bg-surface-50 border-b border-surface-200">
          <div className="container-editorial px-6 md:px-12">
            <SectionHeader label="Profil" title="Sejarah & Gambaran Umum" />
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUpVariants}
              className="mt-10 md:mt-16 max-w-4xl mx-auto"
            >
              {loading ? (
                <div className="space-y-4">
                  <SkeletonLoader className="h-4 w-full" />
                  <SkeletonLoader className="h-4 w-5/6 mx-auto" />
                  <SkeletonLoader className="h-4 w-4/5 mx-auto" />
                </div>
              ) : (
                <p className="text-surface-700 text-base md:text-lg leading-relaxed text-center font-medium">
                  {sejarah}
                </p>
              )}
            </motion.div>
          </div>
        </section>
      )}

      {/* ── VISI & MISI ──────────────────────────────────────────────────── */}
      <section className="pt-16 pb-12 md:pt-24 md:pb-20 bg-white border-b border-surface-200">
        <div className="container-editorial px-6 md:px-12">
          <SectionHeader label="Arah Kebijakan" title="Visi & Misi" />
          
          <div className="mt-10 md:mt-16 flex flex-col gap-12">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUpVariants}
              className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-6 md:p-10 text-center"
            >
              <h3 className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-emerald-600 mb-4">
                Visi Kelurahan
              </h3>
              {loading ? (
                <SkeletonLoader className="h-8 w-3/4 mx-auto" />
              ) : (
                <p className="text-xl md:text-3xl font-extrabold text-surface-900 leading-snug max-w-3xl mx-auto italic">
                  "{visi}"
                </p>
              )}
            </motion.div>

            {(misiList.length > 0 || loading) && (
              <motion.div 
                variants={staggerContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
              >
                {loading ? (
                  Array.from({ length: 4 }).map((_, idx) => (
                    <div key={idx} className="bg-white border border-surface-200 p-6 md:p-8 rounded-2xl">
                      <SkeletonLoader className="w-10 h-10 rounded-xl mb-5" />
                      <SkeletonLoader className="h-4 w-3/4" />
                    </div>
                  ))
                ) : (
                  misiList.map((item, idx) => {
                    const cleaned = item.replace(/^[0-9.-]+\s*/, '')
                    return (
                      <motion.div 
                        key={idx}
                        variants={fadeUpStaggerItemVariants}
                        className="bg-white border border-surface-200 p-6 md:p-8 rounded-2xl hover:border-surface-300 transition-colors"
                      >
                        <div className="w-10 h-10 rounded-xl bg-surface-50 flex items-center justify-center mb-5 border border-surface-100">
                          <span className="text-sm font-black text-emerald-700">{idx + 1}</span>
                        </div>
                        <p className="text-base font-bold text-surface-900 leading-relaxed">{cleaned}</p>
                      </motion.div>
                    )
                  })
                )}
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* ── STRUKTUR APARATUR ────────────────────────────────────────────── */}
      {(apparatus.length > 0 || loading) && (
        <section className="pt-16 pb-12 md:pt-24 md:pb-20 bg-surface-50 border-b border-surface-200">
          <div className="container-editorial px-6 md:px-12">
            <SectionHeader label="Organisasi" title="Struktur Aparatur" />
            
            <motion.div 
              variants={staggerContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-10 md:mt-16"
            >
              {loading ? (
                Array.from({ length: 8 }).map((_, idx) => (
                  <div key={idx} className="flex flex-col items-center p-5 md:p-8 bg-white border border-surface-200 rounded-2xl">
                    <SkeletonLoader className="w-16 h-16 md:w-20 md:h-20 rounded-full mb-4 md:mb-5" />
                    <SkeletonLoader className="h-4 w-3/4 mb-2" />
                    <SkeletonLoader className="h-3 w-1/2" />
                  </div>
                ))
              ) : (
                apparatus.map((person, idx) => (
                  <motion.div 
                    key={idx}
                    variants={fadeUpStaggerItemVariants}
                    className="group flex flex-col items-center text-center p-5 md:p-8 bg-white border border-surface-200 rounded-2xl hover:border-surface-300 hover:shadow-sm transition-all duration-300"
                  >
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mb-4 md:mb-5 shadow-sm group-hover:scale-105 transition-transform duration-300 overflow-hidden">
                      {person.image ? (
                        <img src={person.image} alt={person.name} className="w-full h-full object-cover" loading="lazy" />
                      ) : (
                        <span className="text-white text-xl md:text-2xl font-black">{getInitials(person.name)}</span>
                      )}
                    </div>
                    <h4 className="text-sm md:text-base font-bold text-surface-900 leading-tight mb-1 md:mb-2">{person.name}</h4>
                    <p className="text-[11px] md:text-xs font-semibold text-emerald-700 leading-snug">{person.position}</p>
                  </motion.div>
                ))
              )}
            </motion.div>
          </div>
        </section>
      )}

      {/* ── DATA DEMOGRAFI ───────────────────────────────────────────────── */}
      <section className="pt-16 pb-12 md:pt-24 md:pb-24 bg-white">
        <div className="container-editorial px-6 md:px-12">
          <SectionHeader label="Statistik" title="Demografi Wilayah" />
          
          <motion.div 
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-10 md:mt-16"
          >
            {stats.map((stat, idx) => (
              <motion.div 
                key={idx}
                variants={fadeUpStaggerItemVariants}
                className="bg-white border border-surface-200 p-5 md:p-8 rounded-2xl flex flex-col items-center text-center hover:border-surface-300 transition-colors"
              >
                {loading ? (
                  <SkeletonLoader className="h-10 w-16 mb-3" />
                ) : (
                  <span className="text-3xl md:text-5xl font-black text-surface-900 mb-2 md:mb-3">
                    {stat.value}
                  </span>
                )}
                <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.1em] text-surface-500">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>
    </div>
  )
}
