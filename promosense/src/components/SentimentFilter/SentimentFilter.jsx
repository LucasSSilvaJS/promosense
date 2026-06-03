import { FaFaceFrown, FaFaceMeh, FaFaceSmile, FaFilter } from 'react-icons/fa6'
import { SENTIMENT_LABELS, SENTIMENTS } from '../../constants/sentiment'

const sentimentOptions = [
  { id: 'all', label: 'Todos os sentimentos', icon: FaFilter },
  ...SENTIMENTS.map((sentiment) => ({
    id: sentiment,
    label: SENTIMENT_LABELS[sentiment],
    icon: { positive: FaFaceSmile, negative: FaFaceFrown, neutral: FaFaceMeh }[sentiment],
  })),
]

const activeButtonStyles = {
  all: 'bg-gray-950 text-white',
  positive: 'bg-emerald-600 text-white',
  negative: 'bg-rose-600 text-white',
  neutral: 'bg-amber-600 text-white',
}

function SentimentFilter({ selectedSentimentId, onChange }) {
  return (
    <section
      aria-label="Filtro por sentimento"
      className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
    >
      <div className="mb-3 flex items-center gap-2 text-slate-700">
        <FaFilter className="shrink-0" aria-hidden="true" />
        <h2 className="text-xs font-semibold uppercase tracking-wide sm:text-sm">
          Sentimento geral
        </h2>
      </div>

      <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [-ms-overflow-style:none] scrollbar-width:none sm:flex-wrap sm:overflow-visible sm:pb-0 [&::-webkit-scrollbar]:hidden">
        {sentimentOptions.map((option) => {
          const isActive = option.id === selectedSentimentId
          const Icon = option.icon

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onChange(option.id)}
              className={[
                'inline-flex shrink-0 snap-start items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-colors',
                'min-h-11 sm:min-h-0',
                isActive
                  ? activeButtonStyles[option.id]
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200',
              ].join(' ')}
            >
              <Icon aria-hidden="true" />
              {option.label}
            </button>
          )
        })}
      </div>
    </section>
  )
}

export default SentimentFilter
