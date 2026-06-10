// src/pages/Admin/tabs/ProjectsTab.jsx
import { useState } from 'react'
import { FaPlus, FaTrash, FaChevronDown, FaChevronUp, FaFilePdf } from 'react-icons/fa'
import { inputClass } from '../components/AdminField'

const EMPTY_PROJECT = {
  id: Date.now(),
  titulo:    { pt: '', en: '' },
  subtitulo: { pt: '', en: '' },
  descricao: { pt: '', en: '' },
  videoId: '',
  github:  '',
  pdf:     '',
  tags:    [],
  cor:     '#00eeff',
  ano:     '',
}

const ProjectItem = ({ proj, onUpdate, onRemove, index }) => {
  const [open, setOpen] = useState(false)
  const upI18n = (field, lang, value) =>
    onUpdate({ ...proj, [field]: { ...proj[field], [lang]: value } })

  return (
    <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
      {/* Header */}
      <div
        className="flex items-center justify-between p-4 cursor-pointer select-none"
        style={{ background: 'var(--bg-card-2)' }}
        onClick={() => setOpen(o => !o)}
      >
        <div className="flex items-center gap-3 min-w-0">
          <span
            className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold"
            style={{ background: proj.cor || 'var(--primary)', color: '#000' }}
          >
            {index + 1}
          </span>
          <span className="text-sm font-medium truncate" style={{ color: 'var(--text)' }}>
            {proj.titulo?.pt || 'Novo Projeto'}
          </span>
          {proj.pdf && (
            <FaFilePdf size={11} style={{ color: 'var(--secondary)', flexShrink: 0 }} title="PDF atrelado" />
          )}
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={e => { e.stopPropagation(); onRemove() }}
            className="w-7 h-7 rounded-lg flex items-center justify-center transition-all"
            style={{ background: 'rgba(239,68,68,0.10)', color: '#f87171' }}
          >
            <FaTrash size={11} />
          </button>
          {open
            ? <FaChevronUp   size={12} style={{ color: 'var(--text-muted)' }} />
            : <FaChevronDown size={12} style={{ color: 'var(--text-muted)' }} />
          }
        </div>
      </div>

      {/* Body */}
      {open && (
        <div className="p-4 space-y-3" style={{ background: 'var(--bg-card)' }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input value={proj.titulo?.pt    || ''} onChange={e => upI18n('titulo',    'pt', e.target.value)} placeholder="Título (PT)"    className={inputClass} />
            <input value={proj.titulo?.en    || ''} onChange={e => upI18n('titulo',    'en', e.target.value)} placeholder="Título (EN)"    className={inputClass} />
            <input value={proj.subtitulo?.pt || ''} onChange={e => upI18n('subtitulo', 'pt', e.target.value)} placeholder="Subtítulo (PT)" className={inputClass} />
            <input value={proj.subtitulo?.en || ''} onChange={e => upI18n('subtitulo', 'en', e.target.value)} placeholder="Subtítulo (EN)" className={inputClass} />
          </div>

          <textarea
            rows={2}
            value={proj.descricao?.pt || ''}
            onChange={e => upI18n('descricao', 'pt', e.target.value)}
            placeholder="Descrição (PT)"
            className={inputClass}
            style={{ resize: 'vertical' }}
          />
          <textarea
            rows={2}
            value={proj.descricao?.en || ''}
            onChange={e => upI18n('descricao', 'en', e.target.value)}
            placeholder="Descrição (EN)"
            className={inputClass}
            style={{ resize: 'vertical' }}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              value={proj.videoId || ''}
              onChange={e => onUpdate({ ...proj, videoId: e.target.value })}
              placeholder="YouTube Video ID (ex: dQw4w9WgXcQ)"
              className={inputClass}
            />
            <input
              value={proj.github || ''}
              onChange={e => onUpdate({ ...proj, github: e.target.value })}
              placeholder="GitHub URL"
              className={inputClass}
            />
          </div>

          {/* PDF field — destaque */}
          <div
            className="rounded-xl p-3 space-y-1.5"
            style={{ background: 'rgba(168,85,247,0.05)', border: '1px solid rgba(168,85,247,0.2)' }}
          >
            <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider"
              style={{ color: 'var(--secondary)' }}>
              <FaFilePdf size={11} /> Documentação PDF (opcional)
            </label>
            <input
              value={proj.pdf || ''}
              onChange={e => onUpdate({ ...proj, pdf: e.target.value })}
              placeholder="Caminho ou URL do PDF — ex: /docs/projeto.pdf"
              className={inputClass}
            />
            <p className="text-[11px]" style={{ color: 'var(--text-subtle)' }}>
              Deixe vazio para não exibir o botão de documentação.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              value={proj.ano || ''}
              onChange={e => onUpdate({ ...proj, ano: e.target.value })}
              placeholder="Ano (ex: 2025)"
              className={inputClass}
            />
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={proj.cor || '#00eeff'}
                onChange={e => onUpdate({ ...proj, cor: e.target.value })}
                className="w-10 h-10 rounded-lg cursor-pointer border-0 p-1 flex-shrink-0"
                style={{ background: 'transparent' }}
                title="Cor de destaque"
              />
              <input
                value={proj.cor || '#00eeff'}
                onChange={e => onUpdate({ ...proj, cor: e.target.value })}
                placeholder="Cor hex"
                className={inputClass}
              />
            </div>
          </div>

          <input
            value={proj.tags?.join(', ') || ''}
            onChange={e => onUpdate({
              ...proj,
              tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean),
            })}
            placeholder="Tags separadas por vírgula: React, Python, QA"
            className={inputClass}
          />
        </div>
      )}
    </div>
  )
}

const ProjectsTab = ({ projects, onChange }) => {
  const [local, setLocal] = useState(projects)

  const sync = (next) => { setLocal(next); onChange(next) }
  const update = (idx, updated) => { const n = [...local]; n[idx] = updated; sync(n) }
  const remove = (idx)           => sync(local.filter((_, i) => i !== idx))
  const add    = ()              => {
    const maxId = local.length > 0 ? Math.max(...local.map(p => p.id || 0)) + 1 : 1
    sync([...local, { ...EMPTY_PROJECT, id: maxId }])
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-bold text-sm uppercase tracking-wider" style={{ color: 'var(--primary)' }}>
          Projetos
        </h3>
        <span className="text-xs px-2 py-1 rounded-full" style={{ background: 'var(--bg-card-2)', color: 'var(--text-subtle)' }}>
          {local.length} projeto{local.length !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="space-y-3">
        {local.map((proj, idx) => (
          <ProjectItem
            key={proj.id ?? idx}
            proj={proj}
            index={idx}
            onUpdate={updated => update(idx, updated)}
            onRemove={() => remove(idx)}
          />
        ))}
        {local.length === 0 && (
          <p className="text-sm text-center py-6" style={{ color: 'var(--text-subtle)' }}>
            Nenhum projeto ainda. Clique em "Adicionar Projeto" para começar.
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
        <FaPlus size={12} /> Adicionar Projeto
      </button>
    </div>
  )
}

export default ProjectsTab
