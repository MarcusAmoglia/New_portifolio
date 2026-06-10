// src/components/sections/TrajectorySection.jsx
import { useData } from '../../context/DataContext'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

const statusColor = (status = '') => {
  const s = status.toLowerCase()
  if (s.includes('andamento') || s.includes('progress')) return { bg: 'rgba(0,238,255,0.08)', text: 'var(--primary)', border: 'var(--border-glow)' }
  return { bg: 'rgba(168,85,247,0.08)', text: 'var(--secondary)', border: 'rgba(168,85,247,0.25)' }
}

const TrajectoryCard = ({ item, lang, index }) => {
  const status = item.status?.[lang] || item.status?.pt || ''
  const colors = statusColor(status)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl p-5 relative group transition-all duration-300"
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
      }}
      onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-glow)'}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
    >
      {/* Status + period row */}
      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
        <span
          className="text-[10px] font-display font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
          style={{ background: colors.bg, color: colors.text, border: `1px solid ${colors.border}` }}
        >
          {status}
        </span>
        <span className="text-xs" style={{ color: 'var(--text-subtle)' }}>{item.period}</span>
      </div>

      {/* Title */}
      <h3 className="font-display font-bold text-base sm:text-lg leading-snug mb-1" style={{ color: 'var(--text)' }}>
        {item.title?.[lang] || item.title?.pt}
      </h3>

      {/* Institution */}
      <p className="text-sm mb-3" style={{ color: 'var(--text-muted)' }}>
        {item.institution?.[lang] || item.institution?.pt}
      </p>

      {/* Badge */}
      <span
        className="text-[10px] font-display font-bold uppercase tracking-wider px-2.5 py-1 rounded-md"
        style={{
          background: 'rgba(168,85,247,0.08)',
          color: 'var(--secondary)',
          border: '1px solid rgba(168,85,247,0.2)'
        }}
      >
        {item.badge?.[lang] || item.badge?.pt}
      </span>

      {/* Hover accent line */}
      <div className="absolute bottom-0 left-4 right-4 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"
        style={{ background: 'var(--primary)' }} />
    </motion.div>
  )
}

const TrajectorySection = () => {
  const { data } = useData()
  const { i18n, t } = useTranslation()
  const lang = i18n.language

  return (
    <section id="trajetoria" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="section-divider mb-24" />
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="mb-14 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-display font-bold tracking-widest uppercase mb-3" style={{ color: 'var(--primary)' }}>
            Academic
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight" style={{ color: 'var(--text)' }}>
            {t('trajectory.title')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.trajectory.map((item, idx) => (
            <TrajectoryCard key={idx} item={item} lang={lang} index={idx} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default TrajectorySection
