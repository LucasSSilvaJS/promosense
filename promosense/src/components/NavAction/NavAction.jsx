import { NavLink } from 'react-router-dom'

function NavAction({ label, to, end = false, variant = 'desktop', onNavigate }) {
  const isMobile = variant === 'mobile'

  return (
    <li className={isMobile ? 'w-full' : undefined}>
      <NavLink
        to={to}
        end={end}
        onClick={onNavigate}
        className={({ isActive }) =>
          [
            'rounded-lg font-medium transition-all duration-300',
            isMobile
              ? 'flex min-h-11 w-full items-center px-4 py-3 text-base'
              : 'inline-flex min-h-10 items-center px-3 py-2 text-sm lg:px-4',
            isActive
              ? 'bg-white text-gray-950'
              : 'text-white hover:bg-white hover:text-gray-950',
          ].join(' ')
        }
      >
        {label}
      </NavLink>
    </li>
  )
}

export default NavAction
