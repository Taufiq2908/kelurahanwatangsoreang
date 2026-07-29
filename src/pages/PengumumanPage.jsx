import { Megaphone } from 'lucide-react'
import PageHeader from '@/components/common/PageHeader'
import ErrorState from '@/components/common/ErrorState'
import EmptyState from '@/components/common/EmptyState'
import { SkeletonList, SkeletonAnnouncement } from '@/components/common/Skeleton'
import AnnouncementCard from '@/components/pengumuman/AnnouncementCard'
import { useAnnouncements } from '@/hooks/useAnnouncements'
import SEO from '@/components/common/SEO'

export default function PengumumanPage() {
  const { data, loading, error, importantCount } = useAnnouncements()
  const safeData = data || []

  return (
    <div className="w-full">
      <SEO
        title="Pengumuman"
        description="Pengumuman resmi dan informasi terbaru dari Kelurahan Watang Soreang, Kecamatan Soreang, Kota Parepare."
        path="/pengumuman"
      />
      <PageHeader
        title="Pengumuman"
        subtitle="Informasi resmi dan pemberitahuan penting dari Pemerintah Kelurahan Watang Soreang"
        icon={Megaphone}
      />

      <section className="pt-8 pb-16 md:pt-12 md:pb-24 bg-surface-50">
        <div className="container-editorial px-6 md:px-12">
          <div className="max-w-3xl mx-auto">
            {/* Important count banner */}
            {!loading && importantCount > 0 && (
              <div className="mb-8 bg-rose-50 border border-rose-200 rounded-2xl p-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center flex-shrink-0 border border-rose-100 shadow-sm">
                  <span className="text-xl">🚨</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-rose-800 mb-1">Perhatian</h4>
                  <p className="text-sm text-rose-700 font-medium">
                    Terdapat <span className="font-bold">{importantCount} pengumuman penting</span> yang memerlukan perhatian Anda
                  </p>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {loading && (
                <>
                  {[...Array(4)].map((_, i) => <SkeletonAnnouncement key={i} />)}
                </>
              )}

              {!loading && error && <ErrorState message={error} />}

              {!loading && !error && safeData.length === 0 && (
                <EmptyState
                  title="Belum ada pengumuman"
                  description="Belum ada pengumuman yang diterbitkan saat ini."
                />
              )}

              {!loading && !error && safeData.length > 0 && (
                <>
                  <p className="text-xs text-surface-400 font-bold uppercase tracking-widest mb-6">
                    Menampilkan {safeData.length} pengumuman
                  </p>
                  <div className="flex flex-col gap-4">
                    {safeData.map((item, i) => (
                      <AnnouncementCard key={item.id} item={item} index={i} showDetail />
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
