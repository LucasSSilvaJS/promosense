import { render } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import AppLayout from '../components/AppLayout/AppLayout'

export function renderWithRouter(ui, { route = '/' } = {}) {
  return render(<MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>)
}

export function renderAtRoute({ path, element }) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path={path} element={element} />
        </Route>
      </Routes>
    </MemoryRouter>,
  )
}
