import { describe, expect, it } from 'vitest'
import { buildPromotionalPeriods } from '../config/promotionalPeriods'
import {
  mapDashboardFromApi,
  mapPeriodsFromApi,
  mapReviewFromApi,
  mapSentimentFromApi,
  mapSentimentToApi,
} from './mappers'

describe('mappers — API PromoSense', () => {
  it('converte sentimentos entre API e front', () => {
    expect(mapSentimentFromApi('positivo')).toBe('positive')
    expect(mapSentimentToApi('negative')).toBe('negativo')
  })

  it('mapeia avaliação da API para o modelo do front', () => {
    const review = mapReviewFromApi({
      id: '0',
      autor: 'Cliente Shopee #7850',
      texto: 'recebi bem antes do prazo estipulado',
      sentimento: 'positivo',
      periodo_promocional: 'double_date',
      periodo_label: 'Double Date (2024–2026)',
      aspectos: [
        { nome: 'preco', sentimento: 'positivo' },
        { nome: 'entrega', sentimento: 'neutro' },
        { nome: 'qualidade', sentimento: 'positivo' },
      ],
    })

    expect(review).toMatchObject({
      id: '0',
      author: 'Cliente Shopee #7850',
      sentiment: 'positive',
      periodId: 'double_date',
      periodLabel: 'Double Date (2024–2026)',
      date: null,
      aspects: {
        price: 'positive',
        delivery: 'neutral',
        quality: 'positive',
      },
    })
  })

  it('mapeia períodos e dashboard da API', () => {
    const apiPeriods = mapPeriodsFromApi({
      items: [
        {
          id: 'double_date',
          label: 'Double Date (2024–2026)',
          ano_inicio: 2024,
          ano_fim: 2026,
        },
      ],
    })

    expect(apiPeriods[0].id).toBe('double_date')
    expect(apiPeriods[0].yearStart).toBe(2024)

    const periods = buildPromotionalPeriods(apiPeriods)
    expect(periods[1].label).toBe('Double Date (2024–2026)')
    expect(periods.some((period) => period.id === 'black-friday' && period.available === false)).toBe(
      true,
    )

    const dashboard = mapDashboardFromApi({
      total_avaliacoes: 10,
      distribuicao_sentimento: [
        { sentimento: 'positivo', total: 6, percentual: 60 },
        { sentimento: 'negativo', total: 3, percentual: 30 },
        { sentimento: 'neutro', total: 1, percentual: 10 },
      ],
      sentimento_por_aspecto: [
        {
          aspecto: 'preco',
          distribuicao: [
            { sentimento: 'positivo', total: 5 },
            { sentimento: 'negativo', total: 3 },
            { sentimento: 'neutro', total: 2 },
          ],
        },
      ],
    })

    expect(dashboard.totalReviews).toBe(10)
    expect(dashboard.sentimentPercentages.positive).toBe(60)
    expect(dashboard.aspectSummary[0].aspect).toBe('price')
  })
})
