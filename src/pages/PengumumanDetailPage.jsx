import { useParams } from 'react-router-dom'
import { useAnnouncementDetail } from '@/hooks/useAnnouncements'
import ArticleDetailLayout from '@/components/common/ArticleDetailLayout'
import AnnouncementCard from '@/components/pengumuman/AnnouncementCard'

export default function PengumumanDetailPage() {
  const { id } = useParams()
  const { data: item, related, loading, error } = useAnnouncementDetail(id)

  // Map item to article format
  const article = item ? {
    id: item.id,
    title: item.title,
    date: item.date,
    category: item.category,
    content: item.content || item.description,
    attachments: item.attachments,
    image: null, // Pengumuman doesn't have a hero image
  } : null

  return (
    <ArticleDetailLayout 
      article={article}
      loading={loading}
      error={error}
      related={related}
      typeLabel="Pengumuman"
      typePath="/pengumuman"
      RelatedItemComponent={AnnouncementCard}
    />
  )
}
