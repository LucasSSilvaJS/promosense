import { describe, expect, it } from 'vitest'
import { getApiPeriodMode, resolveApiPeriodId } from './promotionalPeriods'

describe('promotionalPeriods — compatibilidade de API', () => {
  it('detecta API agregada com id double_date', () => {
    expect(getApiPeriodMode([{ id: 'double_date', label: 'Double Date (2024–2026)' }])).toBe(
      'aggregated',
    )
  })

  it('detecta API legada com ids por ano', () => {
    expect(
      getApiPeriodMode([
        { id: 'double_date_2024', label: 'Double Date 2024' },
        { id: 'double_date_2025', label: 'Double Date 2025' },
      ]),
    ).toBe('legacy')
  })

  it('envia double_date apenas na API agregada', () => {
    expect(resolveApiPeriodId('double_date', 'aggregated')).toBe('double_date')
    expect(resolveApiPeriodId('double_date', 'legacy')).toBeUndefined()
    expect(resolveApiPeriodId('all', 'legacy')).toBeUndefined()
  })
})
