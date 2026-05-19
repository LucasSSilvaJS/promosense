import { Outlet } from 'react-router-dom'
import SiteHeader from '../SiteHeader/SiteHeader'

function AppLayout() {
  return (
    <div className="flex min-h-dvh flex-col overflow-x-hidden bg-slate-100 text-slate-900">
      <SiteHeader />
      <Outlet />
    </div>
  )
}

export default AppLayout
