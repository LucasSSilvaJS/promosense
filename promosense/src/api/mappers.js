const SENTIMENT_FROM_API = {
  positivo: 'positive',
  negativo: 'negative',
  neutro: 'neutral',
}

const SENTIMENT_TO_API = {
  positive: 'positivo',
  negative: 'negativo',
  neutral: 'neutro',
}

const ASPECT_FROM_API = {
  preco: 'price',
  entrega: 'delivery',
  qualidade: 'quality',
}

export function mapSentimentFromApi(sentiment) {
  return SENTIMENT_FROM_API[sentiment] ?? sentiment
}

export function mapSentimentToApi(sentiment) {
  return SENTIMENT_TO_API[sentiment] ?? sentiment
}

export function mapReviewFromApi(item) {
  const aspects = {}

  for (const aspect of item.aspectos ?? []) {
    const key = ASPECT_FROM_API[aspect.nome] ?? aspect.nome
    aspects[key] = mapSentimentFromApi(aspect.sentimento)
  }

  return {
    id: item.id,
    author: item.autor,
    text: item.texto,
    periodId: item.periodo_promocional,
    periodLabel: item.periodo_label,
    sentiment: mapSentimentFromApi(item.sentimento),
    aspects,
    date: item.data_avaliacao ?? null,
    platform: item.plataforma,
  }
}

export function mapPeriodsFromApi(data) {
  const items = data.items ?? data

  return items.map((period) => ({
    id: period.id,
    label: period.label,
    description: period.descricao,
    yearStart: period.ano_inicio ?? period.ano,
    yearEnd: period.ano_fim ?? period.ano,
  }))
}

export function mapDashboardFromApi(data) {
  const sentimentCounts = { positive: 0, negative: 0, neutral: 0 }
  const sentimentPercentages = { positive: 0, negative: 0, neutral: 0 }

  for (const item of data.distribuicao_sentimento ?? []) {
    const key = mapSentimentFromApi(item.sentimento)
    sentimentCounts[key] = item.total
    sentimentPercentages[key] = Math.round(item.percentual)
  }

  const aspectSummary = (data.sentimento_por_aspecto ?? []).map((aspect) => {
    const counts = { positive: 0, negative: 0, neutral: 0 }

    for (const distribution of aspect.distribuicao ?? []) {
      const key = mapSentimentFromApi(distribution.sentimento)
      counts[key] = distribution.total
    }

    const dominant = ['positive', 'negative', 'neutral'].reduce((best, sentiment) =>
      counts[sentiment] > counts[best] ? sentiment : best,
    )

    return {
      aspect: ASPECT_FROM_API[aspect.aspecto] ?? aspect.aspecto,
      counts,
      dominant,
    }
  })

  return {
    totalReviews: data.total_avaliacoes,
    periodLabel: data.periodo_label,
    sentimentCounts,
    sentimentPercentages,
    aspectSummary,
  }
}
