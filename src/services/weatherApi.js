import { apiFetch } from '@/services/googleSheetApi'

/**
 * Weather API Service
 * Fetches weather data securely via Google Apps Script (which acts as a proxy/cache for WeatherAPI).
 * Location: Kelurahan Watang Soreang, Kota Parepare
 */

const CACHE_TTL_MS = 5 * 60 * 1000 // 5 minutes frontend cache to prevent rapid re-renders
let cached = null
let cachedAt = null

function isCacheValid() {
  return cached !== null && cachedAt !== null && Date.now() - cachedAt < CACHE_TTL_MS
}

export function invalidateWeatherCache() {
  cached = null
  cachedAt = null
}

/**
 * Fetches normalized weather data for Parepare.
 * @returns {Promise<WeatherData>}
 */
export async function fetchWeather() {
  if (isCacheValid()) return cached

  try {
    const processed = await apiFetch('getWeather')
    
    // Convert string timestamps back to Date objects if needed by UI
    if (processed.fetchedAt) {
      processed.fetchedAt = new Date(processed.fetchedAt)
    }
    
    cached = processed
    cachedAt = Date.now()
    return processed
  } catch (error) {
    console.error("Gagal mengambil data cuaca:", error)
    throw error
  }
}
