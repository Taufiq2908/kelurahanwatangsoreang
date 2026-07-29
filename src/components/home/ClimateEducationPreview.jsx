import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Sprout } from 'lucide-react'
import { useClimateArticles } from '@/hooks/useClimateArticles'
import { fadeUpStaggerItemVariants, staggerContainerVariants } from '@/design/motion'
import SectionHeader from '@/components/common/SectionHeader'

export default function ClimateEducationPreview() {
  const { data, loading, error } = useClimateArticles({ limit: 2 })

  if (loading || error || data.length === 0) return null

  return (
    <section className="pt-8 md:pt-12 pb-16 md:pb-24 bg-surface-50 border-b border-surface-200">
      <div className="container-editorial px-6 md:px-12">
        <SectionHeader 
          label="Program Berkelanjutan"
          title="Edukasi Lingkungan"
          description="Panduan dan informasi seputar pelestarian lingkungan serta mitigasi perubahan iklim tingkat kelurahan."
          linkText="Semua Artikel"
          linkTo="/edukasi"
          icon={Sprout}
        />

        <motion.div 
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10"
        >
          {data.map((article) => (
            <motion.div key={article.id} variants={fadeUpStaggerItemVariants}>
              <Link
                to={`/edukasi/${article.slug}`}
                className="group block p-5 md:p-6 bg-white border border-surface-200 hover:border-surface-300 outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 rounded-2xl transition-all duration-300"
              >
                <div className="mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-800 bg-emerald-100/70 px-2.5 py-1 rounded-md">
                    {article.category}
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-extrabold text-surface-900 group-hover:text-emerald-700 transition-colors mb-2.5 leading-snug tracking-tight">
                  {article.title}
                </h3>
                <p className="text-sm text-surface-600 line-clamp-2 leading-relaxed font-medium">
                  {article.description || "Tidak ada deskripsi tersedia."}
                </p>
                <div className="mt-6 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-emerald-700 group-hover:text-emerald-800 transition-colors">
                  Baca artikel <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
