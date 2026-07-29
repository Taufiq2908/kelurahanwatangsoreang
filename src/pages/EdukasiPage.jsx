import { useState, useMemo } from 'react'
import { Leaf } from 'lucide-react'
import PageHeader from '@/components/common/PageHeader'
import CategoryFilter from '@/components/common/CategoryFilter'
import EmptyState from '@/components/common/EmptyState'
import ErrorState from '@/components/common/ErrorState'
import { SkeletonList } from '@/components/common/Skeleton'
import { useClimateArticles } from '@/hooks/useClimateArticles'
import SEO from '@/components/common/SEO'
import ClimateCard from '@/components/edukasi/ClimateCard'

export default function EdukasiPage() {
  const [activeCategory, setActiveCategory] = useState('semua')
  const { data = [], loading, error, categories = [] } = useClimateArticles({ category: activeCategory })

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
        title="Edukasi Perubahan Iklim"
        description="Artikel edukasi lingkungan dan perubahan iklim dari program KKN Kelurahan Watang Soreang, Kota Parepare."
        path="/edukasi"
      />
      <PageHeader
        title="Edukasi Iklim"
        subtitle="Materi edukasi lingkungan hidup dan adaptasi perubahan iklim bersama Program KKN"
        icon={Leaf}
      />

      <section className="pt-8 pb-16 md:pt-12 md:pb-24 bg-surface-50">
        <div className="container-editorial px-6 md:px-12">
          
          <div className="max-w-4xl mx-auto">
            {/* KKN context note */}
            <div className="mb-6 bg-emerald-50 border border-emerald-200 rounded-2xl p-5 flex items-start md:items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center flex-shrink-0 border border-emerald-100 shadow-sm mt-1 md:mt-0">
                <Leaf className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-emerald-800 leading-relaxed font-medium">
                  Program edukasi ini merupakan bagian dari inisiatif <strong className="font-bold text-emerald-900">KKN Tematik Perubahan Iklim</strong> di Kelurahan Watang Soreang bekerja sama dengan Pemerintah Kota Parepare.
                </p>
              </div>
            </div>

            {/* Sticky filter */}
            <div className="sticky top-14 md:top-16 z-30 bg-surface-50/90 backdrop-blur-md py-4 md:py-6 mb-4 md:mb-8 border-b border-surface-200/50">
              <div className="w-full">
                <CategoryFilter
                  categories={dynamicCategories}
                  active={activeCategory}
                  onChange={setActiveCategory}
                />
              </div>
            </div>

            <div className="space-y-6 md:space-y-8">
              {loading && <SkeletonList count={3} featured />}

              {!loading && error && <ErrorState message={error} />}

              {!loading && !error && data.length === 0 && (
                <EmptyState
                  title="Belum ada artikel"
                  description="Pilih kategori lain atau cek kembali nanti."
                />
              )}

              {!loading && !error && data.length > 0 && (
                <>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-surface-500">
                      Menampilkan {data.length} Artikel Edukasi
                    </span>
                  </div>
                  
                  {featured && <ClimateCard article={featured} featured />}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    {rest.map((article, i) => (
                      <ClimateCard key={article.id} article={article} index={i + 1} />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
