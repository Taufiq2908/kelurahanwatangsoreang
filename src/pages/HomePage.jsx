import HeroSection from '@/components/home/HeroSection'
import QuickAccessMenu from '@/components/home/QuickAccessMenu'
import PopularServices from '@/components/home/PopularServices'
import AnnouncementPreview from '@/components/home/AnnouncementPreview'
import LatestNews from '@/components/home/LatestNews'
import WeatherCard from '@/components/home/WeatherCard'
import ClimateEducationPreview from '@/components/home/ClimateEducationPreview'
import SEO from '@/components/common/SEO'
import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div className="w-full bg-white selection:bg-emerald-200 selection:text-emerald-900">
      <SEO
        title="Beranda"
        description="Portal Digital resmi Kelurahan Watang Soreang, Kecamatan Soreang, Kota Parepare. Layanan publik, berita, pengumuman, dan aspirasi masyarakat."
        path="/"
      />

      <main className="flex flex-col">
        <HeroSection />
        <QuickAccessMenu />
        <AnnouncementPreview />
        <PopularServices />
        <LatestNews />
        <WeatherCard />
        <ClimateEducationPreview />
      </main>

    </div>
  )
}
