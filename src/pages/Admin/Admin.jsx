// src/pages/Admin/Admin.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaSave, FaUndo, FaSignOutAlt, FaFileExport, FaLock } from 'react-icons/fa'
import { loadData, saveData, getDefaultData } from '../../utils/dataManager'
import { inputClass } from './components/AdminField'

import HeroTab         from './tabs/HeroTab'
import HeroStatsTab    from './tabs/HeroStatsTab'
import TypingRolesTab  from './tabs/TypingRolesTab'
import SkillsTab       from './tabs/SkillsTab'
import TrajectoryTab   from './tabs/TrajectoryTab'
import ProjectsTab     from './tabs/ProjectsTab'
import CertificationsTab from './tabs/CertificationsTab'
import ContactsTab     from './tabs/ContactsTab'
import ColorsTab       from './tabs/ColorsTab'

const ADMIN_PASSWORD = 'admin123'

const TABS = [
  { id: 'hero',           label: '👤 Hero'         },
  { id: 'heroStats',      label: '📊 Stats'        },
  { id: 'typingRoles',    label: '💬 Cargos'       },
  { id: 'skills',         label: '⚡ Skills'       },
  { id: 'trajectory',     label: '🎓 Trajetória'   },
  { id: 'projects',       label: '📁 Projetos'     },
  { id: 'certifications', label: '📜 Certificações'},
  { id: 'contacts',       label: '📧 Contatos'     },
  { id: 'colors',         label: '🎨 Cores'        },
]

// ── Login screen ──────────────────────────────────────────────────────────────
const LoginScreen = ({ onLogin }) => {
  const [password, setPassword]   = useState('')
  const [error,    setError]      = useState(false)
  const [shaking,  setShaking]    = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      onLogin()
    } else {
      setError(true)
      setShaking(true)
      setPassword('')
      setTimeout(() => setShaking(false), 400)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--bg)' }}>
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ background: 'rgba(0,238,255,0.08)', border: '1px solid var(--border-glow)' }}
          >
            <FaLock style={{ color: 'var(--primary)' }} size={20} />
          </div>
          <h2 className="font-display font-bold text-2xl" style={{ color: 'var(--text)' }}>
            Painel Admin
          </h2>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
            Acesso restrito ao portfólio
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl p-6 space-y-4"
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            transform: shaking ? 'translateX(0)' : undefined,
            animation: shaking ? 'shake 0.4s ease' : undefined,
          }}
        >
          {error && (
            <div
              className="text-xs px-3 py-2 rounded-lg"
              style={{
                background: 'rgba(239,68,68,0.10)',
                color: '#f87171',
                border: '1px solid rgba(239,68,68,0.20)',
              }}
            >
              Senha incorreta. Tente novamente.
            </div>
          )}

          <div>
            <label
              className="block text-xs font-semibold uppercase tracking-wider mb-1.5"
              style={{ color: 'var(--text-muted)' }}
            >
              Senha
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => { setPassword(e.target.value); setError(false) }}
              className={inputClass}
              autoFocus
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-[1.02]"
            style={{ background: 'var(--primary)', color: '#000' }}
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  )
}

// ── Admin panel ────────────────────────────────────────────────────────────────
const AdminPanel = ({ initialData, onSave, onLogout, onExport }) => {
  const [localData,  setLocalData]  = useState(initialData)
  const [activeTab,  setActiveTab]  = useState('hero')
  const [saveState,  setSaveState]  = useState('idle') // idle | saved | error

  const updateSection = (section, value) =>
    setLocalData(prev => ({ ...prev, [section]: value }))

  const handleSave = () => {
    try {
      onSave(localData)
      setSaveState('saved')
      setTimeout(() => setSaveState('idle'), 2200)
    } catch {
      setSaveState('error')
      setTimeout(() => setSaveState('idle'), 2200)
    }
  }

  const handleReset = async () => {
    if (!window.confirm('Resetar para os dados padrão? Todas as alterações serão perdidas.')) return
    const def = await getDefaultData()
    setLocalData(def)
    onSave(def)
  }

  const tabContent = {
    hero:           <HeroTab          hero={localData.hero}                     onChange={v => updateSection('hero', v)} />,
    heroStats:      <HeroStatsTab     heroStats={localData.heroStats}           onChange={v => updateSection('heroStats', v)} />,
    typingRoles:    <TypingRolesTab   typingRoles={localData.typingRoles}       onChange={v => updateSection('typingRoles', v)} />,
    skills:         <SkillsTab        skills={localData.skills}                 onChange={v => updateSection('skills', v)} />,
    trajectory:     <TrajectoryTab    trajectory={localData.trajectory}         onChange={v => updateSection('trajectory', v)} />,
    projects:       <ProjectsTab      projects={localData.projects}             onChange={v => updateSection('projects', v)} />,
    certifications: <CertificationsTab certifications={localData.certifications} onChange={v => updateSection('certifications', v)} />,
    contacts:       <ContactsTab      contacts={localData.contacts}             onChange={v => updateSection('contacts', v)} />,
    colors:         <ColorsTab        colors={localData.colors}                 onChange={v => updateSection('colors', v)} />,
  }

  const saveBtnStyle = {
    idle:  { background: 'var(--primary)',             color: '#000'    },
    saved: { background: 'rgba(34,197,94,0.15)',       color: '#4ade80', border: '1px solid rgba(34,197,94,0.3)' },
    error: { background: 'rgba(239,68,68,0.15)',       color: '#f87171', border: '1px solid rgba(239,68,68,0.3)' },
  }

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8" style={{ background: 'var(--bg)' }}>
      <div className="max-w-6xl mx-auto">

        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="font-display font-bold text-2xl" style={{ color: 'var(--text)' }}>
              Painel de Controle
            </h1>
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
              Gerencie o conteúdo do seu portfólio
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-[1.02]"
              style={saveBtnStyle[saveState]}
            >
              <FaSave size={13} />
              {saveState === 'idle'  && 'Salvar'}
              {saveState === 'saved' && 'Salvo!'}
              {saveState === 'error' && 'Erro!'}
            </button>

            <button
              onClick={() => onExport(localData)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:scale-[1.02]"
              style={{ background: 'var(--bg-card)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}
            >
              <FaFileExport size={13} /> Exportar JSON
            </button>

            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:scale-[1.02]"
              style={{ background: 'rgba(234,179,8,0.10)', color: '#fbbf24', border: '1px solid rgba(234,179,8,0.20)' }}
            >
              <FaUndo size={13} /> Resetar
            </button>

            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:scale-[1.02]"
              style={{ background: 'rgba(239,68,68,0.10)', color: '#f87171', border: '1px solid rgba(239,68,68,0.20)' }}
            >
              <FaSignOutAlt size={13} /> Sair
            </button>
          </div>
        </div>

        {/* ── Tab nav ── */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200"
              style={{
                background: activeTab === tab.id ? 'var(--primary)'   : 'var(--bg-card)',
                color:      activeTab === tab.id ? '#000'              : 'var(--text-muted)',
                border:     activeTab === tab.id ? 'none'              : '1px solid var(--border)',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── Tab content ── */}
        <div
          className="rounded-2xl p-6"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
        >
          {tabContent[activeTab]}
        </div>
      </div>
    </div>
  )
}

// ── Root component ─────────────────────────────────────────────────────────────
const Admin = () => {
  const [authenticated, setAuthenticated] = useState(false)
  const [initialData,   setInitialData]   = useState(null)
  const navigate = useNavigate()

  const handleLogin = async () => {
    const loaded = await loadData()
    setInitialData(loaded)
    setAuthenticated(true)
  }

  const handleSave = (newData) => saveData(newData)

  const handleLogout = () => {
    setAuthenticated(false)
    setInitialData(null)
    navigate('/')
  }

  const handleExport = (data) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href     = url
    a.download = `portfolio-backup-${new Date().toISOString().slice(0,19).replace(/:/g,'-')}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (!authenticated) return <LoginScreen onLogin={handleLogin} />
  if (!initialData)   return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg)', color: 'var(--text-muted)' }}>
      Carregando...
    </div>
  )

  return (
    <AdminPanel
      initialData={initialData}
      onSave={handleSave}
      onLogout={handleLogout}
      onExport={handleExport}
    />
  )
}

export default Admin
