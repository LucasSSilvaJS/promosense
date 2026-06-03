import { useMemo, useState } from 'react'
import PageShell from '../../components/PageShell/PageShell'
import PromoPeriodFilter from '../../components/PromoPeriodFilter/PromoPeriodFilter'
import ReviewInsightCard from '../../components/ReviewInsightCard/ReviewInsightCard'
import SentimentFilter from '../../components/SentimentFilter/SentimentFilter'
import { promotionalPeriods } from '../../data/promotionalPeriods'
import { reviews } from '../../data/reviews'
import { filterReviewsByPeriod, filterReviewsBySentiment } from '../../utils/analytics'

function ReviewsPage() {
  const [selectedPeriodId, setSelectedPeriodId] = useState('all')
  const [selectedSentimentId, setSelectedSentimentId] = useState('all')

  const filteredReviews = useMemo(() => {
    const byPeriod = filterReviewsByPeriod(reviews, selectedPeriodId)
    return filterReviewsBySentiment(byPeriod, selectedSentimentId)
  }, [selectedPeriodId, selectedSentimentId])

  return (
    <PageShell
      title="Avaliações analisadas"
      subtitle="Classificação de sentimento geral e por aspectos, com filtros por campanha promocional e sentimento."
    >
      <div className="space-y-3 sm:space-y-4">
        <PromoPeriodFilter
          periods={promotionalPeriods}
          selectedPeriodId={selectedPeriodId}
          onChange={setSelectedPeriodId}
        />

        <SentimentFilter
          selectedSentimentId={selectedSentimentId}
          onChange={setSelectedSentimentId}
        />
      </div>

      <p className="mt-3 text-sm text-slate-600 sm:mt-4">
        Exibindo <strong>{filteredReviews.length}</strong> avaliação(ões) para os filtros
        selecionados.
      </p>

      <section className="mt-4 space-y-3 sm:mt-6 sm:space-y-4">
        {filteredReviews.length > 0 ? (
          filteredReviews.map((review) => (
            <ReviewInsightCard key={review.id} review={review} />
          ))
        ) : (
          <p className="rounded-xl border border-dashed border-slate-300 bg-white p-6 text-center text-sm text-slate-500 sm:p-8 sm:text-base">
            Nenhuma avaliação encontrada para os filtros selecionados.
          </p>
        )}
      </section>
    </PageShell>
  )
}

export default ReviewsPage
