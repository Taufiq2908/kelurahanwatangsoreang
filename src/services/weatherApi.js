/**
 * Weather API Service — Open-Meteo
 * https://open-meteo.com/en/docs
 *
 * Location: Kelurahan Watang Soreang, Kota Parepare, Sulawesi Selatan
 * No API key required.
 * Timezone: Asia/Makassar (WITA, UTC+8)
 */

const PAREPARE_LAT = -4.0135
const PAREPARE_LON = 119.6235
const TIMEZONE = 'Asia/Makassar'
const FORECAST_DAYS = 7

const BASE_URL = 'https://api.open-meteo.com/v1/forecast'

// ─── Cache ────────────────────────────────────────────────────────────────────

const CACHE_TTL_MS = 30 * 60 * 1000 // 30 minutes
let cached = null
let cachedAt = null

function isCacheValid() {
  return cached !== null && cachedAt !== null && Date.now() - cachedAt < CACHE_TTL_MS
}

export function invalidateWeatherCache() {
  cached = null
  cachedAt = null
}

// ─── Fetch ────────────────────────────────────────────────────────────────────

/**
 * Fetches complete weather data for Parepare.
 * Returns a processed, UI-ready object.
 *
 * @returns {Promise<WeatherData>}
 */
export async function fetchWeather() {
  if (isCacheValid()) return cached

  const params = new URLSearchParams({
    latitude: PAREPARE_LAT,
    longitude: PAREPARE_LON,
    timezone: TIMEZONE,
    forecast_days: FORECAST_DAYS,
    current: [
      'temperature_2m',
      'relative_humidity_2m',
      'apparent_temperature',
      'weather_code',
      'wind_speed_10m',
      'wind_direction_10m',
      'precipitation',
    ].join(','),
    hourly: [
      'temperature_2m',
      'weather_code',
      'precipitation_probability',
      'wind_speed_10m',
    ].join(','),
    daily: [
      'weather_code',
      'temperature_2m_max',
      'temperature_2m_min',
      'precipitation_sum',
      'precipitation_probability_max',
      'wind_speed_10m_max',
    ].join(','),
  })

  const res = await fetch(`${BASE_URL}?${params}`)
  if (!res.ok) throw new Error(`Weather API error: ${res.status}`)
  const raw = await res.json()

  const processed = processWeatherData(raw)
  cached = processed
  cachedAt = Date.now()
  return processed
}

// ─── Data processor ───────────────────────────────────────────────────────────

function processWeatherData(raw) {
  const { current, hourly, daily } = raw

  // Current
  const currentData = {
    temperature: Math.round(current.temperature_2m),
    feelsLike: Math.round(current.apparent_temperature),
    humidity: current.relative_humidity_2m,
    windSpeed: Math.round(current.wind_speed_10m),
    windDirection: current.wind_direction_10m,
    precipitation: current.precipitation,
    weatherCode: current.weather_code,
  }

  // Hourly — next 24 h from now
  const nowHour = new Date().setMinutes(0, 0, 0)
  const hourlyData = hourly.time
    .map((t, i) => ({
      time: t,
      temperature: Math.round(hourly.temperature_2m[i]),
      weatherCode: hourly.weather_code[i],
      precipProbability: hourly.precipitation_probability[i],
      windSpeed: Math.round(hourly.wind_speed_10m[i]),
    }))
    .filter((h) => new Date(h.time).getTime() >= nowHour)
    .slice(0, 24)

  // Daily — 7 days
  const dailyData = daily.time.map((t, i) => ({
    date: t,
    weatherCode: daily.weather_code[i],
    tempMax: Math.round(daily.temperature_2m_max[i]),
    tempMin: Math.round(daily.temperature_2m_min[i]),
    precipSum: daily.precipitation_sum[i],
    precipProbMax: daily.precipitation_probability_max[i],
    windMax: Math.round(daily.wind_speed_10m_max[i]),
  }))

  return {
    current: currentData,
    hourly: hourlyData,
    daily: dailyData,
    fetchedAt: new Date(),
    location: 'Kota Parepare',
  }
}
