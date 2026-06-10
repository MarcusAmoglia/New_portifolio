// src/components/layout/Footer/Footer.jsx
import { FaLinkedin, FaGithub } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { useTranslation } from 'react-i18next'
import { useData } from '../../../context/DataContext'

const Footer = () => {
  const { t }    = useTranslation()
  const { data } = useData()
  const { linkedin, github, email } = data.contacts || {}

  const links = [
    { href: linkedin,            icon: <FaLinkedin size={17} />, label: 'LinkedIn' },
    { href: github,              icon: <FaGithub  size={17} />, label: 'GitHub'   },
    { href: email ? `mailto:${email}` : '#', icon: <MdEmail size={18} />, label: 'E-mail' },
  ]

  return (
    <footer
      className="py-8"
      style={{
        borderTop:  '1px solid var(--border)',
        background: 'var(--bg-card)',
      }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <span className="font-display font-bold text-sm" style={{ color: 'var(--text)' }}>
            Marcus<span style={{ color: 'var(--primary)' }}>.</span>
          </span>
          <span style={{ color: 'var(--text-subtle)' }} className="text-xs">
            &copy; {new Date().getFullYear()}
          </span>
        </div>

        {/* Social links */}
        <div className="flex gap-3">
          {links.map(({ href, icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
              style={{
                background: 'var(--bg-card-2)',
                border:     '1px solid var(--border)',
                color:      'var(--text-muted)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color        = 'var(--primary)'
                e.currentTarget.style.borderColor  = 'var(--border-glow)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color        = 'var(--text-muted)'
                e.currentTarget.style.borderColor  = 'var(--border)'
              }}
            >
              {icon}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-xs" style={{ color: 'var(--text-subtle)' }}>
          {t('footer.copyright')}
        </p>
      </div>
    </footer>
  )
}

export default Footer
