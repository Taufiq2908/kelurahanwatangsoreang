/**
 * weatherUtils.js
 * WMO weather code mappings, Indonesian labels, and format helpers.
 * Reference: https://open-meteo.com/en/docs#weathervariables
 */

// ─── WMO Weather Codes → Indonesian labels ────────────────────────────────────

const WMO_MAP = {
  0:  { label: 'Cerah',              icon: '☀️',  severity: 'good',    bg: 'from-amber-400 to-orange-400' },
  1:  { label: 'Cerah Berawan',      icon: '🌤️', severity: 'good',    bg: 'from-amber-300 to-sky-400' },
  2:  { label: 'Berawan Sebagian',   icon: '⛅',  severity: 'good',    bg: 'from-sky-400 to-slate-400' },
  3:  { label: 'Mendung',            icon: '☁️',  severity: 'neutral', bg: 'from-slate-400 to-slate-500' },
  45: { label: 'Berkabut',           icon: '🌫️', severity: 'neutral', bg: 'from-slate-300 to-slate-400' },
  48: { label: 'Berkabut Beku',      icon: '🌫️', severity: 'neutral', bg: 'from-slate-300 to-slate-400' },
  51: { label: 'Gerimis Ringan',     icon: '🌦️', severity: 'neutral', bg: 'from-sky-400 to-slate-500' },
  53: { label: 'Gerimis',            icon: '🌦️', severity: 'neutral', bg: 'from-sky-500 to-slate-500' },
  55: { label: 'Gerimis Lebat',      icon: '🌧️', severity: 'warning', bg: 'from-sky-600 to-indigo-600' },
  61: { label: 'Hujan Ringan',       icon: '🌧️', severity: 'neutral', bg: 'from-sky-500 to-blue-600' },
  63: { label: 'Hujan',              icon: '🌧️', severity: 'warning', bg: 'from-blue-600 to-indigo-700' },
  65: { label: 'Hujan Lebat',        icon: '🌧️', severity: 'warning', bg: 'from-blue-700 to-indigo-800' },
  71: { label: 'Salju Ringan',       icon: '🌨️', severity: 'neutral', bg: 'from-sky-200 to-slate-300' },
  73: { label: 'Salju',              icon: '❄️',  severity: 'warning', bg: 'from-sky-200 to-slate-300' },
  75: { label: 'Salju Lebat',        icon: '❄️',  severity: 'warning', bg: 'from-sky-200 to-slate-300' },
  77: { label: 'Butir Salju',        icon: '🌨️', severity: 'neutral', bg: 'from-sky-200 to-slate-300' },
  80: { label: 'Hujan Lokal',        icon: '🌦️', severity: 'neutral', bg: 'from-sky-500 to-blue-600' },
  81: { label: 'Hujan Deras',        icon: '🌧️', severity: 'warning', bg: 'from-blue-600 to-indigo-700' },
  82: { label: 'Hujan Sangat Lebat', icon: '⛈️', severity: 'danger',  bg: 'from-indigo-700 to-slate-800' },
  85: { label: 'Hujan Salju',        icon: '🌨️', severity: 'warning', bg: 'from-sky-300 to-slate-400' },
  86: { label: 'Hujan Salju Lebat',  icon: '🌨️', severity: 'warning', bg: 'from-sky-300 to-slate-400' },
  95: { label: 'Hujan Petir',        icon: '⛈️', severity: 'danger',  bg: 'from-slate-700 to-indigo-900' },
  96: { label: 'Badai Petir + Es',   icon: '🌩️', severity: 'danger',  bg: 'from-slate-800 to-indigo-900' },
  99: { label: 'Badai Parah',        icon: '🌩️', severity: 'danger',  bg: 'from-slate-900 to-indigo-900' },
}

const DEFAULT_WEATHER = { label: 'Tidak Diketahui', icon: '❓', severity: 'neutral', bg: 'from-slate-400 to-slate-500' }

export function getWeatherInfo(code) {
  return WMO_MAP[code] ?? DEFAULT_WEATHER
}

// ─── Severity → color classes ─────────────────────────────────────────────────

export function getSeverityColors(severity) {
  switch (severity) {
    case 'good':    return { text: 'text-amber-700',  badge: 'bg-amber-50 text-amber-700' }
    case 'warning': return { text: 'text-blue-700',   badge: 'bg-blue-50 text-blue-700' }
    case 'danger':  return { text: 'text-indigo-900', badge: 'bg-indigo-100 text-indigo-800' }
    default:        return { text: 'text-surface-700', badge: 'bg-surface-100 text-surface-600' }
  }
}

// ─── Climate/environment tips ─────────────────────────────────────────────────

const TIPS = {
  good: [
    { icon: '🏖️', tip: 'Hari yang baik untuk kegiatan di luar. Gunakan tabir surya jika terik.' },
    { icon: '🌱', tip: 'Waktu ideal untuk berkebun atau menanam tanaman di halaman.' },
    { icon: '♻️', tip: 'Manfaatkan cuaca cerah untuk menjemur sampah kering sebelum dibawa ke bank sampah.' },
    { icon: '🌊', tip: 'Cuaca kondusif untuk kegiatan bersih pantai. Ikut program Watang Soreang Bersih!' },
  ],
  neutral: [
    { icon: '☁️', tip: 'Cuaca nyaman untuk aktivitas ringan di dalam atau luar ruangan.' },
    { icon: '💧', tip: 'Kondisi cuaca cocok untuk penghematan air—matikan keran saat tidak digunakan.' },
    { icon: '🚶', tip: 'Kondisi baik untuk berjalan kaki menggantikan kendaraan, kurangi emisi karbon.' },
    { icon: '🌿', tip: 'Simpan air hujan untuk digunakan menyiram tanaman besok.' },
  ],
  warning: [
    { icon: '🚫', tip: 'Hindari membuang sampah ke drainase atau got—dapat menyebabkan banjir.' },
    { icon: '🏠', tip: 'Periksa atap dan saluran air rumah Anda agar tidak bocor saat hujan.' },
    { icon: '🌊', tip: 'Waspadai kenaikan muka air di kawasan pesisir Teluk Parepare.' },
    { icon: '🔒', tip: 'Pastikan barang-barang di luar rumah diamankan sebelum hujan tiba.' },
  ],
  danger: [
    { icon: '⚠️', tip: 'Tetap di dalam rumah dan hindari perjalanan yang tidak perlu.' },
    { icon: '📱', tip: 'Pantau info cuaca BMKG dan ikuti arahan dari kelurahan.' },
    { icon: '🚨', tip: 'Segera laporkan pohon tumbang atau drainase tersumbat ke kelurahan.' },
    { icon: '🌊', tip: 'Warga pesisir harap waspada terhadap gelombang tinggi dan banjir rob.' },
  ],
}

export function getWeatherTips(severity) {
  return TIPS[severity] ?? TIPS.neutral
}

// ─── Format helpers ───────────────────────────────────────────────────────────

export function formatHour(isoTime) {
  return new Date(isoTime).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', hour12: false })
}

export function formatDayShort(isoDate) {
  return new Date(isoDate).toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short' })
}

export function formatDayFull(isoDate) {
  return new Date(isoDate).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' })
}

export function formatLastUpdated(date) {
  return date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', hour12: false })
}

// ─── Wind direction helper ─────────────────────────────────────────────────────

export function getWindDirection(deg) {
  if (deg === undefined) return ''
  const dirs = ['U', 'TL', 'T', 'TG', 'S', 'BD', 'B', 'BL']
  return dirs[Math.round(deg / 45) % 8]
}
