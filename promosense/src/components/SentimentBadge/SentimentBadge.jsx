import { FaFaceFrown, FaFaceMeh, FaFaceSmile } from 'react-icons/fa6'
import { SENTIMENT_LABELS } from '../../constants/sentiment'

const sentimentConfig = {
  positive: {
    icon: FaFaceSmile,
    className: 'bg-emerald-100 text-emerald-800 ring-emerald-200',
  },
  negative: {
    icon: FaFaceFrown,
    className: 'bg-rose-100 text-rose-800 ring-rose-200',
  },
  neutral: {
    icon: FaFaceMeh,
    className: 'bg-amber-100 text-amber-800 ring-amber-200',
  },
}

function SentimentBadge({ sentiment, compact = false }) {
  const config = sentimentConfig[sentiment]
  const Icon = config.icon

  return (
    <span
      className={[
        'inline-flex items-center gap-1.5 rounded-full font-medium ring-1 ring-inset',
        config.className,
        compact ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm',
      ].join(' ')}
    >
      <Icon aria-hidden="true" />
      {SENTIMENT_LABELS[sentiment]}
    </span>
  )
}

export default SentimentBadge
