import { motion } from 'framer-motion'
import { getWeatherInfo, formatHour } from '@/utils/weatherUtils'
import { Droplets } from 'lucide-react'

export default function HourlyForecast({ hourly }) {
  if (!hourly?.length) return null

  return (
    <div>
      <h3 className="text-sm font-bold text-surface-800 mb-3">Prakiraan Per Jam</h3>
      <div className="flex gap-3 overflow-x-auto pb-3 snap-x snap-mandatory scrollbar-hide -mx-4 px-4">
        {hourly.map((h, i) => {
          const info = getWeatherInfo(h.weatherCode)
          const isNow = i === 0
          return (
            <motion.div
              key={h.time}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03, duration: 0.3 }}
              className={`snap-start flex-shrink-0 flex flex-col items-center gap-1.5 rounded-2xl px-3 py-3.5 min-w-[70px] border transition-colors ${
                isNow
                  ? 'bg-primary-50 border-primary-200 text-primary-700 shadow-[0_1px_3px_rgba(0,0,0,0.01)]'
                  : 'bg-white border-[#EAEAEA] text-surface-700'
              }`}
            >
              <p className={`text-[10px] font-bold uppercase tracking-wider ${isNow ? 'text-primary-700/80' : 'text-surface-400'}`}>
                {isNow ? 'Kini' : formatHour(h.time)}
              </p>
              <span className="text-2xl leading-none select-none filter drop-shadow-sm">{info.icon}</span>
              <p className={`text-sm font-extrabold ${isNow ? 'text-primary-800' : 'text-surface-800'}`}>
                {h.temperature}°
              </p>
              {h.precipProbability > 0 && (
                <div className={`flex items-center gap-0.5 text-[9px] font-bold ${isNow ? 'text-primary-600' : 'text-blue-600'}`}>
                  <Droplets className="w-3 h-3 flex-shrink-0" />
                  {h.precipProbability}%
                </div>
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
