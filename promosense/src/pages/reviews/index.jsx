import { useEffect, useState } from 'react'
import ApiStatusMessage from '../../components/ApiStatusMessage/ApiStatusMessage'
import ComingSoonAlert from '../../components/ComingSoonAlert/ComingSoonAlert'
import PageShell from '../../components/PageShell/PageShell'
import PromoPeriodFilter from '../../components/PromoPeriodFilter/PromoPeriodFilter'
import ReviewInsightCard from '../../components/ReviewInsightCard/ReviewInsightCard'
import ReviewsPagination from '../../components/ReviewsPagination/ReviewsPagination'
import SentimentFilter from '../../components/SentimentFilter/SentimentFilter'
import { useComingSoonAlert } from '../../hooks/useComingSoonAlert'
import { usePromotionalPeriods } from '../../hooks/usePromotionalPeriods'
import { useReviews } from '../../hooks/useReviews'

function ReviewsPage() {
  const [selectedPeriodId, setSelectedPeriodId] = useState('all')
  const [selectedSentimentId, setSelectedSentimentId] = useState('all')
  const [page, setPage] = useState(1)
  const { periods, apiPeriodMode } = usePromotionalPeriods()
  const { alertPeriod, showComingSoon, dismiss } = useComingSoonAlert()
  const { reviews, total, loading, error, retry, pageSize } = useReviews({
    periodId: selectedPeriodId,
    sentimentId: selectedSentimentId,
    page,
    apiPeriodMode,
  })

  useEffect(() => {
    setPage(1)
  }, [selectedPeriodId, selectedSentimentId])

  return (
    <PageShell
      title="Avaliações analisadas"
      subtitle="Classificação de sentimento geral e por aspectos, com filtros por campanha promocional e sentimento."
    >
      <div className="space-y-3 sm:space-y-4">
        <PromoPeriodFilter
          periods={periods}
          selectedPeriodId={selectedPeriodId}
          onChange={setSelectedPeriodId}
          onComingSoon={showComingSoon}
        />

        <ComingSoonAlert periodLabel={alertPeriod?.label} onDismiss={dismiss} />

        <SentimentFilter
          selectedSentimentId={selectedSentimentId}
          onChange={setSelectedSentimentId}
        />
      </div>

      <p className="mt-3 text-sm text-slate-600 sm:mt-4">
        Exibindo <strong>{reviews.length}</strong> de <strong>{total}</strong> avaliação(ões) para
        os filtros selecionados.
      </p>

      <ApiStatusMessage loading={loading} error={error} onRetry={retry} />

      {!loading && !error ? (
        <section className="mt-4 space-y-3 sm:mt-6 sm:space-y-4">
          {reviews.length > 0 ? (
            reviews.map((review) => <ReviewInsightCard key={review.id} review={review} />)
          ) : (
            <p className="rounded-xl border border-dashed border-slate-300 bg-white p-6 text-center text-sm text-slate-500 sm:p-8 sm:text-base">
              Nenhuma avaliação encontrada para os filtros selecionados.
            </p>
          )}
        </section>
      ) : null}

      {!loading && !error ? (
        <ReviewsPagination
          page={page}
          pageSize={pageSize}
          total={total}
          onPageChange={setPage}
        />
      ) : null}
    </PageShell>
  )
}

export default ReviewsPage
