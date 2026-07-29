/**
 * SEO.jsx — Per-page title, description, and Open Graph tag setter.
 * Works by directly mutating document.head meta tags via useEffect.
 * No external library dependency.
 */

import { useEffect } from 'react'

const SITE_NAME = 'Kelurahan Watang Soreang'
const SITE_URL = 'https://watangsoreang.parepare.go.id'

const DEFAULT_META = {
  title: SITE_NAME,
  description:
    'Portal Digital resmi Kelurahan Watang Soreang, Kecamatan Soreang, Kota Parepare, Sulawesi Selatan. Layanan publik, berita, pengumuman, aspirasi, dan edukasi lingkungan.',
}

function setMetaTag(attr, key, value) {
  let el = document.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', value)
}

/**
 * @param {Object} props
 * @param {string} [props.title]          Page title (without site name)
 * @param {string} [props.description]    Page meta description
 * @param {string} [props.path]           Canonical path e.g. "/berita"
 * @param {string} [props.type]           OG type ("website" | "article")
 */
export default function SEO({
  title,
  description = DEFAULT_META.description,
  path = '',
  type = 'website',
}) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_META.title
  const canonical = `${SITE_URL}${path}`

  useEffect(() => {
    // Document title
    document.title = fullTitle

    // Standard meta
    setMetaTag('name', 'description', description)

    // Open Graph
    setMetaTag('property', 'og:title', fullTitle)
    setMetaTag('property', 'og:description', description)
    setMetaTag('property', 'og:url', canonical)
    setMetaTag('property', 'og:type', type)
    setMetaTag('property', 'og:site_name', SITE_NAME)
    setMetaTag('property', 'og:locale', 'id_ID')

    // Twitter Card
    setMetaTag('name', 'twitter:card', 'summary')
    setMetaTag('name', 'twitter:title', fullTitle)
    setMetaTag('name', 'twitter:description', description)

    // Canonical link
    let link = document.querySelector('link[rel="canonical"]')
    if (!link) {
      link = document.createElement('link')
      link.rel = 'canonical'
      document.head.appendChild(link)
    }
    link.href = canonical
  }, [fullTitle, description, canonical, type])

  return null
}
