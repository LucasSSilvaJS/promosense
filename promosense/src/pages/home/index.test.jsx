import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { featureHighlights } from '../../config/features'
import HomePage from './index'

describe('Home — testes de integração', () => {
  it('IT-10: cards de módulo linkam para dashboard e avaliações', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    )

    const moduleLinks = screen.getAllByRole('link', { name: 'Acessar módulo' })
    expect(moduleLinks).toHaveLength(featureHighlights.length)

    const destinations = moduleLinks.map((link) => link.getAttribute('href'))
    expect(destinations).toContain('/dashboard')
    expect(destinations).toContain('/avaliacoes')
  })
})
