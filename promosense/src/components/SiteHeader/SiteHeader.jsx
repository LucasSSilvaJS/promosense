import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaBars, FaXmark } from 'react-icons/fa6'
import logo from '../../assets/logo.png'
import PrimaryNav from '../PrimaryNav/PrimaryNav'

function SiteHeader() {
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [prevPathname, setPrevPathname] = useState(pathname)

  if (pathname !== prevPathname) {
    setPrevPathname(pathname)
    setMenuOpen(false)
  }

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-gray-950 shadow-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link to="/" className="shrink-0" aria-label="PromoSense - Início">
          <img
            src={logo}
            alt="PromoSense"
            className="h-10 w-auto object-contain sm:h-12 lg:h-14"
          />
        </Link>

        <div className="hidden md:block">
          <PrimaryNav />
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-xl text-white transition hover:bg-white/10 md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <FaXmark aria-hidden="true" /> : <FaBars aria-hidden="true" />}
        </button>
      </div>

      {menuOpen && (
        <nav
          id="mobile-nav"
          className="border-t border-white/10 px-4 py-3 md:hidden sm:px-6"
        >
          <PrimaryNav variant="mobile" onNavigate={() => setMenuOpen(false)} />
        </nav>
      )}
    </header>
  )
}

export default SiteHeader
