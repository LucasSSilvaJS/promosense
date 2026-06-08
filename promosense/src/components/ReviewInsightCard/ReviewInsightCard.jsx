import AspectTagRow from '../AspectTagRow/AspectTagRow'
import SentimentBadge from '../SentimentBadge/SentimentBadge'

function ReviewInsightCard({ review }) {
  const periodLabel = review.periodLabel ?? review.periodId

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <header className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-semibold text-slate-900">{review.author}</h3>
          <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">
            {review.date
              ? `${periodLabel} · ${new Date(review.date).toLocaleDateString('pt-BR')}`
              : periodLabel}
          </p>
        </div>
        <SentimentBadge sentiment={review.sentiment} />
      </header>

      <p className="mb-4 text-sm leading-relaxed text-slate-700">{review.text}</p>

      <section aria-label="Sentimento por aspecto">
        <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
          Análise por aspecto
        </h4>
        <AspectTagRow aspects={review.aspects} />
      </section>
    </article>
  )
}

export default ReviewInsightCard
