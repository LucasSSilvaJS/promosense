import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { promotionalPeriods } from '../../data/promotionalPeriods'
import PromoPeriodFilter from './PromoPeriodFilter'

function ControlledFilter({ onChange, onComingSoon }) {
  const [selectedPeriodId, setSelectedPeriodId] = useState('all')

  return (
    <PromoPeriodFilter
      periods={promotionalPeriods}
      selectedPeriodId={selectedPeriodId}
      onChange={(id) => {
        setSelectedPeriodId(id)
        onChange(id)
      }}
      onComingSoon={onComingSoon}
    />
  )
}

describe('PromoPeriodFilter — testes unitários', () => {
  it('UT-10: destaca botão ativo e chama onChange com o id correto', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    render(<ControlledFilter onChange={onChange} />)

    const doubleDate = screen.getByRole('button', { name: 'Double Date (2024–2026)' })
    expect(screen.getByRole('button', { name: 'Todos os períodos' })).toHaveClass('bg-gray-950')

    await user.click(doubleDate)

    expect(onChange).toHaveBeenCalledWith('double_date')
    expect(doubleDate).toHaveClass('bg-gray-950')
    expect(screen.getByRole('button', { name: 'Todos os períodos' })).not.toHaveClass(
      'bg-gray-950',
    )
  })

  it('UT-11: campanha indisponível dispara onComingSoon sem alterar seleção', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    const onComingSoon = vi.fn()

    render(<ControlledFilter onChange={onChange} onComingSoon={onComingSoon} />)

    await user.click(screen.getByRole('button', { name: 'Black Friday' }))

    expect(onComingSoon).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'black-friday', available: false }),
    )
    expect(onChange).not.toHaveBeenCalled()
    expect(screen.getByRole('button', { name: 'Todos os períodos' })).toHaveClass('bg-gray-950')
  })
})
