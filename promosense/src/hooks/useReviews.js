import { useCallback, useEffect, useState } from 'react'
import { fetchReviews } from '../api/promosenseApi'

const DEFAULT_PAGE_SIZE = 10

export function useReviews({
  periodId,
  sentimentId,
  page,
  pageSize = DEFAULT_PAGE_SIZE,
  apiPeriodMode = 'aggregated',
}) {
  const [reviews, setReviews] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const load = useCallback(() => {
    setLoading(true)
    setError(null)

    fetchReviews({ periodId, sentimentId, page, pageSize, apiPeriodMode })
      .then((data) => {
        setReviews(data.reviews)
        setTotal(data.total)
      })
      .catch((err) => {
        setError(err)
        setReviews([])
        setTotal(0)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [periodId, sentimentId, page, pageSize, apiPeriodMode])

  useEffect(() => {
    load()
  }, [load])

  return { reviews, total, loading, error, retry: load, pageSize }
}
