import { useState, useMemo } from 'react'
import { Newspaper } from 'lucide-react'
import PageHeader from '@/components/common/PageHeader'
import SearchBar from '@/components/common/SearchBar'
import CategoryFilter from '@/components/common/CategoryFilter'
import EmptyState from '@/components/common/EmptyState'
import ErrorState from '@/components/common/ErrorState'
import { SkeletonList } from '@/components/common/Skeleton'
import NewsCard, { NewsCardFeatured } from '@/components/news/NewsCard'
import { useNews } from '@/hooks/useNews'
import SEO from '@/components/common/SEO'

export default function BeritaPage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('semua')

  const { data = [], loading, error, categories = [] } = useNews({ category: activeCategory, search })

  const dynamicCategories = useMemo(() => {
    const safeCats = categories || [];
    return safeCats.map(c => ({
      id: c,
      label: c === 'semua' ? 'Semua Kategori' : c
    }))
  }, [categories])

  const safeData = data || [];
  const featured = safeData[0]
  const rest = safeData.slice(1)

  return (
    <div className="w-full">
      <SEO
        title="Berita & Kegiatan"
        description="Berita terkini, kegiatan, dan informasi dari Kelurahan Watang Soreang, Kecamatan Soreang, Kota Parepare."
        path="/berita"
      />
      <PageHeader
        title="Berita & Kegiatan"
        subtitle="Informasi terkini dan kegiatan dari Pemerintah Kelurahan Watang Soreang"
        icon={Newspaper}
      />

      <section className="pt-8 pb-16 md:pt-12 md:pb-24 bg-surface-50">
        <div className="container-editorial px-6 md:px-12">
          {/* Sticky filter area */}
          <div className="sticky top-14 md:top-16 z-30 bg-surface-50/90 backdrop-blur-md py-4 md:py-6 mb-4 md:mb-8 border-b border-surface-200/50">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
              <div className="w-full md:w-96">
                <SearchBar
                  value={search}
                  onChange={setSearch}
                  placeholder="Cari berita..."
                />
              </div>
              <div className="w-full md:w-auto">
                <CategoryFilter
                  categories={dynamicCategories}
                  active={activeCategory}
                  onChange={setActiveCategory}
                />
              </div>
            </div>
          </div>

          <div className="max-w-5xl mx-auto">
            {loading && <SkeletonList count={3} featured />}

            {!loading && error && (
              <ErrorState message={error} />
            )}

            {!loading && !error && data.length === 0 && (
              <EmptyState
                title="Belum ada berita"
                description="Coba gunakan kata kunci lain atau pilih kategori 'Semua'."
              />
            )}

            {!loading && !error && data.length > 0 && (
              <div className="space-y-6 md:space-y-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-surface-500">
                    Menampilkan {data.length} Berita
                  </span>
                </div>
                
                {featured && <NewsCardFeatured article={featured} index={0} />}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {rest.map((article, i) => (
                    <NewsCard key={article.id} article={article} index={i + 1} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
