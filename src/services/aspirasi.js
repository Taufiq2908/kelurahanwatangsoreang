import { generateTrackingCode } from '@/utils/reportUtils'
import { submitLaporan, getLaporanStatus as apiGetLaporanStatus } from './googleSheetApi'

const STORAGE_KEY = 'watsoreang_reports'

const IS_MOCK = false;

// ─── Local storage helpers ────────────────────────────────────────────────────

function getStoredReports() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  } catch {
    return []
  }
}

function saveReport(report) {
  try {
    const existing = getStoredReports()
    existing.push(report)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing))
    return true
  } catch {
    return false
  }
}

// ─── Submit Report ────────────────────────────────────────────────────────────

export async function submitReport(formData) {
  if (IS_MOCK) {
    // Simulate network delay
    await new Promise((r) => setTimeout(r, 800))

    const code = generateTrackingCode()
    const report = {
      code,
      category: formData.category,
      location: formData.location,
      description: formData.description,
      date: new Date().toISOString(),
      status: 'Masuk',
      notes: 'Laporan Anda telah diterima dan akan segera ditindaklanjuti oleh petugas kelurahan.',
      anonymous: formData.anonymous,
    }

    saveReport(report)

    return { success: true, code, anonymous: formData.anonymous }
  }

  // ── Real API submission ───────────────────────────────────────────────────
  const json = await submitLaporan(formData)
  
  if (!json || !json.tracking_code) {
      throw new Error("Gagal mendapatkan kode pelacakan dari server")
  }

  return { success: true, code: json.tracking_code, anonymous: formData.anonymous }
}

// ─── Get Report Status ────────────────────────────────────────────────────────

export async function getReportStatus(code) {
  const normalised = code.toUpperCase().trim()

  if (IS_MOCK) {
    await new Promise((r) => setTimeout(r, 500))
    const reports = getStoredReports()
    return reports.find((r) => r.code === normalised) ?? null
  }

  const backendData = await apiGetLaporanStatus(normalised)
  if (!backendData) return null;
  
  return {
    code: backendData.tracking_code || backendData.id || normalised,
    status: backendData.status || 'Masuk',
    date: backendData.created_at || new Date().toISOString(),
    category: backendData.category || 'Lainnya',
    location: backendData.location || '-',
    description: backendData.description || 'Tidak ada deskripsi',
    notes: backendData.response || backendData.response_text || ''
  }
}
