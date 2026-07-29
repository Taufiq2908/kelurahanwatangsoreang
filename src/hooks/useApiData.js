import { useState, useEffect, useCallback } from 'react'
import * as api from '@/services/googleSheetApi'

export function useApiData(apiFunction, params = null) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const load = useCallback(async () => {
    let cancelled = false
    setLoading(true)
    setError(null)
    
    try {
      // Use the appropriate API function based on string name or direct function
      let fetcher;
      if (typeof apiFunction === 'string') {
        fetcher = api[apiFunction];
        if (!fetcher) throw new Error(`API function ${apiFunction} not found`);
      } else {
        fetcher = apiFunction;
      }
      
      const result = await fetcher(params)
      if (!cancelled) {
        setData(result)
        setLoading(false)
      }
    } catch (err) {
      if (!cancelled) {
        console.error(`[useApiData: ${apiFunction}]`, err)
        setError(err.message || 'Data tidak tersedia. Silakan coba kembali nanti.')
        setLoading(false)
      }
    }
    
    return () => { cancelled = true }
  }, [apiFunction, params])

  useEffect(() => {
    load()
  }, [load])

  return { data, loading, error, refetch: load }
}
