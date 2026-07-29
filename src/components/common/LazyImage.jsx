/**
 * LazyImage — prevents layout shift with aspect-ratio placeholder,
 * shows skeleton while loading, and gracefully falls back on error.
 */

import { useState } from 'react'
import { ImageOff } from 'lucide-react'

export default function LazyImage({
  src,
  alt = '',
  className = '',
  aspectRatio = '16/9',
  fallbackIcon: FallbackIcon = ImageOff,
  fallbackGradient = 'from-surface-200 to-surface-300',
}) {
  const [status, setStatus] = useState(src ? 'loading' : 'error')

  // No src provided — show gradient placeholder
  if (!src) {
    return (
      <div
        className={`relative overflow-hidden bg-gradient-to-br ${fallbackGradient} flex items-center justify-center ${className}`}
        style={{ aspectRatio }}
        aria-hidden="true"
      >
        <FallbackIcon className="w-8 h-8 text-surface-400/50" />
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ aspectRatio }}>
      {/* Skeleton while loading */}
      {status === 'loading' && (
        <div className="absolute inset-0 bg-surface-200 animate-pulse" />
      )}

      {/* Error fallback */}
      {status === 'error' && (
        <div className={`absolute inset-0 bg-gradient-to-br ${fallbackGradient} flex items-center justify-center`}>
          <FallbackIcon className="w-8 h-8 text-surface-400/50" aria-hidden="true" />
        </div>
      )}

      {/* Actual image */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setStatus('loaded')}
        onError={() => setStatus('error')}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          status === 'loaded' ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  )
}
