import { motion } from 'framer-motion'
import { fadeUpVariants } from '@/design/motion'
export default function HeroSection() {
  return (
    <section className="relative bg-white text-surface-900 pt-28 pb-16 md:pt-40 md:pb-24 overflow-hidden border-b border-surface-200">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-surface-50/90 to-white opacity-95 pointer-events-none" />
      
      <div className="container-editorial px-6 md:px-12 relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUpVariants}
          className="flex flex-col items-start max-w-3xl mx-auto"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-px bg-surface-300" />
            <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.25em] text-surface-500">
              Website Resmi Pemerintah
            </span>
          </div>
          
          <h1 className="text-4xl md:text-[3.5rem] font-extrabold tracking-tight text-surface-900 mb-4 leading-[1.1]">
            Kelurahan Watang Soreang
          </h1>
          
          <h2 className="text-lg md:text-xl font-semibold tracking-wide text-surface-400 mb-8 leading-snug">
            Kecamatan Soreang • Kota Parepare
          </h2>
          
          <div className="w-12 h-1 bg-emerald-600 mb-8 rounded-full" />
          
          <p className="text-base md:text-lg text-surface-600 font-medium max-w-[500px] leading-relaxed whitespace-pre-line mb-8">
            Website resmi Kelurahan Watang Soreang sebagai media informasi, pengumuman, edukasi, dan partisipasi masyarakat.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
