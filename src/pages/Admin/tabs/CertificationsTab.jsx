import { useState } from 'react'
import { FaPlus, FaTrash, FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { inputClass } from '../components/AdminField'

const EMPTY_CERT = { title: { pt: '', en: '' }, issuer: { pt: '', en: '' }, hours: '', year: '', pdf: '', preview: '' }

const CertItem = ({ cert, onUpdate, onRemove, index }) => {
  const [open, setOpen] = useState(false)
  const updateI18n = (field, lang, value) => onUpdate({ ...cert, [field]: { ...cert[field], [lang]: value } })

  return (
    <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
      <div
        className="flex items-center justify-between p-4 cursor-pointer"
        style={{ background: 'var(--bg-card-2)' }}
        onClick={() => setOpen(o => !o)}
      >
        <div className="flex items-center gap-3">
          <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: 'var(--secondary)', color: '#fff' }}>{index + 1}</span>
          <span className="text-sm font-medium" style={{ color: 'var(--text)' }}>{cert.title?.pt || 'Nova Certificação'}</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={e => { e.stopPropagation(); onRemove() }} className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'rgba(239,68,68,0.1)', color: '#f87171' }}>
            <FaTrash size={11} />
          </button>
          {open ? <FaChevronUp size={12} style={{ color: 'var(--text-muted)' }} /> : <FaChevronDown size={12} style={{ color: 'var(--text-muted)' }} />}
        </div>
      </div>

      {open && (
        <div className="p-4 space-y-3" style={{ background: 'var(--bg-card)' }}>
          <div className="grid grid-cols-2 gap-3">
            <input value={cert.title?.pt || ''} onChange={e => updateI18n('title', 'pt', e.target.value)} placeholder="Título (PT)" className={inputClass} />
            <input value={cert.title?.en || ''} onChange={e => updateI18n('title', 'en', e.target.value)} placeholder="Título (EN)" className={inputClass} />
            <input value={cert.issuer?.pt || ''} onChange={e => updateI18n('issuer', 'pt', e.target.value)} placeholder="Emissor (PT)" className={inputClass} />
            <input value={cert.issuer?.en || ''} onChange={e => updateI18n('issuer', 'en', e.target.value)} placeholder="Emissor (EN)" className={inputClass} />
            <input value={cert.hours || ''} onChange={e => onUpdate({ ...cert, hours: e.target.value })} placeholder="Carga horária (ex: 200)" className={inputClass} />
            <input value={cert.year || ''} onChange={e => onUpdate({ ...cert, year: e.target.value })} placeholder="Ano (ex: 2025)" className={inputClass} />
          </div>
          <input value={cert.pdf || ''} onChange={e => onUpdate({ ...cert, pdf: e.target.value })} placeholder="Caminho do PDF (ex: /certificados/nome.pdf)" className={inputClass} />
          <input value={cert.preview || ''} onChange={e => onUpdate({ ...cert, preview: e.target.value })} placeholder="URL da imagem preview (ex: /thumbs_certificados/nome.jpg)" className={inputClass} />
        </div>
      )}
    </div>
  )
}

const CertificationsTab = ({ certifications, onChange }) => {
  const [localCerts, setLocalCerts] = useState(certifications)

  const updateCerts = (newCerts) => { setLocalCerts(newCerts); onChange(newCerts) }
  const updateItem = (idx, updated) => { const next = [...localCerts]; next[idx] = updated; updateCerts(next) }
  const removeItem = (idx) => updateCerts(localCerts.filter((_, i) => i !== idx))
  const addItem = () => updateCerts([...localCerts, { ...EMPTY_CERT }])

  return (
    <div className="space-y-4">
      <h3 className="font-display font-bold text-sm uppercase tracking-wider" style={{ color: 'var(--primary)' }}>Certificações</h3>
      <div className="space-y-3">
        {localCerts.map((cert, idx) => (
          <CertItem key={idx} cert={cert} index={idx} onUpdate={updated => updateItem(idx, updated)} onRemove={() => removeItem(idx)} />
        ))}
      </div>
      <button
        onClick={addItem}
        className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all"
        style={{ background: 'rgba(0,238,255,0.08)', color: 'var(--primary)', border: '1px solid var(--border-glow)' }}
      >
        <FaPlus size={12} /> Adicionar Certificação
      </button>
    </div>
  )
}

export default CertificationsTab
