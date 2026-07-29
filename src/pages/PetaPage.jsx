import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Navigation, MapPin, ArrowRight, FolderOpen } from 'lucide-react'
import { Link } from 'react-router-dom'

import SEO from '@/components/common/SEO'
import PageHeader from '@/components/common/PageHeader'
import SearchBar from '@/components/common/SearchBar'
import CategoryFilter from '@/components/common/CategoryFilter'
import EmptyState from '@/components/common/EmptyState'
import { SkeletonList } from '@/components/common/Skeleton'
import HeroMap from '@/components/peta/HeroMap'

import { useMapLocations } from '@/hooks/useMapLocations'
import { useApiData } from '@/hooks/useApiData'
import { fadeUpStaggerItemVariants, staggerContainerVariants } from '@/design/motion'

export default function PetaPage() {
  const { locations, loading, error } = useMapLocations()
  const { data: categoriesData } = useApiData('getPetaKategori')
  
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('semua')
  const [selectedLocation, setSelectedLocation] = useState(null)
  
  // Format categories for shared CategoryFilter
  const dynamicCategories = useMemo(() => {
    const safeCats = categoriesData || [];
    // Only show categories that have data
    const usedCategoryIds = new Set(locations.map(loc => loc.category_id))
    const activeCats = safeCats.filter(c => usedCategoryIds.has(c.id))
    
    return [
      { id: 'semua', label: 'Semua Lokasi' },
      ...activeCats.map(c => ({ id: c.id, label: c.name }))
    ]
  }, [categoriesData, locations])
  
  // Instant filtering feel (debounce)
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchTerm), 150)
    return () => clearTimeout(timer)
  }, [searchTerm])

  // Filter & Sort Logic
  const filteredLocations = useMemo(() => {
    return locations.filter(loc => {
      // Allow if status is 'publish' or if status is undefined/empty
      if (loc.status && String(loc.status).toLowerCase() !== 'publish') return false
      
      const matchCat = activeCategory === 'semua' || String(loc.category_id) === String(activeCategory)
      
      const searchLower = debouncedSearch.toLowerCase()
      const matchSearch = !searchLower || 
        (loc.name && String(loc.name).toLowerCase().includes(searchLower)) ||
        (loc.address && String(loc.address).toLowerCase().includes(searchLower)) ||
        (loc.description && String(loc.description).toLowerCase().includes(searchLower))
        
      return matchCat && matchSearch
    }).sort((a, b) => {
      // Prioritize featured, then display order
      if (a.featured === 'TRUE' && b.featured !== 'TRUE') return -1
      if (a.featured !== 'TRUE' && b.featured === 'TRUE') return 1
      return (parseInt(a.display_order) || 0) - (parseInt(b.display_order) || 0)
    })
  }, [locations, activeCategory, debouncedSearch])

  // Helpers
  const getCatDetails = (catId) => (categoriesData || []).find(c => c.id === catId) || { name: 'Lainnya' }
  
  const getCoverImage = (imagesStr) => {
    try {
      const arr = JSON.parse(imagesStr || '[]')
      return arr.length > 0 ? arr[0] : null
    } catch { return null }
  }

  // Handle Card Click (Mobile scroll to map, select location)
  const handleSelectLocation = (loc) => {
    setSelectedLocation(loc)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="w-full bg-white">
      <SEO 
        title="Direktori Lokasi" 
        description="Temukan informasi alamat, layanan publik, dan UMKM di wilayah Kelurahan Watang Soreang."
        path="/peta"
      />
      
      <PageHeader 
        title="Direktori Lokasi" 
        subtitle="Temukan berbagai fasilitas publik, sekolah, kantor, hingga UMKM lokal di Kelurahan Watang Soreang."
        icon={Navigation}
      />
      
      <section className="pt-8 pb-16 md:pt-12 md:pb-24 bg-surface-50">
        <div className="container-editorial px-6 md:px-12">
          
          <div className="max-w-6xl mx-auto flex flex-col">
            
            {/* 1. HERO MAP */}
            <div className="mb-8 md:mb-10">
              <HeroMap 
                locations={filteredLocations}
                selectedLocation={selectedLocation}
                onSelectLocation={setSelectedLocation}
                categoriesData={categoriesData}
              />
            </div>
            
            {/* 2. SEARCH & CATEGORY FILTER */}
            <div className="mb-8 md:mb-10 space-y-5">
              <SearchBar
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder="Cari nama lokasi atau alamat..."
              />
              <CategoryFilter
                categories={dynamicCategories}
                active={activeCategory}
                onChange={setActiveCategory}
              />
            </div>

            {/* 3. LOCATION CARDS DIRECTORY */}
            <div className="flex flex-col">
              {loading && <SkeletonList count={4} />}

              {!loading && error && (
                <div className="py-8 text-center text-red-500 bg-red-50 rounded-2xl border border-red-100">
                  <p className="text-sm font-medium">{error}</p>
                </div>
              )}

              {!loading && !error && filteredLocations.length === 0 && (
                <EmptyState
                  title="Tidak ada lokasi"
                  description="Coba gunakan kata kunci pencarian lain atau pilih kategori yang berbeda."
                  icon={FolderOpen}
                />
              )}

              {!loading && !error && filteredLocations.length > 0 && (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-surface-500">
                      Menampilkan {filteredLocations.length} Lokasi
                    </span>
                  </div>

                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  >
                    {filteredLocations.map((loc) => {
                        const cat = getCatDetails(loc.category_id)
                        const img = getCoverImage(loc.images)
                        const isSelected = selectedLocation?.id === loc.id
                        
                        return (
                          <motion.div
                            key={loc.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <button
                              onClick={() => handleSelectLocation(loc)}
                              className={`text-left w-full h-full flex flex-col bg-white border ${
                                isSelected 
                                  ? 'border-surface-400 shadow-md ring-1 ring-surface-400/20' 
                                  : 'border-surface-200 hover:border-surface-300 hover:shadow-md focus-visible:ring-2 focus-visible:ring-surface-400 focus-visible:outline-none'
                              } rounded-2xl transition-all duration-300 group overflow-hidden`}
                            >
                              {/* Image Thumbnail */}
                              <div className="relative w-full h-48 sm:h-44 shrink-0 bg-surface-50 border-b border-surface-100 flex items-center justify-center overflow-hidden">
                                {img ? (
                                  <img 
                                    src={img} 
                                    alt={loc.name} 
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]" 
                                    onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }}
                                  />
                                ) : null}
                                <div className="absolute inset-0 flex items-center justify-center" style={{ display: img ? 'none' : 'flex' }}>
                                  <MapPin className="w-10 h-10 text-surface-300 group-hover:text-emerald-500/40 transition-colors duration-300" />
                                </div>
                                {loc.featured === 'TRUE' && (
                                  <div className="absolute top-3 left-3 bg-amber-50 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded border border-amber-100/50 shadow-sm">
                                    TOP
                                  </div>
                                )}
                              </div>
                              
                              {/* Content */}
                              <div className="p-5 flex flex-col flex-1 min-w-0">
                                <div>
                                  <div className="mb-3">
                                    <span className="inline-block text-[9px] font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2 py-1 rounded border border-emerald-100/50">
                                      {cat.name}
                                    </span>
                                  </div>
                                  <h3 className={`text-base md:text-lg font-bold leading-snug line-clamp-2 transition-colors mb-2 ${isSelected ? 'text-surface-900' : 'text-surface-900 group-hover:text-emerald-700'}`}>
                                    {loc.name}
                                  </h3>
                                  
                                  {loc.address && (
                                    <p className="text-xs md:text-sm text-surface-500 mb-3 font-medium flex items-start gap-1.5">
                                      <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5 text-surface-400" />
                                      <span className="line-clamp-2 leading-relaxed">{loc.address}</span>
                                    </p>
                                  )}
                                </div>
                                
                                {/* Footer Action */}
                                <div className="flex items-center justify-start mt-auto pt-4">
                                  <span className={`text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors ${isSelected ? 'text-surface-900' : 'text-surface-400 group-hover:text-emerald-600'}`}>
                                    Lihat di Peta <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                                  </span>
                                </div>
                              </div>
                            </button>
                          </motion.div>
                        )
                      })}
                  </motion.div>
                </>
              )}
            </div>
            
          </div>
        </div>
      </section>
    </div>
  )
}
