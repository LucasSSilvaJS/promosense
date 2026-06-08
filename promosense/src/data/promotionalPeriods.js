import { buildPromotionalPeriods } from '../config/promotionalPeriods'

/** Lista padrão para testes e fallback offline */
export const promotionalPeriods = buildPromotionalPeriods([
  {
    id: 'double_date',
    label: 'Double Date (2024–2026)',
    description:
      'Avaliações coletadas na Shopee entre 2024 e 2026 durante campanhas Double Date.',
  },
])
