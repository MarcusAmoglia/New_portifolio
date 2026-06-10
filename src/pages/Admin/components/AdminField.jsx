// src/pages/Admin/components/AdminField.jsx
export const inputClass = 'admin-input'

export const AdminField = ({ label, children }) => (
  <div className="space-y-1.5">
    <label className="block text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{label}</label>
    {children}
  </div>
)

export const AdminInput = ({ label, ...props }) => (
  <AdminField label={label}>
    <input className={inputClass} {...props} />
  </AdminField>
)

export const AdminTextarea = ({ label, rows = 3, ...props }) => (
  <AdminField label={label}>
    <textarea className={inputClass} rows={rows} {...props} />
  </AdminField>
)
