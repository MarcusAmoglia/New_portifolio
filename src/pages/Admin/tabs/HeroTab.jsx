import { AdminInput, AdminTextarea } from '../components/AdminField'

const HeroTab = ({ hero, onChange }) => {
  const update = (field, value) => onChange({ ...hero, [field]: value })
  const updateI18n = (field, lang, value) => onChange({ ...hero, [field]: { ...hero[field], [lang]: value } })

  return (
    <div className="space-y-5">
      <h3 className="font-display font-bold text-sm uppercase tracking-wider" style={{ color: 'var(--primary)' }}>Informações do Hero</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <AdminInput label="Badge (PT)" value={hero.badge?.pt || ''} onChange={e => updateI18n('badge', 'pt', e.target.value)} />
        <AdminInput label="Badge (EN)" value={hero.badge?.en || ''} onChange={e => updateI18n('badge', 'en', e.target.value)} />
        <AdminInput label="Nome (PT)" value={hero.name?.pt || ''} onChange={e => updateI18n('name', 'pt', e.target.value)} />
        <AdminInput label="Nome (EN)" value={hero.name?.en || ''} onChange={e => updateI18n('name', 'en', e.target.value)} />
        <AdminInput label="Sobrenome (PT)" value={hero.lastName?.pt || ''} onChange={e => updateI18n('lastName', 'pt', e.target.value)} />
        <AdminInput label="Sobrenome (EN)" value={hero.lastName?.en || ''} onChange={e => updateI18n('lastName', 'en', e.target.value)} />
      </div>
      <AdminTextarea label="Descrição (PT)" rows={3} value={hero.description?.pt || ''} onChange={e => updateI18n('description', 'pt', e.target.value)} />
      <AdminTextarea label="Descrição (EN)" rows={3} value={hero.description?.en || ''} onChange={e => updateI18n('description', 'en', e.target.value)} />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <AdminInput label="LinkedIn URL" value={hero.linkedin || ''} onChange={e => update('linkedin', e.target.value)} />
        <AdminInput label="GitHub URL" value={hero.github || ''} onChange={e => update('github', e.target.value)} />
        <AdminInput label="Email" type="email" value={hero.email || ''} onChange={e => update('email', e.target.value)} />
      </div>
    </div>
  )
}

export default HeroTab
