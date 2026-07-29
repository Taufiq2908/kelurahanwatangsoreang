import { motion } from 'framer-motion'
import { CheckCircle, Copy, ExternalLink, RotateCcw } from 'lucide-react'
import { useState } from 'react'
import { buildWhatsAppReportUrl, getCategoryConfig, formatReportDate } from '@/utils/reportUtils'

export default function SuccessView({ result, onReset }) {
  const [copied, setCopied] = useState(false)
  const { code, anonymous, form } = result
  const catConfig = getCategoryConfig(form.category)

  function copyCode() {
    navigator.clipboard?.writeText(code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  function openWhatsApp() {
    const url = buildWhatsAppReportUrl({
      trackingCode: code,
      name: form.nama,
      category: form.category,
      location: form.location,
      description: form.description,
    })
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="text-center py-4"
    >
      {/* Check icon */}
      <div className="w-16 h-16 rounded-2xl bg-emerald-500 flex items-center justify-center mx-auto mb-5 shadow-sm">
        <CheckCircle className="w-8 h-8 text-white" />
      </div>

      <h2 className="text-xl font-bold text-surface-900 mb-1">
        Laporan Terkirim!
      </h2>
      <p className="text-xs text-surface-500 mb-6">
        {anonymous
          ? 'Laporan anonim Anda berhasil diterima.'
          : 'Laporan Anda berhasil diterima. Silakan kirim pesan WhatsApp ke kelurahan.'}
      </p>

      {/* Tracking code card */}
      <div className="bg-[#F8FAF8] border border-emerald-150 rounded-2xl p-5 mb-4 text-center">
        <p className="text-[10px] font-bold text-surface-450 uppercase tracking-wider mb-2.5">Kode Laporan Anda</p>
        <div className="flex items-center justify-center gap-3">
          <span className="text-3xl font-black text-emerald-800 tracking-wider font-mono">{code}</span>
          <button
            onClick={copyCode}
            className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100/50 flex items-center justify-center hover:bg-emerald-100/50 transition-colors"
            title="Salin kode"
          >
            {copied
              ? <CheckCircle className="w-4.5 h-4.5 text-emerald-600" />
              : <Copy className="w-4.5 h-4.5 text-primary-600" />
            }
          </button>
        </div>
        <p className="text-xs text-emerald-700 mt-3 font-semibold">
          Simpan kode ini untuk memantau perkembangan laporan Anda.
        </p>
      </div>

      {/* Summary */}
      <div className="card p-4 text-left mb-4 space-y-2.5">
        <div className="flex items-center gap-2">
          <span className="text-lg">{catConfig.icon}</span>
          <div>
            <p className="text-[10px] text-surface-400 font-medium">Kategori</p>
            <p className="text-sm font-bold text-surface-800">{form.category}</p>
          </div>
        </div>
        <div>
          <p className="text-[10px] text-surface-400 font-medium">Lokasi</p>
          <p className="text-sm text-surface-700">{form.location}</p>
        </div>
        <div>
          <p className="text-[10px] text-surface-400 font-medium">Status</p>
          <span className="badge bg-emerald-50 text-emerald-700 text-xs font-bold px-2 py-0.5">✓ Laporan Masuk</span>
        </div>
      </div>

      {/* WhatsApp CTA (identity mode) */}
      {!anonymous && (
        <button
          onClick={openWhatsApp}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-sm font-bold transition-colors mb-3.5"
        >
          <ExternalLink className="w-4 h-4" />
          Buka WhatsApp Kelurahan
        </button>
      )}

      {/* Reset */}
      <button
        onClick={onReset}
        className="flex items-center gap-2 text-xs text-surface-400 hover:text-surface-600 transition-colors mx-auto"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        Kirim laporan baru
      </button>
    </motion.div>
  )
}
