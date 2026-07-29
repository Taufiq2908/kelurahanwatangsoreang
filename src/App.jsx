import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from '@/layouts/MainLayout'
import ErrorBoundary from '@/components/common/ErrorBoundary'
import { SettingsProvider } from '@/contexts/SettingsContext'

// ── Route-level code splitting ─────────────────────────────────────────────
// Each page is a separate chunk, loaded only when visited.

// Static pages
const HomePage      = lazy(() => import('@/pages/HomePage'))
const ProfilPage    = lazy(() => import('@/pages/ProfilPage'))
const LayananPage   = lazy(() => import('@/pages/LayananPage'))
const AspirasiPage  = lazy(() => import('@/pages/AspirasiPage'))
const CuacaPage     = lazy(() => import('@/pages/CuacaPage'))
const PetaPage      = lazy(() => import('@/pages/PetaPage'))
const FaqPage       = lazy(() => import('@/pages/FaqPage'))
const KontakPage    = lazy(() => import('@/pages/KontakPage'))

// Dynamic: Berita
const BeritaPage       = lazy(() => import('@/pages/BeritaPage'))
const BeritaDetailPage = lazy(() => import('@/pages/BeritaDetailPage'))

// Dynamic: Pengumuman
const PengumumanPage       = lazy(() => import('@/pages/PengumumanPage'))
const PengumumanDetailPage = lazy(() => import('@/pages/PengumumanDetailPage'))

// Dynamic: Edukasi Iklim
const EdukasiPage       = lazy(() => import('@/pages/EdukasiPage'))
const EdukasiDetailPage = lazy(() => import('@/pages/EdukasiDetailPage'))

// ── Page loading fallback ──────────────────────────────────────────────────
function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-primary-200 border-t-primary-500 rounded-full animate-spin" />
        <p className="text-xs text-surface-400 font-medium">Memuat...</p>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <SettingsProvider>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route element={<MainLayout />}>
                {/* ── Static pages ─────────────────────────────────────────────── */}
                <Route path="/" element={<HomePage />} />
                <Route path="/profil" element={<ProfilPage />} />
                <Route path="/layanan" element={<LayananPage />} />
                <Route path="/aspirasi" element={<AspirasiPage />} />
                <Route path="/aspirasi/status" element={<AspirasiPage />} />
                <Route path="/cuaca" element={<CuacaPage />} />
                <Route path="/peta" element={<PetaPage />} />
                <Route path="/faq" element={<FaqPage />} />
                <Route path="/kontak" element={<KontakPage />} />

                {/* ── Dynamic: Berita ──────────────────────────────────────────── */}
                <Route path="/berita" element={<BeritaPage />} />
                <Route path="/berita/:slug" element={<BeritaDetailPage />} />

                {/* ── Dynamic: Pengumuman ──────────────────────────────────────── */}
                <Route path="/pengumuman" element={<PengumumanPage />} />
                <Route path="/pengumuman/:id" element={<PengumumanDetailPage />} />

                {/* ── Dynamic: Edukasi Iklim ───────────────────────────────────── */}
                <Route path="/edukasi" element={<EdukasiPage />} />
                <Route path="/edukasi/:slug" element={<EdukasiDetailPage />} />

                {/* ── Catch-all ────────────────────────────────────────────────── */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Route>
            </Routes>
          </Suspense>
        </SettingsProvider>
      </BrowserRouter>
    </ErrorBoundary>
  )
}
