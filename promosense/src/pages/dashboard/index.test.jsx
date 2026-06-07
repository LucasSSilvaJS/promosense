import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { reviews } from '../../data/reviews'
import { buildDashboardSnapshot } from '../../utils/analytics'
import DashboardPage from './index'

describe('Dashboard — testes de integração', () => {
  it('IT-01: filtro Black Friday atualiza métricas do snapshot', async () => {
    const user = userEvent.setup()
    render(<DashboardPage />)

    const snapshot = buildDashboardSnapshot(reviews, 'black-friday')

    await user.click(screen.getByRole('button', { name: 'Black Friday' }))

    expect(screen.getByText('Total de avaliações').closest('article')).toHaveTextContent(
      String(snapshot.totalReviews),
    )
    expect(screen.getByText('Sentimento positivo').closest('article')).toHaveTextContent(
      `${snapshot.sentimentPercentages.positive}%`,
    )
  })

  it('IT-02: troca de período e volta para todos os períodos', async () => {
    const user = userEvent.setup()
    render(<DashboardPage />)

    const allSnapshot = buildDashboardSnapshot(reviews, 'all')
    const doubleDatesSnapshot = buildDashboardSnapshot(reviews, 'double-dates')

    await user.click(screen.getByRole('button', { name: 'Double Dates' }))
    expect(screen.getByText(String(doubleDatesSnapshot.totalReviews))).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Todos os períodos' }))
    expect(screen.getByText(String(allSnapshot.totalReviews))).toBeInTheDocument()
  })

  it('IT-03: percentuais somam aproximadamente 100% com todos os períodos', () => {
    render(<DashboardPage />)

    const { sentimentPercentages: percentages } = buildDashboardSnapshot(reviews, 'all')
    const sum =
      percentages.positive + percentages.neutral + percentages.negative

    expect(sum).toBeGreaterThanOrEqual(99)
    expect(sum).toBeLessThanOrEqual(101)
  })
})
