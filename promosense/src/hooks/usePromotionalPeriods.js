import { useEffect, useState } from 'react'
import { fetchPromotionalPeriods } from '../api/promosenseApi'
import { buildPromotionalPeriods, getApiPeriodMode } from '../config/promotionalPeriods'
import { promotionalPeriods as fallbackPeriods } from '../data/promotionalPeriods'

export function usePromotionalPeriods() {
  const [periods, setPeriods] = useState(fallbackPeriods)
  const [apiPeriodMode, setApiPeriodMode] = useState('aggregated')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    fetchPromotionalPeriods()
      .then((apiPeriods) => {
        if (!cancelled) {
          setPeriods(buildPromotionalPeriods(apiPeriods))
          setApiPeriodMode(getApiPeriodMode(apiPeriods))
          setError(null)
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err)
          setPeriods(fallbackPeriods)
          setApiPeriodMode('aggregated')
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [])

  return { periods, apiPeriodMode, loading, error }
}
