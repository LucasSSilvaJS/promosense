import { useCallback, useState } from 'react'

export function useComingSoonAlert() {
  const [alertPeriod, setAlertPeriod] = useState(null)

  const showComingSoon = useCallback((period) => {
    setAlertPeriod(period)
  }, [])

  const dismiss = useCallback(() => {
    setAlertPeriod(null)
  }, [])

  return { alertPeriod, showComingSoon, dismiss }
}
