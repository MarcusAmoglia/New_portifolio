// src/components/sections/SkillsSection.jsx
import { useData }        from '../../context/DataContext'
import { useTranslation } from 'react-i18next'
import { motion }         from 'framer-motion'

const SkillCard = ({ titulo, icone, itens = [], delay = 0 }) => {
  const items = Array.isArray(itens) ? itens : []

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl p-6 relative overflow-hidden group card-shadow"
      style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', transition: 'border-color 0.3s' }}
      onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-glow)'}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
    >
      {/* Corner accent */}
      <div
        className="absolute top-0 right-0 w-24 h-24 opacity-[0.06] rounded-bl-full pointer-events-none"
        style={{ background: 'var(--primary)' }}
      />

      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
          style={{
            background:  'rgba(0,238,255,0.07)',
            border:      '1px solid var(--border-glow)',
          }}
        >
          {icone}
        </div>
        <h3 className="font-display font-bold text-base" style={{ color: 'var(--text)' }}>
          {titulo}
        </h3>
      </div>

      {/* Items */}
      <div className="space-y-1.5">
        {items.map((item, i) => {
          const dashIdx = item.indexOf('–')
          const main    = dashIdx > -1 ? item.slice(0, dashIdx).trim() : item
          const sub     = dashIdx > -1 ? item.slice(dashIdx + 1).trim() : null

          return (
            <div
              key={i}
              className="flex items-start gap-2.5 py-2 px-3 rounded-xl transition-all duration-200 cursor-default"
              style={{ background: 'var(--bg-card-2)' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,238,255,0.04)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--bg-card-2)'}
            >
              <span
                className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: 'var(--secondary)' }}
              />
              <div>
                <span className="text-sm font-medium" style={{ color: 'var(--text)' }}>
                  {main}
                </span>
                {sub && (
                  <span className="text-xs ml-1.5" style={{ color: 'var(--text-muted)' }}>
                    — {sub}
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}

const SkillsSection = () => {
  const { data }    = useData()
  const { i18n, t } = useTranslation()
  const lang        = i18n.language
  const { tech, processes } = data.skills

  return (
    <section id="habilidades" className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="section-divider" />
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="mb-14 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p
            className="text-xs font-display font-bold tracking-widest uppercase mb-3"
            style={{ color: 'var(--primary)' }}
          >
            {t('skills.expertise')}
          </p>
          <h2
            className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight"
            style={{ color: 'var(--text)' }}
          >
            {t('skills.title')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <SkillCard
            titulo={tech.title?.[lang]      || tech.title?.pt}
            icone={tech.icon}
            itens={tech.items?.[lang]       || tech.items?.pt}
            delay={0.1}
          />
          <SkillCard
            titulo={processes.title?.[lang] || processes.title?.pt}
            icone={processes.icon}
            itens={processes.items?.[lang]  || processes.items?.pt}
            delay={0.2}
          />
        </div>
      </div>
    </section>
  )
}

export default SkillsSection
