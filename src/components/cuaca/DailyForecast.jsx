import { motion } from 'framer-motion'
import { getWeatherInfo, formatDayShort } from '@/utils/weatherUtils'
import { Droplets, Wind } from 'lucide-react'

export default function DailyForecast({ daily }) {
  if (!daily?.length) return null

  return (
    <div>
      <h3 className="text-sm font-bold text-surface-800 mb-3">Prakiraan 7 Hari</h3>
      <div className="space-y-2">
        {daily.map((d, i) => {
          const info = getWeatherInfo(d.weatherCode)
          const isToday = i === 0
          return (
            <motion.div
              key={d.date}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
              className={`card flex items-center gap-3.5 p-3.5 ${isToday ? 'border-primary-200 bg-primary-50/25' : 'border-[#EAEAEA]'}`}
            >
              {/* Day label */}
              <div className="w-16 flex-shrink-0">
                <p className={`text-xs font-bold ${isToday ? 'text-primary-800' : 'text-surface-700'}`}>
                  {isToday ? 'Hari ini' : formatDayShort(d.date)}
                </p>
              </div>

              {/* Icon */}
              <span className="text-2xl flex-shrink-0">{info.icon}</span>

              {/* Condition */}
              <p className="text-xs text-surface-500 flex-1 line-clamp-1">{info.label}</p>

              {/* Rain */}
              {d.precipProbMax > 0 && (
                <div className="flex items-center gap-0.5 text-[10px] text-blue-600 font-medium flex-shrink-0">
                  <Droplets className="w-3 h-3" />
                  {d.precipProbMax}%
                </div>
              )}

              {/* Temp range */}
              <div className="flex items-center gap-1 text-xs flex-shrink-0">
                <span className="font-bold text-surface-800">{d.tempMax}°</span>
                <span className="text-surface-400">/</span>
                <span className="text-surface-500">{d.tempMin}°</span>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
