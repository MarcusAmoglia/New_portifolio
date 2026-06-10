import { AdminInput, AdminField } from '../components/AdminField'
import { inputClass } from '../components/AdminField'

const SkillGroup = ({ title, group, onChange }) => {
  const updateTitle = (lang, value) => onChange({ ...group, title: { ...group.title, [lang]: value } })
  const updateItems = (lang, value) => onChange({ ...group, items: { ...group.items, [lang]: value.split('\n').filter(l => l.trim()) } })

  return (
    <div className="rounded-xl p-5 space-y-4" style={{ background: 'var(--bg-card-2)', border: '1px solid var(--border)' }}>
      <h3 className="font-display font-bold text-sm" style={{ color: 'var(--text)' }}>{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <AdminInput label="Título (PT)" value={group.title?.pt || ''} onChange={e => updateTitle('pt', e.target.value)} />
        <AdminInput label="Título (EN)" value={group.title?.en || ''} onChange={e => updateTitle('en', e.target.value)} />
      </div>
      <AdminField label="Itens PT — um por linha (use '– descrição' para subtítulo)">
        <textarea
          rows={7}
          className={inputClass}
          value={group.items?.pt?.join('\n') || ''}
          onChange={e => updateItems('pt', e.target.value)}
          placeholder="Python (Django) – Desenvolvimento Back-end&#10;React + Tailwind CSS – Interfaces modernas"
          style={{ whiteSpace: 'pre-wrap', resize: 'vertical' }}
        />
      </AdminField>
      <AdminField label="Items EN — one per line">
        <textarea
          rows={7}
          className={inputClass}
          value={group.items?.en?.join('\n') || ''}
          onChange={e => updateItems('en', e.target.value)}
          placeholder="Python (Django) – Back-end Development&#10;React + Tailwind CSS – Modern interfaces"
          style={{ whiteSpace: 'pre-wrap', resize: 'vertical' }}
        />
      </AdminField>
    </div>
  )
}

const SkillsTab = ({ skills, onChange }) => (
  <div className="space-y-5">
    <h3 className="font-display font-bold text-sm uppercase tracking-wider" style={{ color: 'var(--primary)' }}>Habilidades</h3>
    <SkillGroup title="Habilidades Técnicas (Tech)" group={skills.tech} onChange={updated => onChange({ ...skills, tech: updated })} />
    <SkillGroup title="Gestão & Processos" group={skills.processes} onChange={updated => onChange({ ...skills, processes: updated })} />
  </div>
)

export default SkillsTab
