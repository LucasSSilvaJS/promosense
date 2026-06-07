import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import SentimentBadge from './SentimentBadge'

describe('SentimentBadge — testes unitários', () => {
  it('UT-08: exibe rótulo e estilo para positivo e negativo', () => {
    const { rerender } = render(<SentimentBadge sentiment="positive" />)
    expect(screen.getByText('Positivo')).toHaveClass('text-emerald-800')

    rerender(<SentimentBadge sentiment="negative" />)
    expect(screen.getByText('Negativo')).toHaveClass('text-rose-800')
  })

  it('UT-09: modo compact usa texto menor', () => {
    render(<SentimentBadge sentiment="positive" compact />)
    expect(screen.getByText('Positivo')).toHaveClass('text-xs')
  })
})
