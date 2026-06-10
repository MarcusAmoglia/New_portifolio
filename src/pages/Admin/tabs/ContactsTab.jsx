import { AdminInput } from '../components/AdminField'

const ContactsTab = ({ contacts, onChange }) => {
  const update = (field, value) => onChange({ ...contacts, [field]: value })

  return (
    <div className="space-y-5">
      <h3 className="font-display font-bold text-sm uppercase tracking-wider" style={{ color: 'var(--primary)' }}>Informações de Contato</h3>
      <div className="space-y-4">
        <AdminInput label="Email" type="email" value={contacts.email || ''} onChange={e => update('email', e.target.value)} placeholder="seu@email.com" />
        <AdminInput label="LinkedIn URL" value={contacts.linkedin || ''} onChange={e => update('linkedin', e.target.value)} placeholder="https://linkedin.com/in/seu-perfil" />
        <AdminInput label="GitHub URL" value={contacts.github || ''} onChange={e => update('github', e.target.value)} placeholder="https://github.com/seu-usuario" />
      </div>
    </div>
  )
}

export default ContactsTab
