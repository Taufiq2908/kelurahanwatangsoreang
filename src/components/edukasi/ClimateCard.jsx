import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, Clock, ChevronRight, BookOpen, Leaf } from 'lucide-react'

function formatDate(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

const categoryColors = {
  'Perubahan Iklim':   { bg: 'bg-emerald-50', text: 'text-emerald-700', gradient: 'from-emerald-500 to-teal-600' },
  'Sampah':            { bg: 'bg-amber-50',   text: 'text-amber-700',   gradient: 'from-amber-500 to-orange-500' },
  'Lingkungan Pesisir':{ bg: 'bg-cyan-50',    text: 'text-cyan-700',    gradient: 'from-cyan-500 to-blue-600' },
  'Air & Energi':      { bg: 'bg-blue-50',    text: 'text-blue-700',    gradient: 'from-blue-500 to-indigo-600' },
}

export default function ClimateCard({ article, index = 0, featured = false }) {
  const colors = categoryColors[article.category] || {
    bg: 'bg-primary-50', text: 'text-primary-700', gradient: 'from-primary-500 to-accent-500',
  }

  if (featured) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Link to={`/edukasi/${article.slug}`} className="card overflow-hidden block group bg-white border border-surface-200 rounded-2xl hover:border-surface-300 hover:shadow-md transition-all duration-300">
          <div className={`relative h-44 bg-gradient-to-br ${colors.gradient} flex items-center justify-center overflow-hidden`}>
            {article.image ? (
              <img 
                src={article.image} 
                alt={article.title} 
                className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-40 transition-transform duration-300 group-hover:scale-[1.02]"
                onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='block'; }}
              />
            ) : null}
            <Leaf className="w-16 h-16 text-white/20 relative z-10" style={{ display: article.image ? 'none' : 'block' }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent z-10" />
            <div className="absolute top-3 left-3 z-20">
              <span className={`badge ${colors.bg} ${colors.text} text-[10px] font-bold px-2 py-0.5 shadow-sm`}>
                {article.category || 'Edukasi'}
              </span>
            </div>
            <div className="absolute top-3 right-3 z-20">
              <span className="badge bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 shadow-sm backdrop-blur-sm border border-white/10">
                ★ Unggulan
              </span>
            </div>
          </div>
          <div className="p-4">
            <h2 className="text-base font-extrabold text-surface-900 leading-snug mb-2 group-hover:text-primary-700 transition-colors line-clamp-2">
              {article.title}
            </h2>
            <p className="text-xs text-surface-500 leading-relaxed line-clamp-2 mb-3">{article.description || "Tidak ada deskripsi tersedia."}</p>
            <div className="flex items-center gap-4 text-surface-400">
              <span className="flex items-center gap-1 text-xs">
                <Calendar className="w-3.5 h-3.5" />
                {formatDate(article.date)}
              </span>
              {article.readTime && (
                <span className="flex items-center gap-1 text-xs">
                  <Clock className="w-3.5 h-3.5" />
                  {article.readTime} menit
                </span>
              )}
            </div>
          </div>
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.35 }}
    >
      <Link to={`/edukasi/${article.slug}`} className="card p-4 block group bg-white border border-surface-200 rounded-2xl hover:border-surface-300 hover:shadow-md transition-all duration-300">
        <div className="flex items-start gap-3">
          <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center flex-shrink-0`}>
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <span className={`badge ${colors.bg} ${colors.text} text-[10px] font-semibold px-2 py-0.5 mb-1.5 inline-block`}>
              {article.category || 'Edukasi'}
            </span>
            <h3 className="text-sm font-bold text-surface-900 leading-snug mb-1 group-hover:text-primary-700 transition-colors line-clamp-2">
              {article.title}
            </h3>
            <div className="flex items-center gap-3 text-surface-400">
              <span className="text-xs">{formatDate(article.date)}</span>
              <ChevronRight className="w-3.5 h-3.5 ml-auto group-hover:text-primary-400 group-hover:translate-x-0.5 transition-all" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
