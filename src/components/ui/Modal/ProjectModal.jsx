// src/components/ui/Modal/ProjectModal.jsx
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes, FaChevronLeft, FaChevronRight, FaGithub, FaFilePdf, FaExternalLinkAlt } from 'react-icons/fa'
import VideoPanel from '../VideoPanel/VideoPanel'

// ─── Inline PDF viewer ───────────────────────────────────────────────────────
const PdfViewer = ({ url, title }) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-xl font-medium transition-all duration-200 hover:scale-[1.02]"
        style={{
          background: 'rgba(168,85,247,0.08)',
          color: 'var(--secondary)',
          border: '1px solid rgba(168,85,247,0.25)',
        }}
      >
        <FaFilePdf size={14} /> Documentação PDF
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(16px)' }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1,    opacity: 1 }}
              exit={{    scale: 0.94, opacity: 0 }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="relative w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl bg-white"
              style={{ height: '90vh' }}
              onClick={e => e.stopPropagation()}
            >
              {/* Header bar */}
              <div
                className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-4 py-3"
                style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}
              >
                <div className="flex items-center gap-2">
                  <FaFilePdf size={14} style={{ color: 'var(--secondary)' }} />
                  <span className="text-white text-sm font-medium truncate max-w-xs">{title}</span>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg font-medium transition-all"
                    style={{ background: 'rgba(168,85,247,0.3)', color: '#d8b4fe', border: '1px solid rgba(168,85,247,0.4)' }}
                  >
                    <FaExternalLinkAlt size={10} /> Abrir em nova aba
                  </a>
                  <button
                    onClick={() => setOpen(false)}
                    className="w-7 h-7 rounded-full flex items-center justify-center text-white transition-all"
                    style={{ background: 'rgba(255,255,255,0.1)' }}
                  >
                    <FaTimes size={12} />
                  </button>
                </div>
              </div>

              <object
                data={url}
                type="application/pdf"
                className="w-full h-full pt-12"
                title={title}
              >
                {/* Fallback */}
                <div className="flex flex-col items-center justify-center h-full gap-4 bg-gray-100">
                  <FaFilePdf size={40} style={{ color: 'var(--secondary)' }} />
                  <p className="text-gray-600 text-sm">Não foi possível exibir o PDF no navegador.</p>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold"
                    style={{ background: 'var(--secondary)', color: '#fff' }}
                  >
                    <FaExternalLinkAlt size={12} /> Baixar / Abrir PDF
                  </a>
                </div>
              </object>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// ─── Main modal ──────────────────────────────────────────────────────────────
const ProjectModal = ({ project, onClose, onPrev, onNext, hasPrev, hasNext, lang, t, currentIndex, total, goTo }) => {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft')  onPrev()
      if (e.key === 'ArrowRight') onNext()
      if (e.key === 'Escape')     onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onPrev, onNext, onClose])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  if (!project) return null

  const title = project.titulo?.[lang] || project.titulo?.pt || ''

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4"
        style={{ background: 'rgba(0,0,0,0.82)', backdropFilter: 'blur(14px)' }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 18 }}
          animate={{ scale: 1,    opacity: 1, y: 0 }}
          exit={{    scale: 0.92, opacity: 0, y: 18 }}
          transition={{ type: 'spring', damping: 28, stiffness: 320 }}
          className="relative rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border-glow)' }}
          onClick={e => e.stopPropagation()}
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-all"
            style={{ background: 'rgba(0,0,0,0.35)', color: 'var(--text-muted)' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
          >
            <FaTimes size={13} />
          </button>

          {/* Prev / Next arrows */}
          {(hasPrev || hasNext) && (
            <>
              <button
                onClick={onPrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full flex items-center justify-center transition-all"
                style={{ background: 'rgba(0,0,0,0.45)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--primary)'; e.currentTarget.style.borderColor = 'var(--border-glow)' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border)' }}
              >
                <FaChevronLeft size={13} />
              </button>
              <button
                onClick={onNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full flex items-center justify-center transition-all"
                style={{ background: 'rgba(0,0,0,0.45)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--primary)'; e.currentTarget.style.borderColor = 'var(--border-glow)' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border)' }}
              >
                <FaChevronRight size={13} />
              </button>
            </>
          )}

          <div className="p-5 sm:p-6 pt-10">
            {/* Header */}
            <h2
              className="font-display font-bold text-2xl mb-1"
              style={{ color: 'var(--primary)' }}
            >
              {title}
            </h2>
            <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
              {project.subtitulo?.[lang] || project.subtitulo?.pt}
            </p>

            {/* Video */}
            <div className="mb-5">
              <VideoPanel videoId={project.videoId} />
            </div>

            {/* Description */}
            <p
              className="text-sm leading-relaxed mb-5 preserve-linebreaks"
              style={{ color: 'var(--text)' }}
            >
              {project.descricao?.[lang] || project.descricao?.pt}
            </p>

            {/* Tags */}
            {project.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-5">
                {project.tags.map(tag => (
                  <span
                    key={tag}
                    className="text-[11px] px-3 py-1 rounded-full font-medium"
                    style={{
                      border: '1px solid var(--border-glow)',
                      color: 'var(--primary)',
                      background: 'rgba(0,238,255,0.05)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Action buttons */}
            <div className="flex flex-wrap gap-2">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-xl font-medium transition-all duration-200"
                  style={{
                    background: 'var(--bg-card-2)',
                    color: 'var(--text-muted)',
                    border: '1px solid var(--border)',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                >
                  <FaGithub size={15} /> GitHub
                </a>
              )}

              {/* PDF button — optional */}
              {project.pdf && <PdfViewer url={project.pdf} title={title} />}
            </div>
          </div>

          {/* Dot nav */}
          {total > 1 && (
            <div className="flex justify-center gap-1.5 pb-5 pt-1">
              {Array.from({ length: total }).map((_, i) => (
                <button key={i} onClick={() => goTo(i)}>
                  <span
                    className="block rounded-full transition-all duration-300"
                    style={{
                      width:      i === currentIndex ? '18px' : '6px',
                      height:     '6px',
                      background: i === currentIndex ? 'var(--primary)' : 'var(--border)',
                    }}
                  />
                </button>
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default ProjectModal
