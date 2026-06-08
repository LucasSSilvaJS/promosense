import { buildPromotionalPeriods } from '../../config/promotionalPeriods'

export const mockApiPeriods = [
  {
    id: 'double_date',
    label: 'Double Date (2024–2026)',
    description:
      'Avaliações coletadas na Shopee entre 2024 e 2026 durante campanhas Double Date.',
    yearStart: 2024,
    yearEnd: 2026,
  },
]

export const mockPeriods = buildPromotionalPeriods(mockApiPeriods)

export const mockReviews = [
  {
    id: '0',
    author: 'Cliente Shopee #7850',
    text: 'recebi bem antes do prazo estipulado',
    periodId: 'double_date',
    periodLabel: 'Double Date (2024–2026)',
    sentiment: 'positive',
    aspects: { price: 'positive', delivery: 'neutral', quality: 'positive' },
    date: null,
  },
  {
    id: '1',
    author: 'Cliente Shopee #8411',
    text: 'parabéns lojas lannister adorei comprar pela internet',
    periodId: 'double_date',
    periodLabel: 'Double Date (2024–2026)',
    sentiment: 'positive',
    aspects: { price: 'neutral', delivery: 'neutral', quality: 'positive' },
    date: null,
  },
  {
    id: '5',
    author: 'Cliente Shopee #0693',
    text: 'gostaria de saber o que houve sempre recebi e essa compra agora me decpcionou',
    periodId: 'double_date',
    periodLabel: 'Double Date (2024–2026)',
    sentiment: 'negative',
    aspects: { price: 'negative', delivery: 'negative', quality: 'negative' },
    date: null,
  },
]

export const mockDashboardAll = {
  totalReviews: 3,
  sentimentCounts: { positive: 2, negative: 1, neutral: 0 },
  sentimentPercentages: { positive: 67, negative: 33, neutral: 0 },
  aspectSummary: [
    { aspect: 'price', counts: { positive: 1, negative: 1, neutral: 1 }, dominant: 'positive' },
    { aspect: 'delivery', counts: { positive: 0, negative: 1, neutral: 2 }, dominant: 'neutral' },
    { aspect: 'quality', counts: { positive: 2, negative: 1, neutral: 0 }, dominant: 'positive' },
  ],
}

export const mockDashboardDoubleDate = {
  totalReviews: 3,
  sentimentCounts: { positive: 2, negative: 1, neutral: 0 },
  sentimentPercentages: { positive: 67, negative: 33, neutral: 0 },
  aspectSummary: mockDashboardAll.aspectSummary,
}

export function filterMockReviews({ periodId = 'all', sentimentId = 'all', page = 1, pageSize = 10 }) {
  let filtered = [...mockReviews]

  if (periodId === 'double_date') {
    filtered = filtered.filter((review) => review.periodId === 'double_date')
  }

  if (sentimentId !== 'all') {
    filtered = filtered.filter((review) => review.sentiment === sentimentId)
  }

  const start = (page - 1) * pageSize

  return {
    reviews: filtered.slice(start, start + pageSize),
    total: filtered.length,
    page,
    pageSize,
  }
}
