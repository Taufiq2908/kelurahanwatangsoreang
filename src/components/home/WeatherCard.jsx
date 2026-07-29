import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, CloudRain, Wind, Droplets } from 'lucide-react'
import { useWeather } from '@/hooks/useWeather'
import { getWeatherInfo } from '@/utils/weatherUtils'
import { fadeUpVariants } from '@/design/motion'

export default function WeatherCard() {
  const { data, loading, error } = useWeather()

  if (loading || error || !data || !data.current || !data.hourly || !data.daily) return null

  const current = data.current
  const currentInfo = getWeatherInfo(current.weatherCode)
  
  const laterHour = data.hourly[3] // 3 hours later
  const laterInfo = laterHour ? getWeatherInfo(laterHour.weatherCode) : null
  
  const tomorrow = data.daily[1] // tomorrow
  const tomorrowInfo = tomorrow ? getWeatherInfo(tomorrow.weatherCode) : null

  return (
    <section className="pt-12 md:pt-16 pb-8 md:pb-12 bg-surface-50 border-t border-surface-200">
      <div className="container-editorial px-6 md:px-12">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUpVariants}
          className="bg-white rounded-2xl border border-surface-200 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.04)] overflow-hidden"
        >
          {/* Top Section: Current Weather */}
          <div className="p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 border-b border-surface-100">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-surface-50 rounded-full flex items-center justify-center text-4xl md:text-5xl border border-surface-100 shadow-inner">
                {currentInfo.icon}
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-700 mb-1.5">
                  Cuaca Saat Ini • Parepare
                </span>
                <div className="flex items-baseline gap-3 mb-1">
                  <span className="text-4xl md:text-5xl font-extrabold text-surface-900 tracking-tighter">
                    {Math.round(current.temperature)}°
                  </span>
                  <span className="text-lg md:text-xl font-bold text-surface-600">
                    {currentInfo.label}
                  </span>
                </div>
                <span className="text-xs font-medium text-surface-500">
                  Terasa seperti {Math.round(current.feelsLike)}°C
                </span>
              </div>
            </div>

            {/* Current Metrics */}
            <div className="grid grid-cols-3 gap-6 md:gap-10 w-full md:w-auto">
              <div className="flex flex-col items-center md:items-start gap-1">
                <div className="flex items-center gap-1.5 text-surface-400">
                  <Droplets className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Kelembapan</span>
                </div>
                <span className="text-sm font-bold text-surface-900">{current.humidity}%</span>
              </div>
              <div className="flex flex-col items-center md:items-start gap-1">
                <div className="flex items-center gap-1.5 text-surface-400">
                  <Wind className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Angin</span>
                </div>
                <span className="text-sm font-bold text-surface-900">{Math.round(current.windSpeed)} km/j</span>
              </div>
              <div className="flex flex-col items-center md:items-start gap-1">
                <div className="flex items-center gap-1.5 text-surface-400">
                  <CloudRain className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Peluang Hujan</span>
                </div>
                <span className="text-sm font-bold text-surface-900">{data.hourly[0]?.precipProbability || 0}%</span>
              </div>
            </div>
          </div>

          {/* Bottom Section: Forecast Summary */}
          <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-surface-100 bg-surface-50/50">
            {laterHour && (
              <div className="flex-1 p-4 md:p-5 flex items-center justify-between md:justify-center gap-6 group hover:bg-surface-50 transition-colors">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-surface-500 mb-0.5">3 Jam Kedepan</span>
                  <span className="text-sm font-bold text-surface-900">{laterInfo.label}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl" aria-hidden="true">{laterInfo.icon}</span>
                  <span className="text-xl font-extrabold text-surface-900">{Math.round(laterHour.temperature)}°</span>
                </div>
              </div>
            )}
            
            {tomorrow && (
              <div className="flex-1 p-4 md:p-5 flex items-center justify-between md:justify-center gap-6 group hover:bg-surface-50 transition-colors">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-surface-500 mb-0.5">Besok</span>
                  <span className="text-sm font-bold text-surface-900">{tomorrowInfo.label}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl" aria-hidden="true">{tomorrowInfo.icon}</span>
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-extrabold text-surface-900">{Math.round(tomorrow.tempMax)}°</span>
                    <span className="text-xs font-bold text-surface-400">{Math.round(tomorrow.tempMin)}°</span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex-1 p-4 md:p-5 flex items-center justify-center">
              <Link
                to="/cuaca"
                className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-surface-900 hover:text-emerald-700 transition-colors group outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 rounded p-1"
              >
                Prakiraan Lengkap
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
