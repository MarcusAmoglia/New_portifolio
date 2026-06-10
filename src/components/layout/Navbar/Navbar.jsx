// src/components/layout/Navbar/Navbar.jsx
import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useTheme } from '../../../context/ThemeContext'
import { FiSun, FiMoon } from 'react-icons/fi'

/* ── Logo ─────────────────────────────────────────────────────────────── */
const Logo = () => (
  <div className="flex items-center gap-2 select-none">
    <span className="font-display font-bold text-2xl tracking-tight" style={{ color: 'var(--text)' }}>
      M.<span style={{ color: 'var(--primary)' }}>Amoglia</span>
    </span>
  </div>
)

/* ── Language switcher (agora usado tanto desktop quanto mobile) ── */
const LanguageSwitcher = () => {
  const { i18n } = useTranslation()
  return (
    <div
      className="flex items-center p-0.5 rounded-lg gap-0"
      style={{ background: 'var(--bg-card-2)', border: '1px solid var(--border)' }}
    >
      {['pt', 'en'].map(lng => (
        <button
          key={lng}
          onClick={() => i18n.changeLanguage(lng)}
          className="px-2.5 py-1 rounded-md text-[11px] font-bold transition-all duration-200 uppercase tracking-wider"
          style={{
            background: i18n.language === lng ? 'var(--primary)' : 'transparent',
            color:      i18n.language === lng ? '#000'           : 'var(--text-muted)',
          }}
        >
          {lng.toUpperCase()}
        </button>
      ))}
    </div>
  )
}

/* ── Theme toggle ── */
const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme()
  return (
    <button
      onClick={toggleTheme}
      aria-label="Alternar tema"
      className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
      style={{
        background: 'var(--bg-card-2)',
        border: '1px solid var(--border)',
        color: 'var(--text-muted)',
      }}
    >
      {isDark ? <FiSun size={15} /> : <FiMoon size={15} />}
    </button>
  )
}

/* ── Main Navbar ── */
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location  = useLocation()
  const navigate  = useNavigate()
  const { t }     = useTranslation()

  useEffect(() => { setMenuOpen(false) }, [location.pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* prevent body scroll when mobile menu open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setMenuOpen(false)
  }

  const handleHashClick = (e, sectionId) => {
    e.preventDefault()
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => {
        if (sectionId === 'home') window.scrollTo({ top: 0, behavior: 'smooth' })
        else scrollToSection(sectionId)
      }, 130)
    } else {
      if (sectionId === 'home') window.scrollTo({ top: 0, behavior: 'smooth' })
      else scrollToSection(sectionId)
    }
  }

  const links = [
    { id: 'home',          label: t('navbar.home'),           path: '/',              hash: 'home'          },
    { id: 'habilidades',   label: t('navbar.skills'),         path: '/#habilidades',  hash: 'habilidades'   },
    { id: 'trajetoria',    label: t('navbar.trajectory'),     path: '/#trajetoria',   hash: 'trajetoria'    },
    { id: 'projetos',      label: t('navbar.projects'),       path: '/projetos',      hash: null            },
    { id: 'certificacoes', label: t('navbar.certifications'), path: '/certificacoes', hash: null            },
    { id: 'contato',       label: t('navbar.contact'),        path: '/#contato',      hash: 'contato'       },
  ]

  const isActive = (link) => !link.hash && location.pathname === link.path

  const renderLink = (link, mobile = false) => {
    const active = isActive(link)
    const cls = mobile
      ? 'text-2xl font-display font-bold tracking-tight transition-all duration-200'
      : 'relative text-sm font-medium transition-all duration-200 pb-0.5 group'

    const style = {
      color: active ? 'var(--primary)' : mobile ? 'var(--text)' : 'var(--text-muted)',
    }

    const inner = mobile ? link.label : (
      <>
        {link.label}
        <span
          className="absolute -bottom-0.5 left-0 h-px w-0 group-hover:w-full transition-all duration-300 rounded-full"
          style={{ background: 'var(--primary)' }}
        />
      </>
    )

    if (link.hash) {
      return (
        <a
          key={link.id}
          href={link.path}
          onClick={e => handleHashClick(e, link.hash)}
          className={cls}
          style={style}
        >
          {inner}
        </a>
      )
    }
    return (
      <Link
        key={link.id}
        to={link.path}
        className={cls}
        style={style}
        onClick={() => setMenuOpen(false)}
      >
        {inner}
      </Link>
    )
  }

  return (
    <>
      {/* ─ Bar ─ */}
      <nav
        className="fixed top-0 left-0 w-full z-50 transition-all duration-500"
        style={{
          background:     scrolled ? 'var(--bg-nav)'    : 'transparent',
          backdropFilter: scrolled ? 'blur(22px)'        : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(22px)' : 'none',
          borderBottom:   scrolled ? '1px solid var(--border)' : '1px solid transparent',
          boxShadow:      scrolled ? '0 1px 24px rgba(0,0,0,0.08)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-4 flex items-center justify-between">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            <Logo />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-7">
            {links.map(l => renderLink(l))}
          </div>

          {/* Desktop right controls */}
          <div className="hidden md:flex items-center gap-2.5">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>

          {/* Mobile controls: LanguageSwitcher, ThemeToggle e Menu */}
          <div className="md:hidden flex items-center gap-2">
            {/* Agora o LanguageSwitcher também aparece aqui, fora do menu */}
            <LanguageSwitcher />
            <ThemeToggle />
            <button
              onClick={() => setMenuOpen(p => !p)}
              aria-label="Menu"
              className="w-9 h-9 rounded-lg flex flex-col items-center justify-center gap-1.5 transition-all"
              style={{ background: 'var(--bg-card-2)', border: '1px solid var(--border)' }}
            >
              <span
                className="block w-5 h-0.5 rounded-full transition-all duration-300 origin-center"
                style={{
                  background: 'var(--text)',
                  transform: menuOpen ? 'rotate(45deg) translateY(7px)' : 'none',
                }}
              />
              <span
                className="block w-5 h-0.5 rounded-full transition-all duration-300"
                style={{
                  background: 'var(--text)',
                  opacity: menuOpen ? 0 : 1,
                  transform: menuOpen ? 'scaleX(0)' : 'scaleX(1)',
                }}
              />
              <span
                className="block w-5 h-0.5 rounded-full transition-all duration-300 origin-center"
                style={{
                  background: 'var(--text)',
                  transform: menuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none',
                }}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* ─ Mobile overlay (agora sem o LanguageSwitcher) ─ */}
      <div
        className="md:hidden fixed inset-0 z-40 flex flex-col transition-all duration-400"
        style={{
          background:          'var(--bg)',
          opacity:             menuOpen ? 1 : 0,
          pointerEvents:       menuOpen ? 'auto' : 'none',
          backdropFilter:      'blur(24px)',
          WebkitBackdropFilter:'blur(24px)',
        }}
      >
        <div className="flex flex-col items-center justify-center flex-1 gap-7 pt-16">
          {links.map(l => renderLink(l, true))}
          {/* LanguageSwitcher removido daqui */}
        </div>
      </div>
    </>
  )
}

export default Navbar