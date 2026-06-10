// src/pages/ProjectsPage.jsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaGithub, FaFilePdf, FaExternalLinkAlt, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { useData } from '../context/DataContext'
import { useTranslation } from 'react-i18next'
import VideoPanel from '../components/ui/VideoPanel/VideoPanel'

const ITEMS_PER_PAGE = 6

// Função auxiliar para ajustar os caminhos com o Base URL do Vite
const formatUrl = (url) => {
  if (!url) return ''
  if (url.startsWith('http://') || url.startsWith('https://')) return url
  const cleanUrl = url.startsWith('/') ? url.slice(1) : url
  return `${import.meta.env.BASE_URL}${cleanUrl}`
}

const PdfViewer = ({ url, title, onClose }) => (
  <AnimatePresence>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(16px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.94 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.94 }}
        transition={{ type: 'spring', damping: 28, stiffness: 300 }}
        className="relative w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl bg-white"
        style={{ height: '90vh' }}
        onClick={e => e.stopPropagation()}
      >
        <div
          className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-4 py-3"
          style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}
        >
          <span className="text-white text-sm font-medium truncate max-w-xs">{title}</span>
          <div className="flex items-center gap-2">
            <a href={url} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg"
              style={{ background: 'rgba(168,85,247,0.3)', color: '#d8b4fe', border: '1px solid rgba(168,85,247,0.4)' }}
            >
              <FaExternalLinkAlt size={10} /> Nova aba
            </a>
            <button onClick={onClose} className="w-7 h-7 rounded-full flex items-center justify-center text-white"
              style={{ background: 'rgba(255,255,255,0.1)' }}>
              <FaTimes size={12} />
            </button>
          </div>
        </div>
        <object data={url} type="application/pdf" className="w-full h-full pt-12" title={title}>
          <div className="flex flex-col items-center justify-center h-full gap-3 bg-gray-100">
            <p className="text-gray-500 text-sm">PDF não pôde ser exibido.</p>
            <a href={url} target="_blank" rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl text-sm font-semibold"
              style={{ background: 'var(--secondary)', color: '#fff' }}>
              Abrir PDF
            </a>
          </div>
        </object>
      </motion.div>
    </motion.div>
  </AnimatePresence>
)

const ProjectCard = ({ proj, lang, index }) => {
  const [pdfOpen, setPdfOpen] = useState(false)
  const formattedPdfUrl = formatUrl(proj.pdf)

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-2xl overflow-hidden group transition-all duration-300 card-shadow w-full max-w-md mx-auto sm:max-w-none"
        style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
        onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-glow)'}
        onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
      >
        <VideoPanel videoId={proj.videoId} />
        <div className="p-4 sm:p-5">
          <h2 className="font-display font-bold text-lg mb-1" style={{ color: 'var(--primary)' }}>
            {proj.titulo?.[lang] || proj.titulo?.pt}
          </h2>
          <p className="text-xs mb-2" style={{ color: 'var(--text-muted)' }}>
            {proj.subtitulo?.[lang] || proj.subtitulo?.pt}
          </p>
          <p className="text-sm leading-relaxed mb-4 line-clamp-3 preserve-linebreaks"
            style={{ color: 'var(--text-muted)' }}>
            {proj.descricao?.[lang] || proj.descricao?.pt}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {proj.tags?.map(tag => (
              <span key={tag} className="text-[10px] px-2.5 py-1 rounded-full font-medium"
                style={{ background: 'var(--bg-card-2)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}>
                {tag}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {proj.github && (
              <a href={proj.github} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-lg transition-all duration-200"
                style={{ color: 'var(--text-muted)', border: '1px solid var(--border)', background: 'var(--bg-card-2)' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
              >
                <FaGithub size={13} /> GitHub
              </a>
            )}
            {proj.pdf && (
              <button
                onClick={() => setPdfOpen(true)}
                className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-lg transition-all duration-200"
                style={{
                  color: 'var(--secondary)',
                  border: '1px solid rgba(168,85,247,0.25)',
                  background: 'rgba(168,85,247,0.06)',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(168,85,247,0.12)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(168,85,247,0.06)'}
              >
                <FaFilePdf size={13} /> Documentação
              </button>
            )}
          </div>
        </div>
      </motion.div>

      {pdfOpen && (
        <PdfViewer
          url={formattedPdfUrl}
          title={proj.titulo?.[lang] || proj.titulo?.pt}
          onClose={() => setPdfOpen(false)}
        />
      )}
    </>
  )
}

const ProjectsPage = () => {
  const { data } = useData()
  const { i18n, t } = useTranslation()
  const lang = i18n.language
  const projetos = data.projects || []
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(projetos.length / ITEMS_PER_PAGE)
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE
  const displayedProjects = projetos.slice(startIdx, startIdx + ITEMS_PER_PAGE)

  const goToPage = (page) => {
    setCurrentPage(Math.min(totalPages, Math.max(1, page)))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 min-h-screen"
      style={{ background: 'var(--bg)' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs font-display font-bold tracking-widest uppercase mb-3" style={{ color: 'var(--primary)' }}>Portfolio</p>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight mb-3" style={{ color: 'var(--text)' }}>
            {t('projects.title')}
          </h1>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{t('projects.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayedProjects.map((proj, i) => (
            <ProjectCard key={proj.id} proj={proj} lang={lang} index={i} />
          ))}
        </div>

        {/* Paginação */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-10">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="w-9 h-9 rounded-lg flex items-center justify-center transition-all disabled:opacity-30"
              style={{ border: '1px solid var(--border)', color: 'var(--text-muted)' }}
            >
              <FaChevronLeft size={12} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className="w-9 h-9 rounded-lg text-sm font-medium transition-all"
                style={{
                  background: currentPage === page ? 'var(--primary)' : 'transparent',
                  color: currentPage === page ? '#000' : 'var(--text-muted)',
                  border: currentPage === page ? 'none' : '1px solid var(--border)',
                }}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="w-9 h-9 rounded-lg flex items-center justify-center transition-all disabled:opacity-30"
              style={{ border: '1px solid var(--border)', color: 'var(--text-muted)' }}
            >
              <FaChevronRight size={12} />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default ProjectsPage