import { useApiData } from './useApiData'

export function useServices() {
  const { data, loading, error, refetch } = useApiData('getLayanan')
  
  return { 
    services: data || [], 
    loading, 
    error, 
    refetch 
  }
}
