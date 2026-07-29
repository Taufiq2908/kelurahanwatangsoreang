import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, Clock, ChevronRight, Newspaper } from 'lucide-react'

function formatDate(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

const categoryColors = {
  'Kegiatan Kelurahan': { bg: 'bg-primary-50', text: 'text-primary-700' },
  'UMKM':              { bg: 'bg-amber-50',   text: 'text-amber-700' },
  'Masyarakat':        { bg: 'bg-violet-50',  text: 'text-violet-700' },
  'Lingkungan':        { bg: 'bg-emerald-50', text: 'text-emerald-700' },
}

export function NewsCardFeatured({ article, index = 0 }) {
  const colors = categoryColors[article.category] || { bg: 'bg-surface-50', text: 'text-surface-600' }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
    >
      <Link to={`/berita/${article.slug}`} className="card overflow-hidden block group hover:border-surface-300 hover:shadow-md transition-all duration-300 bg-white">
        {/* Image Area */}
        <div className="relative w-full h-48 bg-emerald-50/45 border-b border-emerald-100/30 flex items-center justify-center overflow-hidden">
          {article.image ? (
            <img 
              src={article.image} 
              alt={article.title}
              onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
          ) : null}
          <div className="absolute inset-0 flex items-center justify-center" style={{ display: article.image ? 'none' : 'flex' }}>
            <Newspaper className="w-16 h-16 text-primary-600/35" />
          </div>
          <div className="absolute top-3.5 left-3.5">
            <span className={`badge ${colors.bg} ${colors.text} text-[10px] font-bold px-2.5 py-1 rounded-md border border-emerald-100/20 shadow-sm`}>
              {article.category}
            </span>
          </div>
        </div>
        <div className="p-5">
          <h2 className="text-base font-bold text-surface-900 leading-snug mb-2 group-hover:text-primary-700 transition-colors line-clamp-2">
            {article.title}
          </h2>
          <p className="text-xs text-surface-500 leading-relaxed line-clamp-3 mb-3">{article.description || "Tidak ada deskripsi tersedia."}</p>
          <div className="flex items-center gap-4 text-surface-400">
            <span className="flex items-center gap-1 text-xs font-semibold">
              <Calendar className="w-3.5 h-3.5 mr-1" />
              {formatDate(article.date)}
            </span>
            {article.readTime && (
              <span className="flex items-center gap-1 text-xs font-semibold">
                <Clock className="w-3.5 h-3.5 mr-1" />
                {article.readTime} menit baca
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

// ── Compact card ─────────────────────────────────────────────────────────────

export default function NewsCard({ article, index = 0 }) {
  const colors = categoryColors[article.category] || { bg: 'bg-surface-50', text: 'text-surface-600' }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.35 }}
      className="h-full"
    >
      <Link
        to={`/berita/${article.slug}`}
        className="flex flex-col h-full bg-white border border-surface-200 hover:border-surface-300 hover:shadow-md rounded-2xl transition-all duration-300 group overflow-hidden"
      >
        <div className="relative w-full h-40 bg-surface-50 border-b border-surface-100 flex items-center justify-center overflow-hidden">
          {article.image ? (
            <img 
              src={article.image} 
              alt={article.title}
              onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
          ) : null}
          <div className="absolute inset-0 flex items-center justify-center" style={{ display: article.image ? 'none' : 'flex' }}>
            <Newspaper className="w-12 h-12 text-surface-300 group-hover:text-emerald-500/50 transition-colors duration-500" />
          </div>
          <div className="absolute top-3 left-3">
            <span className={`badge ${colors.bg} ${colors.text} text-[10px] font-bold px-2.5 py-1 rounded-md border border-emerald-100/20`}>
              {article.category}
            </span>
          </div>
        </div>
        
        <div className="p-5 flex flex-col flex-1">
          <h3 className="text-base font-bold text-surface-900 leading-snug group-hover:text-emerald-700 transition-colors mb-2 line-clamp-2">
            {article.title}
          </h3>
          <p className="text-sm text-surface-500 leading-relaxed line-clamp-2 mb-4 flex-1">
            {article.description || "Tidak ada deskripsi tersedia."}
          </p>
          
          <div className="flex items-center gap-3 text-surface-400 mt-auto pt-4 border-t border-surface-100">
            <span className="flex items-center gap-1.5 text-xs font-semibold">
              <Calendar className="w-3.5 h-3.5" />
              {formatDate(article.date)}
            </span>
            {article.readTime && (
              <span className="flex items-center gap-1.5 text-xs font-semibold">
                <Clock className="w-3.5 h-3.5" />
                {article.readTime} mnt
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
