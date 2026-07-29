/**
 * useClimateArticles — Data hook for edukasi perubahan iklim
 */

import { useState, useEffect, useMemo } from 'react'
import { getClimateArticles, getClimateArticleBySlug } from '@/services/googleSheetApi'

export function useClimateArticles({ category = 'semua', limit = null } = {}) {
  const [rawData, setRawData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    getClimateArticles()
      .then((items) => {
        if (!cancelled) {
          setRawData(items)
          setLoading(false)
        }
      })
      .catch((err) => {
        if (!cancelled) {
          console.error('[useClimateArticles]', err)
          setError('Konten edukasi belum tersedia. Silakan coba kembali nanti.')
          setLoading(false)
        }
      })

    return () => { cancelled = true }
  }, [])

  const data = useMemo(() => {
    let result = rawData
    if (category && category !== 'semua') {
      result = result.filter((a) => a.category === category)
    }
    if (limit) result = result.slice(0, limit)
    return result
  }, [rawData, category, limit])

  const categories = useMemo(() => {
    return ['semua', ...new Set(rawData.map((a) => a.category))]
  }, [rawData])

  return { data, loading, error, categories, total: rawData.length }
}

export function useClimateArticleDetail(slug) {
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

    getClimateArticles()
      .then((all) => {
        if (!cancelled) {
          const found = all.find((n) => n.slug === slug)
          if (found) {
            setData(found)
            const rel = all.filter(n => n.category === found.category && n.id !== found.id).slice(0, 3)
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
          console.error('[useClimateArticleDetail]', err)
          setError('Gagal memuat artikel. Silakan coba kembali nanti.')
          setLoading(false)
        }
      })

    return () => { cancelled = true }
  }, [slug])

  return { data, related, loading, error }
}
