import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Clock, User, Download } from 'lucide-react'
import { SkeletonArticle } from '@/components/common/Skeleton'
import ErrorState from '@/components/common/ErrorState'
import ArticleBody from '@/components/berita/ArticleBody'
import Breadcrumbs from '@/components/common/Breadcrumbs'
import RelatedContent from '@/components/common/RelatedContent'
import AttachmentList from '@/components/common/AttachmentList'
import NewsCard from '@/components/news/NewsCard'
import SEO from '@/components/common/SEO'

function formatDate(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('id-ID', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  })
}

const categoryColors = {
  'Kegiatan Kelurahan': { bg: 'bg-primary-50', text: 'text-primary-700' },
  'UMKM':              { bg: 'bg-amber-50',   text: 'text-amber-700' },
  'Masyarakat':        { bg: 'bg-violet-50',  text: 'text-violet-700' },
  'Lingkungan':        { bg: 'bg-emerald-50', text: 'text-emerald-700' },
}

export default function ArticleDetailLayout({ 
  article, 
  loading, 
  error, 
  related, 
  typeLabel = 'Berita', 
  typePath = '/berita',
  RelatedItemComponent = NewsCard
}) {
  const navigate = useNavigate()

  return (
    <div className="w-full">
      {article && (
        <SEO
          title={article.title}
          description={article.description || `${article.title} — Kelurahan Watang Soreang`}
          path={`${typePath}/${article.slug || article.id}`}
          type="article"
        />
      )}

      <div className="bg-surface-50 border-b border-surface-200">
        <div className="container-editorial px-6 md:px-12 py-4 md:py-6">
          <Breadcrumbs 
            items={[
              { label: typeLabel, path: typePath },
              { label: article?.title || 'Memuat...' }
            ]} 
          />
          <button
            onClick={() => navigate(typePath)}
            className="inline-flex items-center gap-2 text-sm font-bold text-surface-500 hover:text-emerald-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Indeks {typeLabel}
          </button>
        </div>
      </div>

      <section className="pt-8 pb-16 md:pt-12 md:pb-24 bg-white">
        <div className="w-full">
          <div className="max-w-[860px] mx-auto px-6">
            {loading && <SkeletonArticle />}

            {!loading && error && (
              <ErrorState message={error} onRetry={() => navigate(0)} />
            )}

            {!loading && !error && article && (
              <motion.article
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
              >
                {/* Article Header */}
                <header className="mb-10 md:mb-12">
                  {article.category && (
                    <div className="flex items-center gap-3 mb-6">
                      {(() => {
                        const c = categoryColors[article.category] || { bg: 'bg-surface-100', text: 'text-surface-700' }
                        return (
                          <span className={`badge ${c.bg} ${c.text} text-[10px] md:text-xs font-bold px-3 py-1 uppercase tracking-widest`}>
                            {article.category}
                          </span>
                        )
                      })()}
                    </div>
                  )}

                  <h1 
                    className="text-[34px] sm:text-[40px] md:text-5xl lg:text-[52px] font-extrabold text-surface-900 leading-[1.15] mb-6 tracking-tight"
                    style={{ overflowWrap: 'anywhere', wordBreak: 'break-word', maxWidth: '100%' }}
                  >
                    {article.title}
                  </h1>

                  <div className="flex flex-wrap items-center gap-4 md:gap-6 py-4 border-y border-surface-100">
                    <div className="flex items-center gap-2 text-surface-600">
                      <User className="w-4 h-4 text-emerald-600" />
                      <span className="text-xs md:text-sm font-semibold">Admin Kelurahan Watang Soreang</span>
                    </div>
                    <div className="flex items-center gap-2 text-surface-600">
                      <Calendar className="w-4 h-4 text-emerald-600" />
                      <span className="text-xs md:text-sm font-medium">{formatDate(article.published_at || article.date || article.created_at)}</span>
                    </div>
                    {article.readTime && (
                      <div className="flex items-center gap-2 text-surface-600">
                        <Clock className="w-4 h-4 text-emerald-600" />
                        <span className="text-xs md:text-sm font-medium">{article.readTime} menit baca</span>
                      </div>
                    )}
                  </div>
                </header>

                {/* Hero image area */}
                {article.image && (
                  <div className="relative w-full aspect-[21/9] bg-gradient-to-br from-surface-100 to-surface-200 flex items-center justify-center overflow-hidden rounded-2xl md:rounded-3xl mb-10 md:mb-12 border border-surface-200">
                    <img 
                      src={article.image} 
                      alt={article.title} 
                      className="absolute inset-0 w-full h-full object-cover"
                      onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='block'; }}
                    />
                    <span className="text-surface-300 text-6xl md:text-9xl font-black select-none relative z-10" style={{ display: 'none' }}>
                      {article.category?.[0] || typeLabel[0]}
                    </span>
                  </div>
                )}

                {/* Article body */}
                <div className="prose prose-lg md:prose-xl prose-surface max-w-[700px] mx-auto" style={{ overflowWrap: 'anywhere', wordBreak: 'break-word' }}>
                  <ArticleBody content={article.content} />
                </div>
                
                {/* Attachments */}
                {article.attachments && (
                  <div className="max-w-[700px] mx-auto">
                    <AttachmentList attachments={article.attachments} />
                  </div>
                )}

                {/* Footer tag strip */}
                <div className="mt-16 md:mt-24 pt-8 md:pt-10 border-t border-surface-200 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] md:text-xs font-bold text-surface-400 uppercase tracking-widest mb-3">Diterbitkan oleh</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center border border-emerald-100">
                        <span className="text-emerald-700 text-sm font-black">WS</span>
                      </div>
                      <div>
                        <p className="text-sm md:text-base font-bold text-surface-900">Pemerintah Kelurahan Watang Soreang</p>
                        <p className="text-[11px] md:text-xs font-semibold text-emerald-600 mt-0.5">Kecamatan Soreang, Kota Parepare</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            )}
          </div>
          
          {/* Related Content */}
          {!loading && !error && related?.length > 0 && (
            <div className="max-w-[860px] mx-auto px-6 mt-16 md:mt-24">
              <RelatedContent title={`${typeLabel} Terkait`} items={related} type={typeLabel.toLowerCase()} ItemComponent={RelatedItemComponent} />
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
