/**
 * reportUtils.js
 * Utility functions for the Aspirasi / Laporan Masyarakat system.
 */

const KELURAHAN_WA_NUMBER = '6282198765432' // Kantor Kelurahan Watang Soreang

// ─── Tracking code generator ──────────────────────────────────────────────────

const COUNTER_KEY = 'watsoreang_rpt_counter'

export function generateTrackingCode() {
  const counter = parseInt(localStorage.getItem(COUNTER_KEY) || '0', 10) + 1
  localStorage.setItem(COUNTER_KEY, String(counter))
  return `LP-${String(counter).padStart(4, '0')}`
}

// ─── WhatsApp URL builder ─────────────────────────────────────────────────────

/**
 * Builds a WhatsApp deep-link for identity-based report submissions.
 * Opens a pre-filled chat to the kelurahan number.
 */
export function buildWhatsAppReportUrl({ trackingCode, name, category, location, description }) {
  const lines = [
    `Halo Kelurahan Watang Soreang.`,
    ``,
    `Saya ingin menyampaikan laporan masyarakat.`,
    ``,
    `*Kode Laporan:* ${trackingCode}`,
    `*Kategori:* ${category}`,
    `*Lokasi:* ${location}`,
    ``,
    `*Isi Laporan:*`,
    description,
    ``,
    name ? `*Nama:* ${name}` : '',
    ``,
    `Mohon ditindaklanjuti. Terima kasih.`,
  ]

  const message = lines.filter((l) => l !== null).join('\n')
  return `https://wa.me/${KELURAHAN_WA_NUMBER}?text=${encodeURIComponent(message)}`
}

// ─── Date formatter ───────────────────────────────────────────────────────────

export function formatReportDate(iso) {
  return new Date(iso).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

// ─── Category config ──────────────────────────────────────────────────────────

export const REPORT_CATEGORIES = [
  { value: 'Lingkungan', label: 'Lingkungan', icon: '🌿', color: 'bg-emerald-50 text-emerald-700' },
  { value: 'Infrastruktur', label: 'Infrastruktur', icon: '🏗️', color: 'bg-amber-50 text-amber-700' },
  { value: 'Pelayanan Kelurahan', label: 'Pelayanan Kelurahan', icon: '🏛️', color: 'bg-blue-50 text-blue-700' },
  { value: 'Keamanan', label: 'Keamanan', icon: '🛡️', color: 'bg-rose-50 text-rose-700' },
  { value: 'Saran', label: 'Saran / Usulan', icon: '💡', color: 'bg-violet-50 text-violet-700' },
]

export function getCategoryConfig(value) {
  return REPORT_CATEGORIES.find((c) => c.value === value) || REPORT_CATEGORIES[0]
}

// ─── Status config ────────────────────────────────────────────────────────────

export const STATUS_STEPS = [
  { key: 'Masuk', label: 'Laporan Masuk', description: 'Laporan telah diterima oleh sistem.' },
  { key: 'Diproses', label: 'Sedang Diproses', description: 'Laporan sedang dikaji oleh petugas kelurahan.' },
  { key: 'Selesai', label: 'Selesai', description: 'Laporan telah ditindaklanjuti.' },
]

export function getStatusIndex(status) {
  return STATUS_STEPS.findIndex((s) => s.key === status)
}
