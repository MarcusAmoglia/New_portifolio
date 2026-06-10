// src/components/sections/ContatoSection.jsx
import { useData }        from '../../context/DataContext'
import { useTranslation } from 'react-i18next'
import { FaLinkedin, FaGithub } from 'react-icons/fa'
import { MdEmail }        from 'react-icons/md'
import { motion }         from 'framer-motion'

const ContatoSection = () => {
  const { data } = useData()
  const { t }    = useTranslation()
  const { linkedin, github, email } = data.contacts || {}

  const mailUrl = email
    ? `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent('Oportunidade Profissional')}`
    : `mailto:${email}`

  const socialLinks = [
    { href: linkedin, icon: <FaLinkedin size={18} />, label: 'LinkedIn' },
    { href: github,   icon: <FaGithub  size={18} />, label: 'GitHub'   },
    { href: mailUrl,  icon: <MdEmail   size={19} />, label: t('contact.email') },
  ]

  return (
    <section id="contato" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="section-divider" />
      <div className="max-w-xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl p-10 sm:p-14 relative overflow-hidden card-shadow"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
        >
          {/* Glows — visible in dark, subtle in light */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-56 h-28 opacity-20 blur-3xl rounded-full pointer-events-none"
            style={{ background: 'var(--primary)' }}
          />
          <div
            className="absolute bottom-0 right-1/4 w-36 h-36 opacity-10 blur-3xl rounded-full pointer-events-none"
            style={{ background: 'var(--secondary)' }}
          />

          <div className="relative z-10">
            <p
              className="text-xs font-display font-bold tracking-widest uppercase mb-3"
              style={{ color: 'var(--primary)' }}
            >
              Contact
            </p>
            <h2
              className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight mb-3"
              style={{ color: 'var(--text)' }}
            >
              {t('contact.title')}
            </h2>
            <p className="text-sm mb-8" style={{ color: 'var(--text-muted)' }}>
              {t('contact.subtitle')}
            </p>

            <a
              href={mailUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 mb-8"
              style={{
                background:  'var(--primary)',
                color:       '#000',
                boxShadow:   '0 0 30px rgba(0,238,255,0.18)',
              }}
            >
              <MdEmail size={16} />
              {t('contact.send_email')}
            </a>

            <div className="flex justify-center gap-3 flex-wrap">
              {socialLinks.map(({ href, icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl transition-all duration-200"
                  style={{
                    color:      'var(--text-muted)',
                    border:     '1px solid var(--border)',
                    background: 'var(--bg-card-2)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color       = 'var(--primary)'
                    e.currentTarget.style.borderColor = 'var(--border-glow)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color       = 'var(--text-muted)'
                    e.currentTarget.style.borderColor = 'var(--border)'
                  }}
                >
                  {icon}
                  <span>{label}</span>
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ContatoSection
