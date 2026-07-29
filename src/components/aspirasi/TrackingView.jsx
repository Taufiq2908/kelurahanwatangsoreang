import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, CheckCircle, Clock, Loader2, Info, Leaf, HardHat, Building, Shield, Lightbulb, XCircle } from 'lucide-react'
import { getReportStatus } from '@/services/aspirasi'
import {
  STATUS_STEPS, getStatusIndex, getCategoryConfig, formatReportDate,
} from '@/utils/reportUtils'

export default function TrackingView() {
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [report, setReport] = useState(null)
  const [notFound, setNotFound] = useState(false)
  const [error, setError] = useState(null)

  async function handleSearch(e) {
    e.preventDefault()
    const trimmed = code.trim().toUpperCase()
    if (!trimmed) return
    setLoading(true)
    setReport(null)
    setNotFound(false)
    setError(null)

    try {
      const result = await getReportStatus(trimmed)
      if (!result) {
        setNotFound(true)
      } else {
        setReport(result)
      }
    } catch (err) {
      if (err.message && err.message.toLowerCase().includes('tidak ditemukan')) {
        setNotFound(true)
      } else {
        setError(err.message || 'Gagal mengambil data. Silakan coba kembali.')
      }
    } finally {
      setLoading(false)
    }
  }

  const statusIndex = report ? getStatusIndex(report.status) : -1

  return (
    <div className="space-y-4">
      {/* Search form */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="LP-0001"
            maxLength={15}
            className="w-full rounded-xl border border-surface-200 bg-white pl-10 pr-3.5 py-3 text-sm font-mono font-bold text-surface-800 placeholder-surface-300 outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all uppercase"
          />
        </div>
        <button
          type="submit"
          disabled={loading || !code.trim()}
          className="flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
          Cek
        </button>
      </form>

      <p className="text-xs text-surface-400 text-center">
        Masukkan kode laporan seperti <strong>LP-0001</strong> yang Anda dapatkan saat submit.
      </p>

      {/* Not found */}
      {notFound && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-6 text-center border border-surface-200 rounded-3xl"
        >
          <Info className="w-8 h-8 text-surface-400 mx-auto mb-3" />
          <p className="text-sm font-bold text-surface-800 mb-1">Kode tidak ditemukan</p>
          <p className="text-xs text-surface-400">Pastikan kode yang Anda masukkan benar, atau laporan belum terdaftar di perangkat ini.</p>
        </motion.div>
      )}

      {/* Error */}
      {error && (
        <div className="card p-4 text-center">
          <p className="text-xs text-rose-500 font-semibold">{error}</p>
        </div>
      )}

      {/* Report detail */}
      {report && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-4"
        >
          {/* Summary card */}
          <div className="card p-4 space-y-3 border border-surface-200 rounded-2xl">
            <div className="flex items-center justify-between">
              <span className="text-sm font-black text-emerald-700 font-mono tracking-wider">{report.code}</span>
              <span className="text-xs text-surface-400">{formatReportDate(report.date)}</span>
            </div>
            <div className="flex items-center gap-2">
              {(() => {
                const cat = getCategoryConfig(report.category)
                return (
                  <>
                    <span className="text-emerald-600">
                      {report.category === 'Lingkungan' && <Leaf className="w-4 h-4" />}
                      {report.category === 'Infrastruktur' && <HardHat className="w-4 h-4" />}
                      {report.category === 'Pelayanan Kelurahan' && <Building className="w-4 h-4" />}
                      {report.category === 'Keamanan' && <Shield className="w-4 h-4" />}
                      {report.category === 'Saran' && <Lightbulb className="w-4 h-4" />}
                    </span>
                    <span className={`badge ${cat.color} text-xs font-bold px-2 py-0.5`}>{report.category}</span>
                  </>
                )
              })()}
            </div>
            <div>
              <p className="text-[10px] text-surface-400 font-medium mb-0.5">Lokasi</p>
              <p className="text-sm text-surface-700">{report.location || '-'}</p>
            </div>
            <div>
              <p className="text-[10px] text-surface-400 font-medium mb-0.5">Deskripsi</p>
              <p className="text-sm text-surface-700 leading-relaxed line-clamp-3">{report.description}</p>
            </div>
          </div>

          {/* Status timeline */}
          <div className="card p-4 border border-surface-200 rounded-2xl">
            <p className="text-xs font-bold text-surface-700 mb-4">Progress Laporan</p>
            
            {report.status?.toLowerCase() === 'ditolak' || report.status?.toLowerCase() === 'invalid' ? (
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-colors bg-rose-600">
                    <XCircle className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>
                <div className="pb-2 flex-1">
                  <p className="text-sm font-bold text-rose-700">Laporan Ditolak / Invalid</p>
                  <p className="text-xs text-surface-500 mt-0.5 leading-relaxed">
                    {report.response || "Laporan tidak dapat diproses lebih lanjut."}
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-0">
                {STATUS_STEPS.map((step, i) => {
                  const isDone = i <= statusIndex
                  const isCurrent = i === statusIndex
                  const isLast = i === STATUS_STEPS.length - 1
                  return (
                    <div key={step.key} className="flex gap-4">
                      {/* Line + dot */}
                      <div className="flex flex-col items-center">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                          isDone
                            ? isCurrent
                              ? 'bg-emerald-600'
                              : 'bg-emerald-500'
                            : 'bg-surface-200'
                        }`}>
                          {isDone
                            ? isCurrent
                              ? <Clock className="w-3.5 h-3.5 text-white" />
                              : <CheckCircle className="w-3.5 h-3.5 text-white" />
                            : <span className="w-2 h-2 rounded-full bg-surface-300" />
                          }
                        </div>
                        {!isLast && (
                          <div className={`w-0.5 h-8 my-0.5 ${i < statusIndex ? 'bg-emerald-500' : 'bg-surface-200'}`} />
                        )}
                      </div>
                      {/* Text */}
                      <div className="pb-8 flex-1">
                        <p className={`text-sm font-bold ${isDone ? (isCurrent ? 'text-emerald-700' : 'text-emerald-700') : 'text-surface-400'}`}>
                          {step.label}
                        </p>
                        <p className="text-xs text-surface-500 mt-0.5 leading-relaxed">
                          {isCurrent && report.response ? report.response : step.description}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  )
}
