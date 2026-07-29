import { useApiData } from './useApiData'

export function useMapLocations() {
  const { data, loading, error, refetch } = useApiData('getPeta')
  
  return { 
    locations: data || [], 
    loading, 
    error, 
    refetch 
  }
}
