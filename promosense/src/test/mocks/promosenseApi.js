import { vi } from 'vitest'
import {
  filterMockReviews,
  mockApiPeriods,
  mockDashboardAll,
  mockDashboardDoubleDate,
} from '../fixtures/api'

export function createPromosenseApiMock() {
  return {
    fetchHealth: vi.fn(() => Promise.resolve({ status: 'ok' })),
    fetchPromotionalPeriods: vi.fn(() => Promise.resolve(mockApiPeriods)),
    fetchDashboard: vi.fn((periodId = 'all') =>
      Promise.resolve(periodId === 'double_date' ? mockDashboardDoubleDate : mockDashboardAll),
    ),
    fetchReviews: vi.fn((params = {}) => Promise.resolve(filterMockReviews(params))),
  }
}
