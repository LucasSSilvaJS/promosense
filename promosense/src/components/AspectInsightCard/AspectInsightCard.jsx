import { FaBoxOpen, FaTag, FaTruckFast } from 'react-icons/fa6'
import { ASPECT_LABELS } from '../../constants/sentiment'
import SentimentBadge from '../SentimentBadge/SentimentBadge'

const aspectIcons = {
  price: FaTag,
  delivery: FaTruckFast,
  quality: FaBoxOpen,
}

function AspectInsightCard({ aspect, dominantSentiment, counts }) {
  const Icon = aspectIcons[aspect]
  const total = counts.positive + counts.negative + counts.neutral

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-3 flex flex-col gap-2 sm:mb-4 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
        <div className="flex items-center gap-2 text-slate-800">
          <Icon className="shrink-0 text-lg" aria-hidden="true" />
          <h3 className="text-sm font-semibold sm:text-base">{ASPECT_LABELS[aspect]}</h3>
        </div>
        <SentimentBadge sentiment={dominantSentiment} compact />
      </div>

      <dl className="grid grid-cols-3 gap-1.5 text-center sm:gap-2">
        <div className="rounded-lg bg-emerald-50 p-1.5 sm:p-2">
          <dt className="text-[10px] text-emerald-700 sm:text-xs">Positivo</dt>
          <dd className="text-base font-bold text-emerald-900 sm:text-lg">
            {total ? Math.round((counts.positive / total) * 100) : 0}%
          </dd>
        </div>
        <div className="rounded-lg bg-amber-50 p-1.5 sm:p-2">
          <dt className="text-[10px] text-amber-700 sm:text-xs">Neutro</dt>
          <dd className="text-base font-bold text-amber-900 sm:text-lg">
            {total ? Math.round((counts.neutral / total) * 100) : 0}%
          </dd>
        </div>
        <div className="rounded-lg bg-rose-50 p-1.5 sm:p-2">
          <dt className="text-[10px] text-rose-700 sm:text-xs">Negativo</dt>
          <dd className="text-base font-bold text-rose-900 sm:text-lg">
            {total ? Math.round((counts.negative / total) * 100) : 0}%
          </dd>
        </div>
      </dl>
    </article>
  )
}

export default AspectInsightCard
