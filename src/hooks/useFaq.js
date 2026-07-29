import { useApiData } from './useApiData'

export function useFaq() {
  const { data, loading, error, refetch } = useApiData('getFaq')
  
  return { 
    faqs: data || [], 
    loading, 
    error, 
    refetch 
  }
}
