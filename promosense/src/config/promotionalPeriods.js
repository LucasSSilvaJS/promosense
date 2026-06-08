export const COMING_SOON_PERIODS = [
  { id: 'black-friday', label: 'Black Friday' },
  { id: 'consumer-day', label: 'Dia do Consumidor' },
  { id: 'anniversary-sale', label: 'Aniversário da Loja' },
]

export const AVAILABLE_PERIOD_IDS = new Set(['all', 'double_date'])

export function isPeriodAvailable(periodId) {
  return AVAILABLE_PERIOD_IDS.has(periodId)
}

/** `aggregated` = API com id `double_date`; `legacy` = ids `double_date_2024`, etc. */
export function getApiPeriodMode(apiPeriods = []) {
  if (apiPeriods.some((period) => period.id === 'double_date')) {
    return 'aggregated'
  }

  if (apiPeriods.some((period) => period.id.startsWith('double_date'))) {
    return 'legacy'
  }

  return 'aggregated'
}

export function resolveApiPeriodId(periodId, apiPeriodMode = 'aggregated') {
  if (!periodId || periodId === 'all') {
    return undefined
  }

  if (periodId !== 'double_date') {
    return undefined
  }

  // API legada: todo o dataset já é Double Date — filtro agregado = sem parâmetro
  if (apiPeriodMode === 'legacy') {
    return undefined
  }

  return 'double_date'
}

export function buildPromotionalPeriods(apiPeriods = []) {
  const doubleDateFromApi = apiPeriods.find((period) => period.id === 'double_date')

  return [
    { id: 'all', label: 'Todos os períodos', available: true },
    {
      id: 'double_date',
      label: doubleDateFromApi?.label ?? 'Double Date (2024–2026)',
      description: doubleDateFromApi?.description,
      available: true,
    },
    ...COMING_SOON_PERIODS.map((period) => ({ ...period, available: false })),
  ]
}
