/**
 * Skeleton loading components
 * Used as placeholders while async data loads.
 */

import { motion } from 'framer-motion'

// ── Base pulse animation ──────────────────────────────────────────────────────

function SkeletonBox({ className = '' }) {
  return (
    <div className={`bg-surface-200 rounded-xl animate-pulse ${className}`} />
  )
}

// ── Card skeleton — matches NewsCard / ServiceCard height ─────────────────────

export function SkeletonCard({ lines = 3 }) {
  return (
    <div className="card p-4 space-y-3">
      <div className="flex items-center gap-2">
        <SkeletonBox className="w-16 h-5 rounded-full" />
        <SkeletonBox className="w-20 h-5 rounded-full" />
      </div>
      <SkeletonBox className="w-full h-5" />
      <SkeletonBox className="w-4/5 h-5" />
      {lines > 2 && <SkeletonBox className="w-full h-4" />}
      {lines > 3 && <SkeletonBox className="w-3/4 h-4" />}
      <div className="flex gap-3 pt-1">
        <SkeletonBox className="w-24 h-4 rounded-full" />
        <SkeletonBox className="w-20 h-4 rounded-full" />
      </div>
    </div>
  )
}

// ── Featured card skeleton ────────────────────────────────────────────────────

export function SkeletonFeaturedCard() {
  return (
    <div className="card overflow-hidden">
      <SkeletonBox className="w-full h-44 rounded-none" />
      <div className="p-4 space-y-3">
        <SkeletonBox className="w-20 h-5 rounded-full" />
        <SkeletonBox className="w-full h-6" />
        <SkeletonBox className="w-3/4 h-6" />
        <SkeletonBox className="w-full h-4" />
        <SkeletonBox className="w-5/6 h-4" />
      </div>
    </div>
  )
}

// ── List of n skeleton cards ──────────────────────────────────────────────────

export function SkeletonList({ count = 3, featured = false }) {
  return (
    <div className="space-y-3">
      {featured && <SkeletonFeaturedCard />}
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}

// ── Article detail skeleton ───────────────────────────────────────────────────

export function SkeletonArticle() {
  return (
    <div className="space-y-4">
      <SkeletonBox className="w-full h-52" />
      <div className="px-4 space-y-4">
        <SkeletonBox className="w-24 h-5 rounded-full" />
        <SkeletonBox className="w-full h-8" />
        <SkeletonBox className="w-4/5 h-8" />
        <div className="flex gap-3">
          <SkeletonBox className="w-28 h-4 rounded-full" />
          <SkeletonBox className="w-20 h-4 rounded-full" />
        </div>
        <div className="space-y-2.5 pt-2">
          {[...Array(6)].map((_, i) => (
            <SkeletonBox key={i} className={`h-4 ${i % 4 === 3 ? 'w-2/3' : 'w-full'}`} />
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Announcement skeleton ─────────────────────────────────────────────────────

export function SkeletonAnnouncement() {
  return (
    <div className="card p-4 space-y-2.5">
      <div className="flex items-center gap-2">
        <SkeletonBox className="w-4 h-4 rounded-full" />
        <SkeletonBox className="w-20 h-4 rounded-full" />
      </div>
      <SkeletonBox className="w-full h-5" />
      <SkeletonBox className="w-5/6 h-5" />
      <SkeletonBox className="w-24 h-4 rounded-full" />
    </div>
  )
}
