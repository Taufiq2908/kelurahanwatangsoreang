import { motion } from 'framer-motion'
import { Droplets, Wind, Thermometer, RefreshCw } from 'lucide-react'
import { getWeatherInfo, formatLastUpdated } from '@/utils/weatherUtils'

export default function CurrentWeather({ current, fetchedAt, onRefetch }) {
  const info = getWeatherInfo(current.weatherCode)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="relative overflow-hidden rounded-3xl bg-white border border-[#EAEAEA] shadow-[0_1px_3px_rgba(0,0,0,0.01),0_4px_12px_rgba(0,0,0,0.015)]"
    >
      {/* Subtle organic ambient accent */}
      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-emerald-500/[0.015] pointer-events-none" />
      <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-primary-500/[0.01] pointer-events-none" />

      <div className="relative p-6">
        {/* Location + refresh */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-surface-800 text-xs font-bold">📍 Kota Parepare</p>
            <p className="text-surface-400 text-[9px] font-bold uppercase tracking-wider mt-0.5">Kec. Soreang · WITA</p>
          </div>
          <button
            onClick={onRefetch}
            className="w-8 h-8 rounded-full bg-surface-50 border border-surface-200/50 flex items-center justify-center hover:bg-surface-100 transition-colors"
            title="Perbarui data cuaca"
          >
            <RefreshCw className="w-3.5 h-3.5 text-surface-600" />
          </button>
        </div>

        {/* Main temp + icon */}
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="flex items-start gap-0.5">
              <span className="text-7xl font-extrabold text-surface-900 leading-none tracking-tighter">{current.temperature}</span>
              <span className="text-3xl font-light text-surface-400 mt-1">°C</span>
            </div>
            <p className="text-surface-800 text-base font-bold mt-2">{info.label}</p>
          </div>
          <span className="text-7xl leading-none select-none filter drop-shadow-sm">{info.icon}</span>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-[#F8FAF8] border border-surface-100/50 rounded-2xl p-3 text-center">
            <Droplets className="w-4 h-4 text-primary-500 mx-auto mb-1.5" />
            <p className="text-surface-900 text-base font-extrabold leading-none">{current.humidity}%</p>
            <p className="text-surface-400 text-[9px] font-bold uppercase tracking-wider mt-1.5">Kelembapan</p>
          </div>
          <div className="bg-[#F8FAF8] border border-surface-100/50 rounded-2xl p-3 text-center">
            <Thermometer className="w-4 h-4 text-primary-500 mx-auto mb-1.5" />
            <p className="text-surface-900 text-base font-extrabold leading-none">{current.feelsLike}°</p>
            <p className="text-surface-400 text-[9px] font-bold uppercase tracking-wider mt-1.5">Terasa</p>
          </div>
          <div className="bg-[#F8FAF8] border border-surface-100/50 rounded-2xl p-3 text-center">
            <Wind className="w-4 h-4 text-primary-500 mx-auto mb-1.5" />
            <p className="text-surface-900 text-base font-extrabold leading-none">{current.windSpeed}</p>
            <p className="text-surface-400 text-[9px] font-bold uppercase tracking-wider mt-1.5">km/j Angin</p>
          </div>
        </div>

        {/* Last updated */}
        {fetchedAt && (
          <p className="text-surface-400 text-[10px] font-medium text-center mt-5">
            Diperbarui pukul {formatLastUpdated(fetchedAt)} WITA
          </p>
        )}
      </div>
    </motion.div>
  )
}
