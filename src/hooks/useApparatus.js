import { useApiData } from './useApiData'

export function useApparatus() {
  const { data, loading, error, refetch } = useApiData('getAparatur')
  
  // Sort by sort_order
  const apparatus = (data || []).sort((a, b) => (Number(a.sort_order) || 0) - (Number(b.sort_order) || 0))

  return { apparatus, loading, error, refetch }
}
