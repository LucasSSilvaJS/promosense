import { describe, expect, it } from 'vitest'
import { reviews } from '../data/reviews'
import { sampleReviews } from '../test/fixtures/reviews'
import {
  buildDashboardSnapshot,
  countBySentiment,
  filterReviewsByPeriod,
  filterReviewsBySentiment,
  sentimentPercentages,
  summarizeAspects,
} from './analytics'

describe('analytics — testes unitários', () => {
  it('UT-01: filterReviewsByPeriod retorna tudo com "all" e filtra por período', () => {
    expect(filterReviewsByPeriod(reviews, 'all')).toHaveLength(reviews.length)
    expect(filterReviewsByPeriod(reviews, 'black-friday')).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ periodId: 'black-friday' }),
      ]),
    )
    expect(
      filterReviewsByPeriod(reviews, 'black-friday').every((r) => r.periodId === 'black-friday'),
    ).toBe(true)
  })

  it('UT-02: filterReviewsBySentiment retorna tudo com "all" e filtra por sentimento', () => {
    expect(filterReviewsBySentiment(reviews, 'all')).toHaveLength(reviews.length)
    const negative = filterReviewsBySentiment(reviews, 'negative')
    expect(negative.every((r) => r.sentiment === 'negative')).toBe(true)
    expect(negative.length).toBeGreaterThan(0)
  })

  it('UT-03: countBySentiment conta corretamente um conjunto conhecido', () => {
    const subset = [
      { sentiment: 'positive' },
      { sentiment: 'positive' },
      { sentiment: 'negative' },
    ]
    expect(countBySentiment(subset)).toEqual({
      positive: 2,
      negative: 1,
      neutral: 0,
    })
  })

  it('UT-04: sentimentPercentages retorna 0% para lista vazia', () => {
    expect(sentimentPercentages([])).toEqual({
      positive: 0,
      negative: 0,
      neutral: 0,
    })
  })

  it('UT-05: sentimentPercentages calcula 50%, 25% e 25%', () => {
    const subset = [
      { sentiment: 'positive' },
      { sentiment: 'positive' },
      { sentiment: 'neutral' },
      { sentiment: 'negative' },
    ]
    expect(sentimentPercentages(subset)).toEqual({
      positive: 50,
      neutral: 25,
      negative: 25,
    })
  })

  it('UT-06: summarizeAspects identifica preço majoritariamente negativo', () => {
    const summary = summarizeAspects(sampleReviews)
    const price = summary.find((item) => item.aspect === 'price')
    expect(price.dominant).toBe('negative')
  })

  it('UT-07: buildDashboardSnapshot filtra por double-dates', () => {
    const snapshot = buildDashboardSnapshot(reviews, 'double-dates')
    const expectedTotal = reviews.filter((r) => r.periodId === 'double-dates').length
    expect(snapshot.totalReviews).toBe(expectedTotal)
  })
})
