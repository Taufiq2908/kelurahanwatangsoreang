import { useApiData } from './useApiData'

export function useContacts() {
  const { data, loading, error, refetch } = useApiData('getKontak')
  
  // Sort by sort_order if applicable
  const contacts = (data || []).sort((a, b) => (Number(a.sort_order) || 0) - (Number(b.sort_order) || 0))

  return { contacts, loading, error, refetch }
}
