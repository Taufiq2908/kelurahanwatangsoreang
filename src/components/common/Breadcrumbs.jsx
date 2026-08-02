import { Link } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'
import { Helmet } from 'react-helmet-async'

export default function Breadcrumbs({ items }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Beranda",
        "item": "https://kelurahanwatangsoreang.web.id/"
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 2,
        "name": item.label,
        "item": item.path ? `https://kelurahanwatangsoreang.web.id${item.path}` : undefined
      }))
    ]
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      </Helmet>
      <nav className="flex text-sm text-surface-500 font-medium mb-6 overflow-x-auto whitespace-nowrap scrollbar-hide py-1">
      <ol className="flex items-center gap-2">
        <li>
          <Link to="/" className="hover:text-emerald-700 transition-colors flex items-center gap-1.5">
            <Home className="w-4 h-4" />
            <span className="sr-only">Beranda</span>
          </Link>
        </li>
        
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              <ChevronRight className="w-4 h-4 text-surface-300 flex-shrink-0" />
              {isLast || !item.path ? (
                <span className="text-surface-900 font-bold max-w-[200px] md:max-w-md truncate" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link to={item.path} className="hover:text-emerald-700 transition-colors">
                  {item.label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
    </>
  )
}
