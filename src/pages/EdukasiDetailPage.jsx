import { useParams } from 'react-router-dom'
import { useClimateArticleDetail } from '@/hooks/useClimateArticles'
import ArticleDetailLayout from '@/components/common/ArticleDetailLayout'
import ClimateCard from '@/components/edukasi/ClimateCard'

export default function EdukasiDetailPage() {
  const { slug } = useParams()
  const { data: article, related, loading, error } = useClimateArticleDetail(slug)

  return (
    <ArticleDetailLayout 
      article={article}
      loading={loading}
      error={error}
      related={related}
      typeLabel="Edukasi"
      typePath="/edukasi"
      RelatedItemComponent={ClimateCard}
    />
  )
}
