// src/pages/Admin/tabs/ColorsTab.jsx
import { inputClass } from '../components/AdminField'

const COLOR_FIELDS = [
  { key: 'primary', label: 'Cor Primária', desc: 'Links, badges, botões' },
  { key: 'primaryHover', label: 'Cor Primária (Hover)', desc: 'Estado hover' },
  { key: 'secondary', label: 'Cor Secundária', desc: 'Acentos secundários' },
  { key: 'cardBg', label: 'Fundo dos Cards', desc: 'Background dos cards e modais' },
]

const ColorGroup = ({ title, colors, onChange }) => (
  <div className="space-y-4">
    <h3 className="font-display font-bold text-sm uppercase tracking-wider" style={{ color: 'var(--primary)' }}>
      {title}
    </h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      {COLOR_FIELDS.map(({ key, label, desc }) => (
        <div key={key} className="rounded-xl p-4 space-y-3" style={{ background: 'var(--bg-card-2)', border: '1px solid var(--border)' }}>
          <div>
            <p className="text-sm font-semibold" style={{ color: 'var(--text)' }}>{label}</p>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{desc}</p>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={colors[key] || '#000000'}
              onChange={e => onChange({ ...colors, [key]: e.target.value })}
              className="w-12 h-12 rounded-xl cursor-pointer border-0 p-1"
              style={{ background: 'transparent' }}
            />
            <input
              type="text"
              value={colors[key] || ''}
              onChange={e => onChange({ ...colors, [key]: e.target.value })}
              placeholder="#000000"
              className={inputClass}
              style={{ maxWidth: '140px' }}
            />
            <div className="w-8 h-8 rounded-lg" style={{ background: colors[key] || '#000', border: '1px solid var(--border)' }} />
          </div>
        </div>
      ))}
    </div>
    {/* Preview inline */}
    <div className="rounded-xl p-4 mt-2" style={{ background: colors.cardBg || 'var(--bg-card)', border: '1px solid var(--border)' }}>
      <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>Prévia</p>
      <div className="flex flex-wrap gap-2 items-center">
        <span className="px-3 py-1.5 rounded-full text-xs font-semibold" style={{ background: colors.primary + '20', color: colors.primary, border: `1px solid ${colors.primary}40` }}>
          Badge
        </span>
        <button className="px-4 py-1.5 rounded-lg text-xs font-semibold" style={{ background: colors.primary, color: '#000' }}>
          Botão
        </button>
        <div className="px-4 py-2 rounded-xl text-xs" style={{ background: colors.cardBg, border: '1px solid var(--border)' }}>
          Card bg
        </div>
      </div>
    </div>
  </div>
)

const ColorsTab = ({ colors, onChange }) => {
  const updateDark = (dark) => onChange({ ...colors, dark })
  const updateLight = (light) => onChange({ ...colors, light })

  return (
    <div className="space-y-10">
      <ColorGroup title="🌙 Tema Escuro" colors={colors.dark} onChange={updateDark} />
      <div className="border-t my-4" style={{ borderColor: 'var(--border)' }} />
      <ColorGroup title="☀️ Tema Claro" colors={colors.light} onChange={updateLight} />
    </div>
  )
}

export default ColorsTab