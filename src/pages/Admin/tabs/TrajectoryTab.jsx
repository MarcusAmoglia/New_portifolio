import { useState } from 'react'
import { FaPlus, FaTrash, FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { inputClass } from '../components/AdminField'

const EMPTY_ITEM = {
  status: { pt: '', en: '' },
  title: { pt: '', en: '' },
  institution: { pt: '', en: '' },
  badge: { pt: '', en: '' },
  period: ''
}

const TrajectoryItem = ({ item, onUpdate, onRemove, index }) => {
  const [open, setOpen] = useState(false)
  const updateI18n = (field, lang, value) => onUpdate({ ...item, [field]: { ...item[field], [lang]: value } })

  return (
    <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
      <div
        className="flex items-center justify-between p-4 cursor-pointer transition-all"
        style={{ background: 'var(--bg-card-2)' }}
        onClick={() => setOpen(o => !o)}
      >
        <div className="flex items-center gap-3">
          <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: 'var(--primary)', color: '#000' }}>{index + 1}</span>
          <span className="text-sm font-medium" style={{ color: 'var(--text)' }}>{item.title?.pt || 'Nova Formação'}</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={e => { e.stopPropagation(); onRemove() }} className="w-7 h-7 rounded-lg flex items-center justify-center transition-all" style={{ background: 'rgba(239,68,68,0.1)', color: '#f87171' }}>
            <FaTrash size={11} />
          </button>
          {open ? <FaChevronUp size={12} style={{ color: 'var(--text-muted)' }} /> : <FaChevronDown size={12} style={{ color: 'var(--text-muted)' }} />}
        </div>
      </div>

      {open && (
        <div className="p-4 space-y-3" style={{ background: 'var(--bg-card)' }}>
          <div className="grid grid-cols-2 gap-3">
            <input value={item.status?.pt || ''} onChange={e => updateI18n('status', 'pt', e.target.value)} placeholder="Status (PT)" className={inputClass} />
            <input value={item.status?.en || ''} onChange={e => updateI18n('status', 'en', e.target.value)} placeholder="Status (EN)" className={inputClass} />
            <input value={item.title?.pt || ''} onChange={e => updateI18n('title', 'pt', e.target.value)} placeholder="Título (PT)" className={inputClass} />
            <input value={item.title?.en || ''} onChange={e => updateI18n('title', 'en', e.target.value)} placeholder="Título (EN)" className={inputClass} />
            <input value={item.institution?.pt || ''} onChange={e => updateI18n('institution', 'pt', e.target.value)} placeholder="Instituição (PT)" className={inputClass} />
            <input value={item.institution?.en || ''} onChange={e => updateI18n('institution', 'en', e.target.value)} placeholder="Instituição (EN)" className={inputClass} />
            <input value={item.badge?.pt || ''} onChange={e => updateI18n('badge', 'pt', e.target.value)} placeholder="Badge (PT)" className={inputClass} />
            <input value={item.badge?.en || ''} onChange={e => updateI18n('badge', 'en', e.target.value)} placeholder="Badge (EN)" className={inputClass} />
          </div>
          <input value={item.period || ''} onChange={e => onUpdate({ ...item, period: e.target.value })} placeholder="Período (ex: 2024–2025)" className={inputClass} />
        </div>
      )}
    </div>
  )
}

const TrajectoryTab = ({ trajectory, onChange }) => {
  const [localItems, setLocalItems] = useState(trajectory)

  const updateItems = (newItems) => { setLocalItems(newItems); onChange(newItems) }
  const updateItem = (idx, updated) => { const next = [...localItems]; next[idx] = updated; updateItems(next) }
  const removeItem = (idx) => updateItems(localItems.filter((_, i) => i !== idx))
  const addItem = () => updateItems([...localItems, { ...EMPTY_ITEM }])

  return (
    <div className="space-y-4">
      <h3 className="font-display font-bold text-sm uppercase tracking-wider" style={{ color: 'var(--primary)' }}>Trajetória Acadêmica</h3>
      <div className="space-y-3">
        {localItems.map((item, idx) => (
          <TrajectoryItem key={idx} item={item} index={idx} onUpdate={updated => updateItem(idx, updated)} onRemove={() => removeItem(idx)} />
        ))}
      </div>
      <button
        onClick={addItem}
        className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all"
        style={{ background: 'rgba(0,238,255,0.08)', color: 'var(--primary)', border: '1px solid var(--border-glow)' }}
      >
        <FaPlus size={12} /> Adicionar Formação
      </button>
    </div>
  )
}

export default TrajectoryTab
