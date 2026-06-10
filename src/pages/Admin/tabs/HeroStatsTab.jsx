// src/pages/Admin/tabs/HeroStatsTab.jsx
import { useState } from 'react'
import { FaPlus, FaTrash } from 'react-icons/fa'
import { inputClass } from '../components/AdminField'

const EMPTY_STAT = { num: '', label: '' }

const HeroStatsTab = ({ heroStats, onChange }) => {
  const [local, setLocal] = useState(
    heroStats?.length ? heroStats : [
      { num: '3+',   label: 'Projetos'   },
      { num: '540h', label: 'Residência' },
      { num: '2+',   label: 'Formações'  },
    ]
  )

  const sync = (next) => { setLocal(next); onChange(next) }
  const update = (idx, field, value) => {
    const n = [...local]
    n[idx] = { ...n[idx], [field]: value }
    sync(n)
  }
  const remove = (idx) => sync(local.filter((_, i) => i !== idx))
  const add    = ()    => sync([...local, { ...EMPTY_STAT }])

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display font-bold text-sm uppercase tracking-wider mb-1" style={{ color: 'var(--primary)' }}>
          Estatísticas do Hero
        </h3>
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
          Esses números aparecem na seção principal — ex: "3+ Projetos", "540h Residência".
        </p>
      </div>

      {/* Preview */}
      <div
        className="inline-flex flex-wrap items-center gap-6 px-5 py-3 rounded-2xl"
        style={{ background: 'var(--bg-card-2)', border: '1px solid var(--border)' }}
      >
        {local.map((s, i) => (
          <div key={i} className="flex items-center gap-6">
            <div className="text-center">
              <p className="font-display font-extrabold text-xl leading-none" style={{ color: 'var(--primary)' }}>
                {s.num || '—'}
              </p>
              <p className="text-xs mt-0.5 font-medium" style={{ color: 'var(--text-subtle)' }}>
                {s.label || '—'}
              </p>
            </div>
            {i < local.length - 1 && (
              <div className="w-px h-8" style={{ background: 'var(--border)' }} />
            )}
          </div>
        ))}
        {local.length === 0 && (
          <span className="text-xs" style={{ color: 'var(--text-subtle)' }}>Nenhum stat</span>
        )}
      </div>

      {/* Edit rows */}
      <div className="space-y-3">
        {local.map((stat, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 p-3 rounded-xl"
            style={{ background: 'var(--bg-card-2)', border: '1px solid var(--border)' }}
          >
            <span
              className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold"
              style={{ background: 'var(--primary)', color: '#000' }}
            >
              {idx + 1}
            </span>

            <div className="flex flex-1 gap-3">
              <input
                value={stat.num}
                onChange={e => update(idx, 'num', e.target.value)}
                placeholder="Número — ex: 3+"
                className={inputClass}
                style={{ maxWidth: '120px' }}
              />
              <input
                value={stat.label}
                onChange={e => update(idx, 'label', e.target.value)}
                placeholder="Rótulo — ex: Projetos"
                className={inputClass}
              />
            </div>

            <button
              onClick={() => remove(idx)}
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all"
              style={{ background: 'rgba(239,68,68,0.10)', color: '#f87171' }}
            >
              <FaTrash size={12} />
            </button>
          </div>
        ))}
        {local.length === 0 && (
          <p className="text-sm text-center py-4" style={{ color: 'var(--text-subtle)' }}>
            Nenhuma estatística. Clique em "Adicionar" para criar.
          </p>
        )}
      </div>

      <button
        onClick={add}
        className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:scale-[1.02]"
        style={{
          background: 'rgba(0,238,255,0.07)',
          color:      'var(--primary)',
          border:     '1px solid var(--border-glow)',
        }}
      >
        <FaPlus size={12} /> Adicionar Stat
      </button>
    </div>
  )
}

export default HeroStatsTab
