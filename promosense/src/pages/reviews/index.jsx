import { useMemo, useState } from 'react'
import PageShell from '../../components/PageShell/PageShell'
import PromoPeriodFilter from '../../components/PromoPeriodFilter/PromoPeriodFilter'
import ReviewInsightCard from '../../components/ReviewInsightCard/ReviewInsightCard'
import { promotionalPeriods } from '../../data/promotionalPeriods'
import { reviews } from '../../data/reviews'
import { filterReviewsByPeriod } from '../../utils/analytics'

function ReviewsPage() {
  const [selectedPeriodId, setSelectedPeriodId] = useState('all')

  const filteredReviews = useMemo(
    () => filterReviewsByPeriod(reviews, selectedPeriodId),
    [selectedPeriodId],
  )

  return (
    <PageShell
      title="Avaliações analisadas"
      subtitle="Classificação de sentimento geral e por aspectos, com filtro por campanha promocional."
    >
      <PromoPeriodFilter
        periods={promotionalPeriods}
        selectedPeriodId={selectedPeriodId}
        onChange={setSelectedPeriodId}
      />

      <p className="mt-3 text-sm text-slate-600 sm:mt-4">
        Exibindo <strong>{filteredReviews.length}</strong> avaliação(ões) para o período
        selecionado.
      </p>

      <section className="mt-4 space-y-3 sm:mt-6 sm:space-y-4">
        {filteredReviews.length > 0 ? (
          filteredReviews.map((review) => (
            <ReviewInsightCard key={review.id} review={review} />
          ))
        ) : (
          <p className="rounded-xl border border-dashed border-slate-300 bg-white p-6 text-center text-sm text-slate-500 sm:p-8 sm:text-base">
            Nenhuma avaliação encontrada para este período promocional.
          </p>
        )}
      </section>
    </PageShell>
  )
}

export default ReviewsPage
