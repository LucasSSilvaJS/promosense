import { navigationItems } from '../../config/navigation'
import NavAction from '../NavAction/NavAction'

function PrimaryNav({ items = navigationItems, variant = 'desktop', onNavigate }) {
  const isMobile = variant === 'mobile'

  return (
    <nav aria-label="Navegação principal">
      <ul
        className={
          isMobile
            ? 'flex flex-col gap-1'
            : 'flex flex-wrap items-center justify-end gap-1 lg:gap-2'
        }
      >
        {items.map((item) => (
          <NavAction key={item.to} {...item} variant={variant} onNavigate={onNavigate} />
        ))}
      </ul>
    </nav>
  )
}

export default PrimaryNav
