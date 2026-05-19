import { FaChartLine, FaFilter, FaLayerGroup, FaTags } from 'react-icons/fa6'

export const featureHighlights = [
  {
    id: 'sentiment',
    title: 'Classificação de sentimento',
    description:
      'Classifica avaliações em positivo, negativo ou neutro com apoio de modelos de IA.',
    to: '/avaliacoes',
    icon: FaLayerGroup,
  },
  {
    id: 'filter',
    title: 'Filtro por período promocional',
    description:
      'Segmenta comentários por campanhas como Black Friday, Double Dates e Dia do Consumidor.',
    to: '/avaliacoes',
    icon: FaFilter,
  },
  {
    id: 'dashboard',
    title: 'Dashboard analítico',
    description:
      'Consolida indicadores e distribuição de sentimentos para apoiar a pesquisa.',
    to: '/dashboard',
    icon: FaChartLine,
  },
  {
    id: 'aspects',
    title: 'Análise por aspectos',
    description:
      'Avalia preço, entrega e qualidade além do sentimento geral de cada comentário.',
    to: '/dashboard',
    icon: FaTags,
  },
]
