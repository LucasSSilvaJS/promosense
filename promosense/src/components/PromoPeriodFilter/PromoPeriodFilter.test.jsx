import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { promotionalPeriods } from '../../data/promotionalPeriods'
import PromoPeriodFilter from './PromoPeriodFilter'

function ControlledFilter({ onChange }) {
  const [selectedPeriodId, setSelectedPeriodId] = useState('all')

  return (
    <PromoPeriodFilter
      periods={promotionalPeriods}
      selectedPeriodId={selectedPeriodId}
      onChange={(id) => {
        setSelectedPeriodId(id)
        onChange(id)
      }}
    />
  )
}

describe('PromoPeriodFilter — testes unitários', () => {
  it('UT-10: destaca botão ativo e chama onChange com o id correto', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    render(<ControlledFilter onChange={onChange} />)

    const blackFriday = screen.getByRole('button', { name: 'Black Friday' })
    expect(screen.getByRole('button', { name: 'Todos os períodos' })).toHaveClass('bg-gray-950')

    await user.click(blackFriday)

    expect(onChange).toHaveBeenCalledWith('black-friday')
    expect(blackFriday).toHaveClass('bg-gray-950')
    expect(screen.getByRole('button', { name: 'Todos os períodos' })).not.toHaveClass(
      'bg-gray-950',
    )
  })
})
