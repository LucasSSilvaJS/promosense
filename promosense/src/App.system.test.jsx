import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { createPromosenseApiMock } from './test/mocks/promosenseApi'
import App from './App'

vi.mock('./api/promosenseApi', () => createPromosenseApiMock())

function renderAppAt(path) {
  window.history.pushState({}, '', path)
  return render(<App />)
}

describe('PromoSense — testes de sistema', () => {
  it('ST-01: fluxo Início → Dashboard → Avaliações com filtros', async () => {
    const user = userEvent.setup()
    renderAppAt('/')

    expect(screen.getByRole('heading', { name: 'PromoSense' })).toBeInTheDocument()
    expect(screen.getByText(/percepção do consumidor/i)).toBeInTheDocument()

    await user.click(screen.getByRole('link', { name: 'Dashboard' }))
    expect(screen.getByRole('heading', { name: 'Dashboard de Sentimento' })).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByText('Total de avaliações')).toBeInTheDocument()
    })

    await user.click(screen.getByRole('button', { name: 'Double Date (2024–2026)' }))
    expect(screen.getByText('Total de avaliações')).toBeInTheDocument()

    await user.click(screen.getByRole('link', { name: 'Avaliações' }))
    expect(screen.getByRole('heading', { name: 'Avaliações analisadas' })).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByText(/Exibindo/)).toBeInTheDocument()
    })

    await user.click(screen.getByRole('button', { name: 'Negativo' }))
    expect(screen.getByText(/Exibindo/)).toBeInTheDocument()
  })

  it('ST-02: página inicial exibe banner e módulos', () => {
    renderAppAt('/')

    expect(screen.getByRole('heading', { name: 'PromoSense' })).toBeInTheDocument()
    expect(screen.getByText('Módulos do sistema')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Ver dashboard' })).toHaveAttribute('href', '/dashboard')
  })

  it('ST-03: navegação pelo header destaca rota ativa', async () => {
    const user = userEvent.setup()
    renderAppAt('/')

    const dashboardLink = screen.getByRole('link', { name: 'Dashboard' })
    await user.click(dashboardLink)

    expect(dashboardLink).toHaveClass('bg-white')
    expect(dashboardLink).toHaveClass('text-gray-950')
  })

  it('ST-09: filtros possuem rótulos acessíveis', async () => {
    const user = userEvent.setup()
    renderAppAt('/dashboard')
    expect(screen.getByLabelText('Filtro por período promocional')).toBeInTheDocument()

    await user.click(screen.getByRole('link', { name: 'Avaliações' }))
    expect(screen.getByLabelText('Filtro por sentimento')).toBeInTheDocument()
  })
})
