import { useState } from 'react'
import { FaPlus, FaTrash } from 'react-icons/fa'
import { inputClass } from '../components/AdminField'

const RolesGroup = ({ lang, label, items, onAdd, onRemove, newItem, setNewItem }) => (
  <div className="rounded-xl p-4 space-y-3" style={{ background: 'var(--bg-card-2)', border: '1px solid var(--border)' }}>
    <h4 className="font-semibold text-sm" style={{ color: 'var(--text)' }}>{label}</h4>
    <div className="flex flex-wrap gap-2 min-h-[36px]">
      {items.map((item, idx) => (
        <div
          key={idx}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
          style={{ background: 'rgba(0,238,255,0.08)', color: 'var(--primary)', border: '1px solid var(--border-glow)' }}
        >
          <span>{item}</span>
          <button onClick={() => onRemove(idx)} className="transition-colors" style={{ color: 'var(--primary)' }}
            onMouseEnter={e => e.currentTarget.style.color = '#f87171'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--primary)'}
          >
            <FaTrash size={10} />
          </button>
        </div>
      ))}
      {items.length === 0 && <span className="text-xs" style={{ color: 'var(--text-subtle)' }}>Nenhum cargo adicionado</span>}
    </div>
    <div className="flex gap-2">
      <input
        type="text"
        value={newItem}
        onChange={e => setNewItem(e.target.value)}
        onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); onAdd() } }}
        placeholder={lang === 'pt' ? 'Ex: Engenheiro de Software' : 'Ex: Software Engineer'}
        className={`${inputClass} flex-1`}
      />
      <button
        onClick={onAdd}
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all hover:scale-105"
        style={{ background: 'var(--primary)', color: '#000' }}
      >
        <FaPlus size={13} />
      </button>
    </div>
  </div>
)

const TypingRolesTab = ({ typingRoles, onChange }) => {
  const [ptItems, setPtItems] = useState(typingRoles?.pt || [])
  const [enItems, setEnItems] = useState(typingRoles?.en || [])
  const [newPt, setNewPt] = useState('')
  const [newEn, setNewEn] = useState('')

  const updateParent = (pt, en) => onChange({ pt, en })

  const addPt = () => {
    if (!newPt.trim()) return
    const updated = [...ptItems, newPt.trim()]
    setPtItems(updated)
    updateParent(updated, enItems)
    setNewPt('')
  }
  const removePt = (idx) => {
    const updated = ptItems.filter((_, i) => i !== idx)
    setPtItems(updated)
    updateParent(updated, enItems)
  }
  const addEn = () => {
    if (!newEn.trim()) return
    const updated = [...enItems, newEn.trim()]
    setEnItems(updated)
    updateParent(ptItems, updated)
    setNewEn('')
  }
  const removeEn = (idx) => {
    const updated = enItems.filter((_, i) => i !== idx)
    setEnItems(updated)
    updateParent(ptItems, updated)
  }

  return (
    <div className="space-y-5">
      <h3 className="font-display font-bold text-sm uppercase tracking-wider" style={{ color: 'var(--primary)' }}>Cargos do Hero (Typing)</h3>
      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Esses cargos aparecem animados na seção Hero do portfólio.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <RolesGroup lang="pt" label="🇧🇷 Português (PT)" items={ptItems} onAdd={addPt} onRemove={removePt} newItem={newPt} setNewItem={setNewPt} />
        <RolesGroup lang="en" label="🇺🇸 English (EN)" items={enItems} onAdd={addEn} onRemove={removeEn} newItem={newEn} setNewItem={setNewEn} />
      </div>
    </div>
  )
}

export default TypingRolesTab
