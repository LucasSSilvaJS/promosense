import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { mockDashboardAll, mockDashboardDoubleDate } from '../../test/fixtures/api'
import { createPromosenseApiMock } from '../../test/mocks/promosenseApi'
import DashboardPage from './index'

vi.mock('../../api/promosenseApi', () => createPromosenseApiMock())

describe('Dashboard — testes de integração', () => {
  it('IT-01: filtro Double Date atualiza métricas do snapshot', async () => {
    const user = userEvent.setup()
    render(<DashboardPage />)

    await waitFor(() => {
      expect(screen.getByText(String(mockDashboardAll.totalReviews))).toBeInTheDocument()
    })

    await user.click(screen.getByRole('button', { name: 'Double Date (2024–2026)' }))

    await waitFor(() => {
      expect(screen.getByText(String(mockDashboardDoubleDate.totalReviews))).toBeInTheDocument()
    })

    expect(screen.getByText('Sentimento positivo').closest('article')).toHaveTextContent(
      `${mockDashboardDoubleDate.sentimentPercentages.positive}%`,
    )
  })

  it('IT-02: troca de período e volta para todos os períodos', async () => {
    const user = userEvent.setup()
    render(<DashboardPage />)

    await waitFor(() => {
      expect(screen.getByText(String(mockDashboardAll.totalReviews))).toBeInTheDocument()
    })

    await user.click(screen.getByRole('button', { name: 'Double Date (2024–2026)' }))
    await waitFor(() => {
      expect(screen.getByText(String(mockDashboardDoubleDate.totalReviews))).toBeInTheDocument()
    })

    await user.click(screen.getByRole('button', { name: 'Todos os períodos' }))
    await waitFor(() => {
      expect(screen.getByText(String(mockDashboardAll.totalReviews))).toBeInTheDocument()
    })
  })

  it('IT-03: campanha indisponível exibe alerta de atualização futura', async () => {
    const user = userEvent.setup()
    render(<DashboardPage />)

    await waitFor(() => {
      expect(screen.getByText('Total de avaliações')).toBeInTheDocument()
    })

    await user.click(screen.getByRole('button', { name: 'Black Friday' }))

    expect(screen.getByRole('alert')).toHaveTextContent(/atualizações futuras/i)
    expect(screen.getByText(String(mockDashboardAll.totalReviews))).toBeInTheDocument()
  })

  it('IT-04: percentuais somam aproximadamente 100% com todos os períodos', async () => {
    render(<DashboardPage />)

    await waitFor(() => {
      expect(screen.getByText(String(mockDashboardAll.totalReviews))).toBeInTheDocument()
    })

    const { sentimentPercentages: percentages } = mockDashboardAll
    const sum = percentages.positive + percentages.neutral + percentages.negative

    expect(sum).toBeGreaterThanOrEqual(99)
    expect(sum).toBeLessThanOrEqual(101)
  })
})
