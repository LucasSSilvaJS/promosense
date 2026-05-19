import { FaChartPie } from 'react-icons/fa6'
import { SENTIMENT_LABELS, SENTIMENTS } from '../../constants/sentiment'

const barColors = {
  positive: 'bg-emerald-500',
  negative: 'bg-rose-500',
  neutral: 'bg-amber-500',
}

function SentimentDistribution({ percentages, counts }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <header className="mb-4 flex items-center gap-2 text-slate-800">
        <FaChartPie className="shrink-0" aria-hidden="true" />
        <h2 className="text-sm font-semibold sm:text-base">Distribuição de sentimento</h2>
      </header>

      <div className="space-y-4">
        {SENTIMENTS.map((sentiment) => (
          <div key={sentiment}>
            <div className="mb-1 flex flex-col gap-0.5 text-xs sm:flex-row sm:items-center sm:justify-between sm:text-sm">
              <span className="font-medium text-slate-700">{SENTIMENT_LABELS[sentiment]}</span>
              <span className="text-slate-500">
                {counts[sentiment]} avaliações · {percentages[sentiment]}%
              </span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-slate-100 sm:h-3">
              <div
                className={['h-full rounded-full transition-all', barColors[sentiment]].join(' ')}
                style={{ width: `${percentages[sentiment]}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default SentimentDistribution
