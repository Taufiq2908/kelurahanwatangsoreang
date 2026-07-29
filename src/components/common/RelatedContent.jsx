import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

export default function RelatedContent({ title, items = [], type = 'berita', ItemComponent }) {
  if (!items || items.length === 0 || !ItemComponent) return null
  
  return (
    <div className="mt-16 md:mt-20">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl md:text-2xl font-bold text-surface-900">{title}</h3>
        <Link 
          to={`/${type}`} 
          className="hidden md:flex items-center gap-1 text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors group"
        >
          Lihat Semua
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item, i) => (
          <ItemComponent key={item.id} article={item} item={item} index={i} showDetail={false} />
        ))}
      </div>
      
      <div className="mt-8 md:hidden">
        <Link 
          to={`/${type}`} 
          className="flex items-center justify-center w-full gap-2 py-3 px-4 bg-emerald-50 text-emerald-700 rounded-xl font-bold hover:bg-emerald-100 transition-colors"
        >
          Lihat Semua <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}
