import { useParams } from 'react-router-dom'
import { useNewsDetail } from '@/hooks/useNews'
import ArticleDetailLayout from '@/components/common/ArticleDetailLayout'
import NewsCard from '@/components/news/NewsCard'

export default function BeritaDetailPage() {
  const { slug } = useParams()
  const { data: article, related, loading, error } = useNewsDetail(slug)

  return (
    <ArticleDetailLayout 
      article={article}
      loading={loading}
      error={error}
      related={related}
      typeLabel="Berita"
      typePath="/berita"
      RelatedItemComponent={NewsCard}
    />
  )
}
