import { ASPECTS, SENTIMENTS } from '../constants/sentiment'

export function filterReviewsByPeriod(reviews, periodId) {
  if (!periodId || periodId === 'all') return reviews
  return reviews.filter((review) => review.periodId === periodId)
}

export function filterReviewsBySentiment(reviews, sentimentId) {
  if (!sentimentId || sentimentId === 'all') return reviews
  return reviews.filter((review) => review.sentiment === sentimentId)
}

export function countBySentiment(reviews) {
  return SENTIMENTS.reduce((counts, sentiment) => {
    counts[sentiment] = reviews.filter((review) => review.sentiment === sentiment).length
    return counts
  }, {})
}

export function sentimentPercentages(reviews) {
  const total = reviews.length
  const counts = countBySentiment(reviews)

  if (total === 0) {
    return SENTIMENTS.reduce((percentages, sentiment) => {
      percentages[sentiment] = 0
      return percentages
    }, {})
  }

  return SENTIMENTS.reduce((percentages, sentiment) => {
    percentages[sentiment] = Math.round((counts[sentiment] / total) * 100)
    return percentages
  }, {})
}

export function summarizeAspects(reviews) {
  return ASPECTS.map((aspect) => {
    const counts = countBySentiment(
      reviews.map((review) => ({ sentiment: review.aspects[aspect] })),
    )

    const dominant = SENTIMENTS.reduce((best, sentiment) =>
      counts[sentiment] > counts[best] ? sentiment : best,
    )

    return { aspect, counts, dominant }
  })
}

export function buildDashboardSnapshot(reviews, periodId = 'all') {
  const filtered = filterReviewsByPeriod(reviews, periodId)

  return {
    totalReviews: filtered.length,
    sentimentCounts: countBySentiment(filtered),
    sentimentPercentages: sentimentPercentages(filtered),
    aspectSummary: summarizeAspects(filtered),
  }
}
