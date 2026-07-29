import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { getWeatherInfo, getWeatherTips } from '@/utils/weatherUtils'

export default function WeatherTips({ weatherCode }) {
  const info = getWeatherInfo(weatherCode)
  const tips = getWeatherTips(info.severity)

  return (
    <div>
      <h3 className="text-sm font-bold text-surface-800 mb-3">Tips Lingkungan Hari Ini</h3>
      <div className="space-y-2.5">
        {tips.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07, duration: 0.3 }}
            className="card flex items-start gap-3 p-3.5"
          >
            <span className="text-2xl flex-shrink-0 mt-0.5">{item.icon}</span>
            <p className="text-sm text-surface-700 leading-relaxed">{item.tip}</p>
          </motion.div>
        ))}
      </div>

      {/* Climate education CTA */}
      <Link
        to="/edukasi"
        className="w-full flex items-center gap-3.5 p-4 bg-[#F8FAF8] border border-[#EAEAEA] hover:border-primary-200 rounded-2xl hover:shadow-[0_2px_8px_rgba(0,0,0,0.01),0_12px_28px_rgba(0,0,0,0.02)] transition-all duration-200 group block mt-4"
      >
        <div className="flex items-center gap-3 w-full">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100/50 flex items-center justify-center flex-shrink-0 text-emerald-600">
            <span className="text-xl">🌿</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-emerald-800">Baca Edukasi Iklim</p>
            <p className="text-xs text-emerald-600 font-medium">Pelajari cara menjaga lingkungan pesisir Parepare</p>
          </div>
          <ChevronRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-0.5 transition-transform flex-shrink-0" />
        </div>
      </Link>
    </div>
  )
}
