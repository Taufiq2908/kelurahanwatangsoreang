import { Helmet } from 'react-helmet-async'

const SITE_NAME = 'Kelurahan Watang Soreang'
const SITE_URL = 'https://kelurahanwatangsoreang.web.id'
const DEFAULT_META = {
  title: 'Website Resmi Pemerintah Kota Parepare',
  description:
    'Website resmi Kelurahan Watang Soreang yang menyediakan informasi kelurahan, pelayanan publik, berita, kegiatan masyarakat, data wilayah, UMKM, dan informasi terkait perubahan iklim di Kota Parepare.',
}

export default function SEO({
  title,
  description = DEFAULT_META.description,
  path = '',
  type = 'website',
  schema = null,
  image = '/og-image.png'
}) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | ${DEFAULT_META.title}`
  const canonical = `${SITE_URL}${path}`
  const fullImage = image.startsWith('http') ? image : `${SITE_URL}${image}`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="id_ID" />
      <meta property="og:image" content={fullImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />

      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  )
}
