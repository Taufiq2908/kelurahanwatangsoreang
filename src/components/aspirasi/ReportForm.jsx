import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Send, User, MapPin, MessageSquare, Lock, UserX, Info,
  Leaf, HardHat, Building, Shield, Lightbulb 
} from 'lucide-react'
import { submitReport } from '@/services/aspirasi'
import { buildWhatsAppReportUrl, REPORT_CATEGORIES } from '@/utils/reportUtils'
import SuccessView from './SuccessView'

const INITIAL = {
  category: '',
  location: '',
  description: '',
  anonymous: false,
  nama: '',
  whatsapp: '',
}

export default function ReportForm() {
  const [form, setForm] = useState(INITIAL)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  function set(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
    if (errors[field]) setErrors((e) => ({ ...e, [field]: null }))
  }

  function validate() {
    const e = {}
    if (!form.category) e.category = 'Pilih kategori laporan.'
    if (form.description.trim().length < 20) e.description = 'Deskripsi minimal 20 karakter.'
    if (!form.anonymous && !form.nama.trim()) e.nama = 'Nama wajib diisi.'
    if (!form.anonymous && !form.whatsapp.trim()) e.whatsapp = 'Nomor WhatsApp wajib diisi.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    try {
      const payload = {
        anonymous: form.anonymous,
        reporter_name: form.nama,
        reporter_phone: form.whatsapp,
        category: form.category,
        location: form.location,
        description: form.description
      }
      
      const res = await submitReport(payload)
      setResult({ ...res, form })

      // Identity mode: open WhatsApp
      if (!form.anonymous) {
        const waUrl = buildWhatsAppReportUrl({
          trackingCode: res.code,
          name: form.nama,
          category: form.category,
          location: form.location || '-',
          description: form.description,
        })
        // Small delay so state updates render before navigation
        setTimeout(() => window.open(waUrl, '_blank', 'noopener,noreferrer'), 300)
      }
    } catch (err) {
      console.error(err)
      setErrors({ submit: 'Gagal mengirim laporan. Silakan coba kembali.' })
    } finally {
      setLoading(false)
    }
  }

  if (result) {
    return <SuccessView result={result} onReset={() => { setResult(null); setForm(INITIAL) }} />
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6 md:space-y-8">
      {/* Category */}
      <div>
        <label className="block text-xs font-bold text-surface-700 mb-3">
          Pilih Kategori <span className="text-rose-500">*</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {REPORT_CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              type="button"
              onClick={() => set('category', cat.value)}
              className={`flex flex-col items-center justify-center gap-2 p-3 md:p-4 rounded-xl border transition-all ${
                form.category === cat.value
                  ? 'border-emerald-400 bg-emerald-50 text-emerald-700'
                  : 'border-[#EAEAEA] bg-white text-surface-600 hover:border-surface-300'
              }`}
            >
              <span className="text-xl md:text-2xl text-emerald-600">
                {cat.value === 'Lingkungan' && <Leaf className="w-5 h-5" />}
                {cat.value === 'Infrastruktur' && <HardHat className="w-5 h-5" />}
                {cat.value === 'Pelayanan Kelurahan' && <Building className="w-5 h-5" />}
                {cat.value === 'Keamanan' && <Shield className="w-5 h-5" />}
                {cat.value === 'Saran' && <Lightbulb className="w-5 h-5" />}
              </span>
              <span className="text-[10px] md:text-xs font-bold text-center leading-tight">
                {cat.label}
              </span>
            </button>
          ))}
        </div>
        {errors.category && <p className="text-xs text-rose-500 mt-1">{errors.category}</p>}
      </div>

      {/* Location */}
      <div>
        <label className="block text-xs font-bold text-surface-700 mb-1.5">
          <MapPin className="w-3.5 h-3.5 inline mr-1.5 text-surface-400" />
          Lokasi Kejadian (Opsional)
        </label>
        <input
          type="text"
          value={form.location}
          onChange={(e) => set('location', e.target.value)}
          placeholder="Contoh: Jl. Bau Massepe, RT 02/RW 01"
          className="w-full rounded-xl border border-surface-200 px-3.5 py-3 text-sm text-surface-800 placeholder-surface-300 outline-none transition-all bg-white focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-xs font-bold text-surface-700 mb-1.5">
          <MessageSquare className="w-3.5 h-3.5 inline mr-1.5 text-surface-400" />
          Isi Laporan <span className="text-rose-500">*</span>
        </label>
        <textarea
          value={form.description}
          onChange={(e) => set('description', e.target.value)}
          placeholder="Jelaskan secara detail kondisi atau permasalahan yang ingin dilaporkan..."
          rows={5}
          className={`w-full rounded-xl border px-3.5 py-3 text-sm text-surface-800 placeholder-surface-300 outline-none transition-all resize-none focus:ring-1 focus:ring-emerald-500 ${
            errors.description ? 'border-rose-300 bg-rose-50' : 'border-surface-200 bg-white focus:border-emerald-500'
          }`}
        />
        <div className="flex justify-between mt-1">
          {errors.description
            ? <p className="text-xs text-rose-500">{errors.description}</p>
            : <span />}
          <span className={`text-[10px] font-semibold ${form.description.length < 20 ? 'text-surface-400' : 'text-emerald-600'}`}>
            {form.description.length} karakter
          </span>
        </div>
      </div>

      {/* Privacy toggle */}
      <div>
        <p className="text-xs font-bold text-surface-700 mb-2">
          <Lock className="w-3.5 h-3.5 inline mr-1.5 text-surface-400" />
          Privasi
        </p>
        <div className="grid grid-cols-2 gap-2.5">
          {[
            { value: false, label: 'Dengan Identitas', icon: <User className="w-5 h-5 text-emerald-600" />, desc: 'Laporan via WhatsApp' },
            { value: true,  label: 'Anonim',           icon: <UserX className="w-5 h-5 text-emerald-600" />, desc: 'Identitas tidak disimpan' },
          ].map((opt) => (
            <button
              key={opt.label}
              type="button"
              onClick={() => set('anonymous', opt.value)}
              className={`flex flex-col gap-1 px-3 py-3 rounded-xl border text-left transition-all ${
                form.anonymous === opt.value
                  ? 'border-emerald-400 bg-emerald-50'
                  : 'border-[#EAEAEA] bg-white hover:border-surface-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center">{opt.icon}</span>
                <span className={`text-xs font-bold ${form.anonymous === opt.value ? 'text-emerald-700' : 'text-surface-700'}`}>
                  {opt.label}
                </span>
              </div>
              <p className="text-[10px] text-surface-400 ml-7 leading-tight">{opt.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Identity fields */}
      <AnimatePresence>
        {!form.anonymous && (
          <motion.div
            key="identity"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden space-y-3"
          >
            <div>
              <label className="block text-xs font-bold text-surface-700 mb-1.5">
                <User className="w-3.5 h-3.5 inline mr-1.5 text-surface-400" />
                Nama Lengkap <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={form.nama}
                onChange={(e) => set('nama', e.target.value)}
                placeholder="Nama sesuai KTP"
                className={`w-full rounded-xl border px-3.5 py-3 text-sm outline-none transition-all focus:ring-1 focus:ring-emerald-500 ${
                  errors.nama ? 'border-rose-300 bg-rose-50/50' : 'border-surface-200 bg-white focus:border-emerald-500'
                }`}
              />
              {errors.nama && <p className="text-xs text-rose-500 mt-1">{errors.nama}</p>}
            </div>
            <div>
              <label className="block text-xs font-bold text-surface-700 mb-1.5">
                Nomor WhatsApp <span className="text-rose-500">*</span>
              </label>
              <div className="flex gap-2">
                <span className="flex items-center px-3.5 rounded-xl border border-surface-200 bg-surface-50 text-xs font-bold text-surface-500 flex-shrink-0">+62</span>
                <input
                  type="tel"
                  value={form.whatsapp}
                  onChange={(e) => set('whatsapp', e.target.value.replace(/\D/g, ''))}
                  placeholder="81234567890"
                  inputMode="numeric"
                  className={`flex-1 rounded-xl border px-3.5 py-3 text-sm outline-none transition-all focus:ring-1 focus:ring-emerald-500 ${
                    errors.whatsapp ? 'border-rose-300 bg-rose-50/50' : 'border-surface-200 bg-white focus:border-emerald-500'
                  }`}
                />
              </div>
              {errors.whatsapp && <p className="text-xs text-rose-500 mt-1">{errors.whatsapp}</p>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Info banner */}
      <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl px-4 py-3">
        <p className="text-xs text-emerald-800 leading-relaxed font-medium">
          <Info className="w-3.5 h-3.5 inline mr-1 text-emerald-600" />
          {form.anonymous
            ? 'Laporan anonim akan diberi kode pelacakan. Simpan kode tersebut untuk memantau perkembangan laporan Anda.'
            : 'Setelah submit, Anda akan diarahkan ke WhatsApp untuk mengirimkan laporan langsung ke Kelurahan Watang Soreang.'
          }
        </p>
      </div>

      {/* Submit error */}
      {errors.submit && (
        <p className="text-xs text-rose-500 text-center font-semibold">{errors.submit}</p>
      )}

      {/* Submit button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-sm font-bold shadow-sm hover:shadow active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            Mengirim...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            {form.anonymous ? 'Kirim Laporan Anonim' : 'Kirim & Buka WhatsApp'}
          </>
        )}
      </button>
    </form>
  )
}
