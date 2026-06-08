import { useState } from 'react'
import ApiStatusMessage from '../../components/ApiStatusMessage/ApiStatusMessage'
import AspectInsightCard from '../../components/AspectInsightCard/AspectInsightCard'
import ComingSoonAlert from '../../components/ComingSoonAlert/ComingSoonAlert'
import MetricHighlight from '../../components/MetricHighlight/MetricHighlight'
import PageShell from '../../components/PageShell/PageShell'
import PromoPeriodFilter from '../../components/PromoPeriodFilter/PromoPeriodFilter'
import SentimentDistribution from '../../components/SentimentDistribution/SentimentDistribution'
import { useComingSoonAlert } from '../../hooks/useComingSoonAlert'
import { useDashboard } from '../../hooks/useDashboard'
import { usePromotionalPeriods } from '../../hooks/usePromotionalPeriods'

function DashboardPage() {
  const [selectedPeriodId, setSelectedPeriodId] = useState('all')
  const { periods, apiPeriodMode } = usePromotionalPeriods()
  const { alertPeriod, showComingSoon, dismiss } = useComingSoonAlert()
  const { snapshot, loading, error, retry } = useDashboard(selectedPeriodId, apiPeriodMode)

  return (
    <PageShell
      title="Dashboard de Sentimento"
      subtitle="Relatório consolidado da análise de avaliações por período promocional."
    >
      <div className="space-y-3 sm:space-y-4">
        <PromoPeriodFilter
          periods={periods}
          selectedPeriodId={selectedPeriodId}
          onChange={setSelectedPeriodId}
          onComingSoon={showComingSoon}
        />

        <ComingSoonAlert periodLabel={alertPeriod?.label} onDismiss={dismiss} />
      </div>

      <ApiStatusMessage loading={loading} error={error} onRetry={retry} />

      {snapshot ? (
        <>
          <section className="mt-4 grid grid-cols-1 gap-3 sm:mt-6 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
            <MetricHighlight label="Total de avaliações" value={snapshot.totalReviews} />
            <MetricHighlight
              label="Sentimento positivo"
              value={`${snapshot.sentimentPercentages.positive}%`}
              tone="positive"
            />
            <MetricHighlight
              label="Sentimento neutro"
              value={`${snapshot.sentimentPercentages.neutral}%`}
              tone="neutral"
            />
            <MetricHighlight
              label="Sentimento negativo"
              value={`${snapshot.sentimentPercentages.negative}%`}
              tone="negative"
            />
          </section>

          <section className="mt-4 grid grid-cols-1 gap-4 sm:mt-6 sm:gap-6 lg:grid-cols-2">
            <SentimentDistribution
              percentages={snapshot.sentimentPercentages}
              counts={snapshot.sentimentCounts}
            />

            <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
              <h2 className="mb-4 text-sm font-semibold leading-snug text-slate-800 sm:text-base">
                Sentimento por aspecto — preço, entrega e qualidade
              </h2>
              <div className="grid grid-cols-1 gap-3 sm:gap-4">
                {snapshot.aspectSummary.map((item) => (
                  <AspectInsightCard
                    key={item.aspect}
                    aspect={item.aspect}
                    dominantSentiment={item.dominant}
                    counts={item.counts}
                  />
                ))}
              </div>
            </section>
          </section>
        </>
      ) : null}
    </PageShell>
  )
}

export default DashboardPage
