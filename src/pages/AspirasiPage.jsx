import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MessageSquarePlus, PenTool, Search, Info } from 'lucide-react'
import PageHeader from '@/components/common/PageHeader'
import ReportForm from '@/components/aspirasi/ReportForm'
import TrackingView from '@/components/aspirasi/TrackingView'
import SEO from '@/components/common/SEO'

const TABS = [
  { id: 'form',    label: 'Buat Laporan', icon: <PenTool className="w-5 h-5" /> },
  { id: 'status',  label: 'Cek Status',   icon: <Search className="w-5 h-5" /> },
]

export default function AspirasiPage() {
  const location = useLocation()
  const initialTab = location.pathname.endsWith('/status') ? 'status' : 'form'
  const [activeTab, setActiveTab] = useState(initialTab)

  return (
    <div className="w-full">
      <SEO
        title="Aspirasi & Laporan Masyarakat"
        description="Sampaikan aspirasi, saran, keluhan, dan laporan masyarakat kepada Kelurahan Watang Soreang secara online."
        path="/aspirasi"
      />

      <PageHeader
        title="Aspirasi & Laporan"
        subtitle="Sampaikan keluhan, masukan, dan laporan kejadian kepada Pemerintah Kelurahan Watang Soreang secara cepat dan aman."
        icon={MessageSquarePlus}
      />

      <section className="pt-8 pb-16 md:pt-12 md:pb-24 bg-surface-50">
        <div className="container-editorial px-6 md:px-12">
          
          <div className="max-w-[860px] mx-auto">
            {/* Notice */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 md:p-6 mb-8 md:mb-12 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center flex-shrink-0 shadow-sm border border-emerald-100">
                <Info className="w-5 h-5 text-emerald-600" />
              </div>
              <p className="text-sm md:text-base text-emerald-900 leading-relaxed font-medium pt-1">
                Kami menerima setiap aspirasi, masukan, dan laporan dari warga. Setiap pengaduan akan ditindaklanjuti secara profesional sesuai prosedur yang berlaku.
              </p>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 bg-surface-200/50 rounded-2xl p-1.5 mb-8 md:mb-10 max-w-2xl mx-auto">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 md:py-3.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-white text-emerald-700 shadow-sm ring-1 ring-black/5'
                      : 'text-surface-600 hover:text-surface-900 hover:bg-surface-100/50'
                  }`}
                >
                  <span className="flex items-center justify-center">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="bg-white border border-surface-200 rounded-3xl p-6 md:p-10 shadow-sm">
              {activeTab === 'form' ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ReportForm />
                </motion.div>
              ) : (
                <motion.div
                  key="status"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <TrackingView />
                </motion.div>
              )}
            </div>

            {/* Footer Information Card */}
            <div className="mt-12 bg-surface-50 border border-surface-200 rounded-2xl p-6 md:p-8">
              <h3 className="text-sm font-bold text-surface-900 mb-4 flex items-center gap-2">
                <Info className="w-5 h-5 text-emerald-600" />
                Panduan Pelaporan
              </h3>
              <ul className="space-y-3 text-sm font-medium text-surface-600 list-disc pl-5">
                <li>Semua aspirasi dan laporan ditinjau secara berkala oleh aparat Kelurahan Watang Soreang.</li>
                <li>Gunakan bahasa yang sopan, jelas, dan mudah dipahami.</li>
                <li>Berikan informasi yang spesifik untuk mempercepat proses tindak lanjut.</li>
                <li>Laporan yang masuk akan diproses dalam waktu 3–7 hari kerja.</li>
              </ul>
            </div>
            
          </div>

        </div>
      </section>
    </div>
  )
}
