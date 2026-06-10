// src/components/sections/HeroSection.jsx
import { FaLinkedin, FaGithub } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import TypingText from '../ui/Typography/TypingText'
import JTAGCarousel from '../ui/Cards/JTAGCarousel'
import { useData } from '../../context/DataContext'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
})

const StatItem = ({ num, label }) => (
  <div className="text-center">
    <p className="font-display font-extrabold text-xl leading-none" style={{ color: 'var(--primary)' }}>
      {num}
    </p>
    <p className="text-xs mt-0.5 font-medium" style={{ color: 'var(--text-subtle)' }}>
      {label}
    </p>
  </div>
)

const HeroSection = () => {
  const { data } = useData()
  const { i18n, t } = useTranslation()
  const lang = i18n.language
  const hero = data.hero
  const stats = data.heroStats || [
    { num: '3+', label: 'Projetos' },
    { num: '540h', label: 'Residência' },
    { num: '2+', label: 'Formações' },
  ]

  const mailUrl = hero.email
    ? `https://mail.google.com/mail/?view=cm&fs=1&to=${hero.email}&su=${encodeURIComponent('Oportunidade Profissional')}`
    : '#'

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 pb-10 overflow-hidden">
      {/* Grid bg */}
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />

      {/* Ambient blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] rounded-full blur-[140px] opacity-[0.06]"
          style={{ background: 'var(--primary)' }} />
        <div className="absolute bottom-10 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] opacity-[0.05]"
          style={{ background: 'var(--secondary)' }} />
      </div>

      {/* Left accent line */}
      <div className="absolute left-0 top-0 bottom-0 w-px opacity-20 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, var(--primary), transparent)' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">

          {/* ── LEFT ── */}
          <div className="w-full lg:w-1/2 space-y-5">

            {/* Badge */}
            <motion.div {...fadeUp(0.1)}>
              <span
                className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full"
                style={{
                  color: 'var(--primary)',
                  border: '1px solid var(--border-glow)',
                  background: 'rgba(0,238,255,0.05)',
                  fontFamily: 'var(--font-display)',
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--primary)' }} />
                {hero.badge?.[lang] || hero.badge?.pt}
              </span>
            </motion.div>

            {/* Name */}
            <motion.div {...fadeUp(0.18)}>
              <h1
                className="font-display leading-none tracking-tighter"
                style={{ fontSize: 'clamp(2.8rem,7.5vw,5.5rem)', fontWeight: 800 }}
              >
                <span style={{ color: 'var(--text)' }}>
                  {hero.name?.[lang] || hero.name?.pt}
                </span>
                <br />
                <span style={{ color: 'var(--primary)' }}>
                  {hero.lastName?.[lang] || hero.lastName?.pt}
                </span>
              </h1>
            </motion.div>

            {/* Role */}
            <motion.div {...fadeUp(0.26)}>
              <p className="text-lg sm:text-xl" style={{ color: 'var(--text-muted)', fontWeight: 300 }}>
                {t('hero.atua_como')}{' '}
                <TypingText />
              </p>
            </motion.div>

            {/* Description */}
            <motion.div {...fadeUp(0.34)}>
              <p
                className="text-sm sm:text-base leading-relaxed max-w-lg preserve-linebreaks"
                style={{ color: 'var(--text-muted)' }}
              >
                {hero.description?.[lang] || hero.description?.pt}
              </p>
            </motion.div>

            {/* CTA */}
            <motion.div {...fadeUp(0.42)} className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href={mailUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105"
                style={{
                  background: 'var(--primary)',
                  color: '#000',
                  boxShadow: '0 0 24px rgba(0,238,255,0.18)',
                }}
              >
                <MdEmail size={16} />
                {t('hero.contact_button')}
              </a>

              {[
                { href: hero.linkedin, icon: <FaLinkedin size={17} />, label: 'LinkedIn' },
                { href: hero.github,   icon: <FaGithub  size={17} />, label: 'GitHub'   },
              ].map(({ href, icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{ border: '1px solid var(--border)', color: 'var(--text-muted)' }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--primary)'; e.currentTarget.style.borderColor = 'var(--border-glow)' }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border)' }}
                >
                  {icon}
                </a>
              ))}
            </motion.div>

            {/* Stats */}
            {stats.length > 0 && (
              <motion.div {...fadeUp(0.50)}>
                <div
                  className="inline-flex items-center gap-6 px-5 py-3 rounded-2xl"
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
                >
                  {stats.map((s, i) => (
                    <div key={i} className="flex items-center gap-6">
                      <StatItem num={s.num} label={s.label} />
                      {i < stats.length - 1 && (
                        <div className="w-px h-8 self-center" style={{ background: 'var(--border)' }} />
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* ── RIGHT: carousel ── */}
          <motion.div
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.85, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <JTAGCarousel />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection