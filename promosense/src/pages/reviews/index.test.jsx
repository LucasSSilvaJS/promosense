import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { filterMockReviews, mockReviews } from '../../test/fixtures/api'
import { createPromosenseApiMock } from '../../test/mocks/promosenseApi'
import ReviewsPage from './index'

vi.mock('../../api/promosenseApi', () => createPromosenseApiMock())

describe('Avaliações — testes de integração', () => {
  it('IT-04: filtro Double Date atualiza contador e lista', async () => {
    const user = userEvent.setup()
    render(<ReviewsPage />)

    const expected = filterMockReviews({ periodId: 'double_date' })

    await waitFor(() => {
      expect(screen.getByText(/Exibindo/)).toHaveTextContent('Exibindo 3 de 3')
    })

    await user.click(screen.getByRole('button', { name: 'Double Date (2024–2026)' }))

    await waitFor(() => {
      expect(screen.getByText(/Exibindo/)).toHaveTextContent(
        `Exibindo ${expected.reviews.length} de ${expected.total}`,
      )
    })

    expected.reviews.forEach((review) => {
      expect(screen.getByText(review.author)).toBeInTheDocument()
    })
  })

  it('IT-05: filtro por sentimento negativo exibe só avaliações negativas', async () => {
    const user = userEvent.setup()
    render(<ReviewsPage />)

    await waitFor(() => {
      expect(screen.getByText(mockReviews[0].author)).toBeInTheDocument()
    })

    await user.click(screen.getByRole('button', { name: 'Negativo' }))

    const expected = filterMockReviews({ sentimentId: 'negative' })

    await waitFor(() => {
      expect(screen.getByText(/Exibindo/)).toHaveTextContent(
        `Exibindo ${expected.reviews.length} de ${expected.total}`,
      )
    })
  })

  it('IT-06: Double Date + sentimento positivo combina filtros', async () => {
    const user = userEvent.setup()
    render(<ReviewsPage />)

    await waitFor(() => {
      expect(screen.getByText(mockReviews[0].author)).toBeInTheDocument()
    })

    await user.click(screen.getByRole('button', { name: 'Double Date (2024–2026)' }))
    await user.click(screen.getByRole('button', { name: 'Positivo' }))

    const expected = filterMockReviews({
      periodId: 'double_date',
      sentimentId: 'positive',
    })

    await waitFor(() => {
      expect(screen.getByText(/Exibindo/)).toHaveTextContent(
        `Exibindo ${expected.reviews.length} de ${expected.total}`,
      )
    })

    expected.reviews.forEach((review) => {
      expect(screen.getByText(review.author)).toBeInTheDocument()
    })
  })

  it('IT-07: campanha indisponível exibe alerta sem alterar a listagem', async () => {
    const user = userEvent.setup()
    render(<ReviewsPage />)

    await waitFor(() => {
      expect(screen.getByText(mockReviews[0].author)).toBeInTheDocument()
    })

    await user.click(screen.getByRole('button', { name: 'Dia do Consumidor' }))

    expect(screen.getByRole('alert')).toHaveTextContent(/atualizações futuras/i)
    expect(screen.getByText(mockReviews[0].author)).toBeInTheDocument()
  })

  it('IT-08: card de Cliente Shopee #8411 mostra dados do mock', async () => {
    render(<ReviewsPage />)

    const review = mockReviews.find((item) => item.author === 'Cliente Shopee #8411')

    await waitFor(() => {
      expect(screen.getByText(review.author)).toBeInTheDocument()
    })

    const reviewCard = screen.getByText(review.author).closest('article')

    expect(reviewCard).toHaveTextContent('Double Date (2024–2026)')
    expect(reviewCard).toHaveTextContent(review.text)
    expect(within(reviewCard).getByRole('heading', { level: 3 })).toHaveTextContent(
      'Cliente Shopee #8411',
    )
    expect(within(reviewCard).getByLabelText('Sentimento por aspecto')).toHaveTextContent('Preço')
    expect(within(reviewCard).getByLabelText('Sentimento por aspecto')).toHaveTextContent(
      'Neutro',
    )
  })
})
