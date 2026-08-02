/**
 * Google Sheets → Google Apps Script → React API Service
 */

const API_URL = import.meta.env.VITE_GOOGLE_SHEET_API_URL || 'https://script.google.com/macros/s/AKfycbyc9gjs5Ai910ZPmqj6OwNFTI_G4VGYdRWrlLI7EtKi-Z119QNg2N5sInxMceTrH2Id/exec';

// Simple in-memory cache
const cache = new Map()
const CACHE_TTL_MS = 5 * 60 * 1000 // 5 minutes

// ─── UTILS ───────────────────────────────────────────────────────────────

function convertDriveUrl(url) {
  if (!url) return '';
  // Convert Drive Viewer URL to direct image URL
  const match = url.match(/drive\.google\.com\/file\/d\/([^\/]+)/);
  if (match && match[1]) {
    return `https://drive.google.com/uc?export=view&id=${match[1]}`;
  }
  return url;
}

function generateDescription(content) {
  if (!content) return '';
  // Strip simple HTML tags if any, then truncate
  const plainText = content.replace(/<[^>]*>?/gm, '');
  return plainText.length > 120 ? plainText.substring(0, 120) + '...' : plainText;
}

function parseTags(tags) {
  if (!tags) return [];
  if (Array.isArray(tags)) return tags;
  if (typeof tags === 'string') {
    if (tags.trim().startsWith('[')) {
      try { return JSON.parse(tags); } catch { return []; }
    }
    return tags.split(',').map(t => t.trim()).filter(Boolean);
  }
  return [];
}

function formatArticle(item) {
  return {
    ...item,
    date: item.published_at || item.created_at,
    description: generateDescription(item.content),
    image: convertDriveUrl(item.image || item.thumbnail || item.attachment),
    tags: item.tags ? parseTags(item.tags) : []
  };
}

function getFromCache(key) {
  const entry = cache.get(key)
  if (!entry) return null
  if (Date.now() - entry.timestamp > CACHE_TTL_MS) {
    cache.delete(key)
    return null
  }
  return entry.data
}

function setCache(key, data) {
  cache.set(key, { data, timestamp: Date.now() })
}

export function invalidateCache(key) {
  if (key) cache.delete(key)
  else cache.clear()
}

/** Robust fetch with timeout */
async function fetchWithTimeout(resource, options = {}) {
  const { timeout = 15000 } = options;
  
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  const response = await fetch(resource, {
    ...options,
    signal: controller.signal
  });
  clearTimeout(id);

  return response;
}

// ─── Fetch helper ─────────────────────────────────────────────────────────────

export async function apiFetch(action, params = {}, options = {}) {
  const urlParams = new URLSearchParams({ action, ...params })
  const requestUrl = `${API_URL}?${urlParams.toString()}`

  const fetchOptions = {
    method: options.method || 'GET',
    headers: { 
      'Accept': 'application/json',
      ...options.headers 
    },
  }

  if (options.method === 'POST') {
    fetchOptions.headers['Content-Type'] = 'text/plain;charset=utf-8'
    fetchOptions.body = options.body
  }

  try {
    const res = await fetchWithTimeout(requestUrl, fetchOptions)

    const rawText = await res.text()

    if (!res.ok) {
      throw new Error(`Koneksi ke server gagal. Status: ${res.status} ${res.statusText}`)
    }

    if (rawText.trim().toLowerCase().startsWith('<!doctype html>') || rawText.trim().toLowerCase().startsWith('<html')) {
      throw new Error('API returned HTML instead of JSON. Check Google Apps Script deployment permissions.')
    }

    let json;
    try {
      json = JSON.parse(rawText)
    } catch (parseError) {
      throw new Error(`Gagal memparsing JSON. Status: ${res.status}`)
    }

    if (json.status === 'error') {
      throw new Error(json.message || `Terjadi kesalahan pada server. Status: ${res.status}`)
    }

    return json.data
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error(`Koneksi timeout. Request URL: ${requestUrl}`)
    }
    throw new Error(error.message || `Terjadi kesalahan jaringan saat memuat data. Request URL: ${requestUrl}`)
  }
}

// ─── Cached fetch ─────────────────────────────────────────────────────────────

async function fetchCached(cacheKey, fetcher) {
  const cached = getFromCache(cacheKey)
  if (cached !== null) return cached
  const data = await fetcher()
  setCache(cacheKey, data)
  return data
}

// ─── ENDPOINTS ─────────────────────────────────────────────────────────────

export async function getHomepageData() {
  const data = await fetchCached('homepage', () => apiFetch('getHomepage'))
  if (!data) return null
  return {
    ...data,
    berita: (data.berita || []).map(formatArticle),
    pengumuman: (data.pengumuman || []).map(item => ({ 
      ...item, 
      date: item.published_at || item.created_at,
      image: convertDriveUrl(item.image || item.attachment)
    }))
  }
}

export async function getProfilData() {
  return fetchCached('profil', () => apiFetch('getProfil'))
}

export async function getLayanan() {
  return fetchCached('layanan', () => apiFetch('getLayanan'))
}

export async function getFaq() {
  return fetchCached('faq', () => apiFetch('getFaq'))
}

export async function getPeta() {
  return fetchCached('peta', () => apiFetch('getPeta'))
}

export async function getKontak() {
  const data = await fetchCached('kontak', () => apiFetch('getKontak'))
  return (data || []).map(item => ({
    ...item,
    image: convertDriveUrl(item.photo || item.image)
  }))
}

export async function getAparatur() {
  const data = await fetchCached('aparatur', () => apiFetch('getAparatur'))
  return (data || []).map(item => ({
    ...item,
    image: convertDriveUrl(item.photo || item.image)
  }))
}

export async function getNews() {
  const data = await fetchCached('news_list', () => apiFetch('getBerita'))
  return data.map(formatArticle)
}

export async function getNewsBySlug(slug) {
  const data = await fetchCached(`news_${slug}`, () => apiFetch('getBeritaDetail', { slug }))
  return formatArticle(data)
}

export async function getAnnouncements() {
  const data = await fetchCached('announcements_list', () => apiFetch('getPengumuman'))
  return data.map(item => ({ 
    ...item, 
    date: item.published_at || item.created_at,
    image: convertDriveUrl(item.image || item.attachment)
  }))
}

export async function getAnnouncementById(id) {
  const data = await fetchCached(`announcement_${id}`, () => apiFetch('getPengumumanDetail', { id }))
  
  const attachments = data.attachment ? [{
    url: convertDriveUrl(data.attachment),
    name: 'Dokumen Lampiran',
    type: data.attachment.includes('pdf') ? 'PDF' : 'DOC',
    size: 'Tersedia'
  }] : [];

  return { 
    ...data, 
    date: data.published_at || data.created_at,
    image: convertDriveUrl(data.image), // typically Pengumuman has no cover image, but just in case
    attachments
  }
}

export async function getClimateArticles() {
  const data = await fetchCached('climate_list', () => apiFetch('getEdukasi'))
  return data.map(formatArticle)
}

export async function getClimateArticleBySlug(slug) {
  const data = await fetchCached(`climate_${slug}`, () => apiFetch('getEdukasiDetail', { slug }))
  return formatArticle(data)
}

export async function submitLaporan(payload) {
  return apiFetch('submitLaporan', {}, {
    method: 'POST',
    body: JSON.stringify(payload)
  })
}

export async function getLaporanStatus(trackingCode) {
  return apiFetch('getLaporanStatus', { tracking_code: trackingCode })
}

export async function getPetaKategori() { return fetchCached('petaKategori', () => apiFetch('getPetaKategori')); }

export async function getSettings() {
  return fetchCached('profil', () => apiFetch('getProfil'))
}
