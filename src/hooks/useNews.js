import { useState, useEffect, useMemo } from 'react'
import { getNews } from '@/services/googleSheetApi'

export function useNews({ category = 'semua', search = '', limit = null } = {}) {
  const [rawData, setRawData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    getNews()
      .then((news) => {
        if (!cancelled) {
          setRawData(news)
          setLoading(false)
        }
      })
      .catch((err) => {
        if (!cancelled) {
          console.error('[useNews]', err)
          setError('Informasi belum tersedia. Silakan coba kembali nanti.')
          setLoading(false)
        }
      })

    return () => { cancelled = true }
  }, []) // fetch once, then filter client-side

  // Client-side filtering — no extra fetches
  const data = useMemo(() => {
    let result = rawData

    if (category && category !== 'semua') {
      result = result.filter((n) => n.category === category)
    }

    if (search) {
      const q = search.toLowerCase()
      result = result.filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          n.description?.toLowerCase().includes(q) ||
          n.category.toLowerCase().includes(q)
      )
    }

    if (limit) result = result.slice(0, limit)

    return result
  }, [rawData, category, search, limit])

  const categories = useMemo(() => {
    const cats = ['semua', ...new Set(rawData.map((n) => n.category))]
    return cats
  }, [rawData])

  return { data, loading, error, total: rawData.length, categories }
}

export function useNewsDetail(slug) {
  const [data, setData] = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!slug) return
    let cancelled = false
    setLoading(true)
    setError(null)
    setData(null)

    // Pull from the cached list — no second API call needed
    getNews()
      .then((all) => {
        if (!cancelled) {
          const found = all.find((n) => n.slug === slug)
          if (found) {
            setData(found)
            const rel = all.filter(n => n.category === found.category && n.id !== found.id).slice(0, 3)
            // fallback if not enough related in same category
            if (rel.length < 3) {
               const others = all.filter(n => n.id !== found.id && !rel.some(r => r.id === n.id)).slice(0, 3 - rel.length)
               rel.push(...others)
            }
            setRelated(rel)
            setLoading(false)
          } else {
            setError('Artikel tidak ditemukan.')
            setLoading(false)
          }
        }
      })
      .catch((err) => {
        if (!cancelled) {
          console.error('[useNewsDetail]', err)
          setError('Gagal memuat artikel. Silakan coba kembali nanti.')
          setLoading(false)
        }
      })

    return () => { cancelled = true }
  }, [slug])

  return { data, related, loading, error }
}
