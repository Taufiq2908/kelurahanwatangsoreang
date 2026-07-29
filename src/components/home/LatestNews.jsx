import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Newspaper } from 'lucide-react'
import { useNews } from '@/hooks/useNews'
import { fadeUpStaggerItemVariants, staggerContainerVariants } from '@/design/motion'
import SectionHeader from '@/components/common/SectionHeader'

export default function LatestNews() {
  const { data, loading, error } = useNews({ limit: 4 })

  if (loading || error || data.length === 0) return null

  const formatAbsoluteDate = (dateString) => {
    try {
      const d = new Date(dateString)
      return new Intl.DateTimeFormat('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }).format(d)
    } catch {
      return dateString
    }
  }

  const featuredArticle = data[0]
  const listArticles = data.slice(1)

  return (
    <section className="pt-16 md:pt-24 pb-16 md:pb-20 bg-white border-b border-surface-200">
      <div className="container-editorial px-6 md:px-12">
        <SectionHeader 
          label="Publikasi"
          title="Berita Terkini"
          description="Kabar terbaru seputar kegiatan dan program pembangunan kelurahan."
          linkText="Indeks Berita"
          linkTo="/berita"
          icon={Newspaper}
        />

        <motion.div 
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col md:flex-row gap-10 md:gap-16"
        >
          {/* Featured Article - Editorial Composition with Real Photo Anchor */}
          {featuredArticle && (
            <motion.div variants={fadeUpStaggerItemVariants} className="md:w-3/5 flex flex-col">
              <Link 
                to={`/berita/${featuredArticle.slug}`}
                className="group block outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 rounded-xl"
              >
                <div className="w-full aspect-[4/3] md:aspect-[16/9] bg-surface-100 rounded-lg mb-4 overflow-hidden relative border border-surface-200">
                  <img 
                    src={featuredArticle.image || "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200"} 
                    alt={featuredArticle.title}
                    onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200" }}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                <div className="mb-2 flex items-center gap-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-surface-400 group-hover:text-surface-500 transition-colors">
                    {formatAbsoluteDate(featuredArticle.date)}
                  </span>
                  {featuredArticle.category && (
                    <>
                      <div className="w-1 h-1 rounded-full bg-surface-300" />
                      <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-700">
                        {featuredArticle.category}
                      </span>
                    </>
                  )}
                </div>
                <h3 className="text-2xl md:text-3xl font-extrabold text-surface-900 leading-snug tracking-tight mb-2.5 group-hover:text-emerald-700 transition-colors duration-300">
                  {featuredArticle.title}
                </h3>
                <p className="text-sm text-surface-600 font-medium leading-relaxed line-clamp-2">
                  {featuredArticle.description || "Tidak ada deskripsi tersedia."}
                </p>
              </Link>
            </motion.div>
          )}

          {/* Editorial List */}
          {listArticles.length > 0 && (
            <motion.div variants={fadeUpStaggerItemVariants} className="md:w-2/5 flex flex-col pt-6 md:pt-0 md:border-l border-surface-200 md:pl-10">
              <div className="space-y-8">
                {listArticles.map((article) => (
                  <Link
                    key={article.id}
                    to={`/berita/${article.slug}`}
                    className="group block outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 rounded-lg"
                  >
                    <div className="mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-surface-400 group-hover:text-surface-500 transition-colors">
                        {formatAbsoluteDate(article.date)}
                      </span>
                    </div>
                    <h3 className="text-base font-extrabold text-surface-900 group-hover:text-emerald-700 transition-colors duration-300 leading-snug">
                      {article.title}
                    </h3>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
