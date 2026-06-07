/** Conjunto mínimo para testes unitários (UT-03 a UT-06). */
export const sampleReviews = [
  {
    id: 'sample-1',
    sentiment: 'positive',
    periodId: 'black-friday',
    aspects: { price: 'positive', delivery: 'positive', quality: 'positive' },
  },
  {
    id: 'sample-2',
    sentiment: 'positive',
    periodId: 'black-friday',
    aspects: { price: 'negative', delivery: 'neutral', quality: 'neutral' },
  },
  {
    id: 'sample-3',
    sentiment: 'negative',
    periodId: 'double-dates',
    aspects: { price: 'negative', delivery: 'negative', quality: 'neutral' },
  },
]
