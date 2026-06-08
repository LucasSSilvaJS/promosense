import { useCallback, useEffect, useState } from 'react'
import { fetchDashboard } from '../api/promosenseApi'

export function useDashboard(periodId, apiPeriodMode = 'aggregated') {
  const [snapshot, setSnapshot] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const load = useCallback(() => {
    setLoading(true)
    setError(null)

    fetchDashboard(periodId, apiPeriodMode)
      .then((data) => {
        setSnapshot(data)
      })
      .catch((err) => {
        setError(err)
        setSnapshot(null)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [periodId, apiPeriodMode])

  useEffect(() => {
    load()
  }, [load])

  return { snapshot, loading, error, retry: load }
}
