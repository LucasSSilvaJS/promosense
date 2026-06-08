import { resolveApiPeriodId } from '../config/promotionalPeriods'
import { API_BASE_URL } from './config'
import {
  mapDashboardFromApi,
  mapPeriodsFromApi,
  mapReviewFromApi,
  mapSentimentToApi,
} from './mappers'

async function apiFetch(path, params = {}) {
  const url = new URL(`${API_BASE_URL}${path}`)

  for (const [key, value] of Object.entries(params)) {
    if (value != null && value !== '') {
      url.searchParams.set(key, String(value))
    }
  }

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Erro na API (${response.status})`)
  }

  return response.json()
}

export async function fetchHealth() {
  return apiFetch('/api/v1/health')
}

export async function fetchPromotionalPeriods() {
  const data = await apiFetch('/api/v1/avaliacoes/periodos')
  return mapPeriodsFromApi(data)
}

export async function fetchReviews({
  periodId = 'all',
  sentimentId = 'all',
  page = 1,
  pageSize = 10,
  apiPeriodMode = 'aggregated',
} = {}) {
  const params = { page, page_size: pageSize }
  const apiPeriod = resolveApiPeriodId(periodId, apiPeriodMode)

  if (apiPeriod) {
    params.periodo_promocional = apiPeriod
  }

  if (sentimentId && sentimentId !== 'all') {
    params.sentimento = mapSentimentToApi(sentimentId)
  }

  const data = await apiFetch('/api/v1/avaliacoes', params)

  return {
    reviews: data.items.map(mapReviewFromApi),
    total: data.total,
    page: data.page,
    pageSize: data.page_size,
  }
}

export async function fetchDashboard(periodId = 'all', apiPeriodMode = 'aggregated') {
  const params = {}
  const apiPeriod = resolveApiPeriodId(periodId, apiPeriodMode)

  if (apiPeriod) {
    params.periodo_promocional = apiPeriod
  }

  const data = await apiFetch('/api/v1/dashboard', params)
  return mapDashboardFromApi(data)
}
