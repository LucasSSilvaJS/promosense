import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppLayout from './components/AppLayout/AppLayout'
import DashboardPage from './pages/dashboard'
import HomePage from './pages/home'
import ReviewsPage from './pages/reviews'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/avaliacoes" element={<ReviewsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
