import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { reviews } from '../../data/reviews'
import { filterReviewsByPeriod, filterReviewsBySentiment } from '../../utils/analytics'
import ReviewsPage from './index'

describe('Avaliações — testes de integração', () => {
  it('IT-04: filtro Dia do Consumidor atualiza contador e lista', async () => {
    const user = userEvent.setup()
    render(<ReviewsPage />)

    const expected = filterReviewsByPeriod(reviews, 'consumer-day')
    await user.click(screen.getByRole('button', { name: 'Dia do Consumidor' }))

    expect(screen.getByText(String(expected.length))).toBeInTheDocument()
    expected.forEach((review) => {
      expect(screen.getByText(review.author)).toBeInTheDocument()
    })
  })

  it('IT-05: filtro por sentimento negativo exibe só avaliações negativas', async () => {
    const user = userEvent.setup()
    render(<ReviewsPage />)

    await user.click(screen.getByRole('button', { name: 'Negativo' }))

    const badges = screen.getAllByText('Negativo')
    expect(badges.length).toBeGreaterThan(0)

    const expected = filterReviewsBySentiment(reviews, 'negative')
    expect(screen.getByText(String(expected.length))).toBeInTheDocument()
  })

  it('IT-06: período Black Friday + sentimento positivo combina filtros', async () => {
    const user = userEvent.setup()
    render(<ReviewsPage />)

    await user.click(screen.getByRole('button', { name: 'Black Friday' }))
    await user.click(screen.getByRole('button', { name: 'Positivo' }))

    const expected = filterReviewsBySentiment(
      filterReviewsByPeriod(reviews, 'black-friday'),
      'positive',
    )

    expect(screen.getByText(String(expected.length))).toBeInTheDocument()
    expected.forEach((review) => {
      expect(screen.getByText(review.author)).toBeInTheDocument()
    })
  })

  it('IT-07: filtros sem resultado exibem mensagem de vazio', async () => {
    const user = userEvent.setup()
    render(<ReviewsPage />)

    await user.click(screen.getByRole('button', { name: 'Black Friday' }))
    await user.click(screen.getByRole('button', { name: 'Negativo' }))

    expect(
      screen.getByText('Nenhuma avaliação encontrada para os filtros selecionados.'),
    ).toBeInTheDocument()
  })

  it('IT-08: card de João Pedro Silva mostra dados do mock', () => {
    render(<ReviewsPage />)

    const review = reviews.find((r) => r.author === 'João Pedro Silva')
    const joaoCard = screen.getByText('João Pedro Silva').closest('article')

    expect(joaoCard).toHaveTextContent('Double Dates')
    expect(joaoCard).toHaveTextContent(review.text)
    expect(within(joaoCard).getByRole('heading', { level: 3 })).toHaveTextContent(
      'João Pedro Silva',
    )
    expect(within(joaoCard).getByLabelText('Sentimento por aspecto')).toHaveTextContent('Preço')
    expect(within(joaoCard).getByLabelText('Sentimento por aspecto')).toHaveTextContent(
      'Negativo',
    )
  })
})
