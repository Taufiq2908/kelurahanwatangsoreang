import { useState, useEffect, useCallback } from 'react'
import { fetchWeather } from '@/services/weatherApi'

/**
 * useWeather — fetches and caches WeatherAPI data for Parepare.
 * The underlying service caches for 10 minutes.
 */
export function useWeather() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await fetchWeather()
      setData(result)
    } catch (err) {
      console.error('[useWeather]', err)
      setError('Data cuaca tidak tersedia. Silakan coba kembali nanti.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  return { data, loading, error, refetch: load }
}
