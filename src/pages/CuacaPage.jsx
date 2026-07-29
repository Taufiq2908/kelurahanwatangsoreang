import { useState } from 'react'
import { motion } from 'framer-motion'
import { CloudSun } from 'lucide-react'
import PageHeader from '@/components/common/PageHeader'
import ErrorState from '@/components/common/ErrorState'
import CurrentWeather from '@/components/cuaca/CurrentWeather'
import HourlyForecast from '@/components/cuaca/HourlyForecast'
import DailyForecast from '@/components/cuaca/DailyForecast'
import WeatherTips from '@/components/cuaca/WeatherTips'
import { useWeather } from '@/hooks/useWeather'
import SEO from '@/components/common/SEO'

// ── Skeleton placeholders ─────────────────────────────────────────────────────
function SkeletonCurrent() {
  return (
    <div className="rounded-3xl overflow-hidden animate-pulse bg-gradient-to-br from-surface-200 to-surface-300 h-64" />
  )
}

function SkeletonStrip({ count = 8 }) {
  return (
    <div className="flex gap-3">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="flex-shrink-0 w-[70px] h-28 rounded-2xl bg-surface-200 animate-pulse" />
      ))}
    </div>
  )
}

const TABS = [
  { id: 'hourly', label: 'Per Jam' },
  { id: 'daily',  label: 'Harian' },
]

export default function CuacaPage() {
  const { data, loading, error, refetch } = useWeather()
  const [activeTab, setActiveTab] = useState('hourly')

  return (
    <div className="w-full">
      <SEO
        title="Informasi Cuaca Parepare"
        description="Prakiraan cuaca terkini Kota Parepare dan Kelurahan Watang Soreang. Data dari Open-Meteo."
        path="/cuaca"
      />
      <PageHeader
        title="Informasi Cuaca"
        subtitle="Prakiraan cuaca Kota Parepare berdasarkan data real-time dari Open-Meteo."
        icon={CloudSun}
      />

      <section className="pt-8 pb-16 md:pt-12 md:pb-24 bg-surface-50">
        <div className="container-editorial px-6 md:px-12">
          
          <div className="max-w-3xl mx-auto space-y-6 md:space-y-8">
            {/* Current weather */}
            {loading && <SkeletonCurrent />}
            {!loading && error && <ErrorState message={error} onRetry={refetch} />}
            {!loading && !error && data && (
              <CurrentWeather
                current={data.current}
                fetchedAt={data.fetchedAt}
                onRefetch={refetch}
              />
            )}

            {/* Forecast tabs */}
            {!loading && !error && data && (
              <div className="bg-white border border-surface-200 rounded-3xl p-6 md:p-8 shadow-sm">
                {/* Tab switcher */}
                <div className="flex gap-2 bg-surface-100/80 rounded-2xl p-1.5 mb-8">
                  {TABS.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all duration-200 ${
                        activeTab === tab.id
                          ? 'bg-white text-sky-700 shadow-sm ring-1 ring-black/5'
                          : 'text-surface-600 hover:text-surface-900 hover:bg-surface-200/50'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Tab content */}
                {activeTab === 'hourly' ? (
                  <motion.div
                    key="hourly"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <HourlyForecast hourly={data.hourly} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="daily"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <DailyForecast daily={data.daily} />
                  </motion.div>
                )}

                {/* Divider */}
                <div className="border-t border-surface-100 my-8" />

                {/* Climate tips */}
                <WeatherTips weatherCode={data.current.weatherCode} />
              </div>
            )}

            {/* Data source note */}
            <p className="text-center text-xs text-surface-400 font-medium">
              Data cuaca disajikan dari{' '}
              <a href="https://open-meteo.com" target="_blank" rel="noopener noreferrer" className="text-sky-600 font-bold hover:underline">
                Open-Meteo
              </a>
              {' '}· Diperbarui setiap 30 menit
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
