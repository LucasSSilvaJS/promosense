import { FaBoxOpen, FaTag, FaTruckFast } from 'react-icons/fa6'
import { ASPECT_LABELS } from '../../constants/sentiment'
import SentimentBadge from '../SentimentBadge/SentimentBadge'

const aspectIcons = {
  price: FaTag,
  delivery: FaTruckFast,
  quality: FaBoxOpen,
}

function AspectTagRow({ aspects }) {
  return (
    <ul className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
      {Object.entries(aspects).map(([aspect, sentiment]) => {
        const Icon = aspectIcons[aspect]

        return (
          <li
            key={aspect}
            className="flex w-full items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 sm:w-auto sm:py-2"
          >
            <Icon className="shrink-0 text-slate-600" aria-hidden="true" />
            <span className="text-xs font-medium text-slate-700 sm:text-sm">
              {ASPECT_LABELS[aspect]}
            </span>
            <SentimentBadge sentiment={sentiment} compact />
          </li>
        )
      })}
    </ul>
  )
}

export default AspectTagRow
