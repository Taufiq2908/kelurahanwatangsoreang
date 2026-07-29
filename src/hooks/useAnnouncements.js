/**
 * useAnnouncements — Data hook for pengumuman
 */

import { useState, useEffect, useMemo } from 'react'
import { getAnnouncements, getAnnouncementById } from '@/services/googleSheetApi'

export function useAnnouncements({ limit = null } = {}) {
  const [rawData, setRawData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    getAnnouncements()
      .then((items) => {
        if (!cancelled) {
          setRawData(items)
          setLoading(false)
        }
      })
      .catch((err) => {
        if (!cancelled) {
          console.error('[useAnnouncements]', err)
          setError('Pengumuman belum tersedia. Silakan coba kembali nanti.')
          setLoading(false)
        }
      })

    return () => { cancelled = true }
  }, [])

  const data = useMemo(() => {
    return limit ? rawData.slice(0, limit) : rawData
  }, [rawData, limit])

  const importantCount = 0; // Legacy support for backward compatibility if any components rely on it

  return { data, loading, error, importantCount, total: rawData.length }
}

export function useAnnouncementDetail(id) {
  const [data, setData] = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id) return
    let cancelled = false
    setLoading(true)
    setError(null)
    setData(null)

    getAnnouncements()
      .then((all) => {
        if (!cancelled) {
          const found = all.find((n) => n.id === id)
          if (found) {
            setData(found)
            const rel = all.filter(n => n.id !== found.id).slice(0, 3)
            setRelated(rel)
            setLoading(false)
          } else {
            setError('Pengumuman tidak ditemukan.')
            setLoading(false)
          }
        }
      })
      .catch((err) => {
        if (!cancelled) {
          console.error('[useAnnouncementDetail]', err)
          setError('Gagal memuat pengumuman. Silakan coba kembali nanti.')
          setLoading(false)
        }
      })

    return () => { cancelled = true }
  }, [id])

  return { data, related, loading, error }
}
