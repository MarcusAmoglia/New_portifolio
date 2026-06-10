// src/pages/CertificationsPage.jsx
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { useData } from '../context/DataContext'
import { useTranslation } from 'react-i18next'

const ITEMS_PER_PAGE = 6

const PdfModal = ({ certifications, currentIndex, onClose, lang }) => {
  const [index, setIndex] = useState(currentIndex)
  const currentCert = certifications[index]
  const total = certifications.length
  const goPrev = () => setIndex(prev => (prev - 1 + total) % total)
  const goNext = () => setIndex(prev => (prev + 1) % total)

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [index])

  if (!currentCert) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.95)' }} onClick={onClose}>
      <div className="relative w-full h-full max-w-6xl max-h-[95vh] rounded-2xl overflow-hidden shadow-2xl bg-white" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.1)' }}>
          <FaTimes size={14} style={{ color: '#333' }} />
        </button>
        {total > 1 && (
          <>
            <button onClick={goPrev} className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.5)', color: '#fff' }}><FaChevronLeft /></button>
            <button onClick={goNext} className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.5)', color: '#fff' }}><FaChevronRight /></button>
          </>
        )}
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/50 to-transparent p-4 z-10 pointer-events-none">
          <h2 className="text-white text-sm font-semibold truncate">{currentCert.title?.[lang] || currentCert.title?.pt}</h2>
        </div>
        {total > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-1.5 px-4 py-2 rounded-full" style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}>
            {certifications.map((_, i) => (
              <button key={i} onClick={() => setIndex(i)}>
                <span className="block rounded-full transition-all" style={{ width: i === index ? '18px' : '6px', height: '6px', background: i === index ? 'var(--primary)' : 'rgba(255,255,255,0.4)' }} />
              </button>
            ))}
          </div>
        )}
        <object data={currentCert.pdf} type="application/pdf" className="w-full h-full" title={currentCert.title?.[lang] || currentCert.title?.pt}>
          <p className="text-center text-red-500 mt-20">Não foi possível exibir o PDF. <a href={currentCert.pdf} target="_blank" className="underline">Clique aqui</a></p>
        </object>
      </div>
    </div>
  )
}

const CertCard = ({ cert, lang, t, onOpen, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.55, delay: index * 0.08 }}
    className="rounded-2xl overflow-hidden group transition-all duration-300"
    style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
    onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-glow)'}
    onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
  >
    <div className="aspect-video relative cursor-pointer overflow-hidden" onClick={() => onOpen(index)}>
      <img
        src={cert.preview}
        alt={cert.title?.[lang] || cert.title?.pt}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        onError={e => { e.target.src = 'https://placehold.co/400x225/0d0d1a/00eeff?text=Certificado' }}
      />
      <div className="absolute inset-0 flex items-center justify-center transition-all" style={{ background: 'rgba(0,0,0,0.3)' }}>
        <span className="text-white text-xs px-3 py-1.5 rounded-full" style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.15)' }}>Ver →</span>
      </div>
    </div>
    <div className="p-5">
      <h2 className="font-display font-bold text-base leading-snug mb-1" style={{ color: 'var(--text)' }}>
        {cert.title?.[lang] || cert.title?.pt}
      </h2>
      <p className="text-xs mb-3" style={{ color: 'var(--text-muted)' }}>{cert.issuer?.[lang] || cert.issuer?.pt}</p>
      <div className="flex items-center justify-between">
        <div className="flex gap-3 text-xs" style={{ color: 'var(--text-subtle)' }}>
          <span>{cert.hours}h</span><span>·</span><span>{cert.year}</span>
        </div>
        <button
          onClick={() => onOpen(index)}
          className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-all"
          style={{ background: 'rgba(0,238,255,0.08)', color: 'var(--primary)', border: '1px solid var(--border-glow)' }}
        >
          {t('certifications.view_certificate')}
        </button>
      </div>
    </div>
  </motion.div>
)

const CertificationsPage = () => {
  const { data } = useData()
  const { i18n, t } = useTranslation()
  const lang = i18n.language
  const certifications = data.certifications || []
  const [modalIndex, setModalIndex] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(certifications.length / ITEMS_PER_PAGE)
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE
  const displayedCerts = certifications.slice(startIdx, startIdx + ITEMS_PER_PAGE)

  const goToPage = (page) => {
    setCurrentPage(Math.min(totalPages, Math.max(1, page)))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 min-h-screen"
      style={{ background: 'var(--bg)' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs font-display font-bold tracking-widest uppercase mb-3" style={{ color: 'var(--primary)' }}>Certified</p>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight mb-3" style={{ color: 'var(--text)' }}>
            {t('certifications.title')}
          </h1>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{t('certifications.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayedCerts.map((cert, idx) => (
            <CertCard key={idx} cert={cert} lang={lang} t={t} index={idx} onOpen={(i) => setModalIndex(startIdx + i)} />
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

        <div className="flex items-center justify-center gap-2 mt-8 text-[10px]" style={{ color: 'var(--text-subtle)' }}>
          <kbd className="px-2 py-0.5 rounded" style={{ background: 'var(--border)' }}>←</kbd>
          <kbd className="px-2 py-0.5 rounded" style={{ background: 'var(--border)' }}>→</kbd>
          <kbd className="px-2 py-0.5 rounded" style={{ background: 'var(--border)' }}>ESC</kbd>
          <span>navegar/fechar</span>
        </div>
      </div>

      {modalIndex !== null && (
        <PdfModal certifications={certifications} currentIndex={modalIndex} lang={lang} onClose={() => setModalIndex(null)} />
      )}
    </motion.div>
  )
}

export default CertificationsPage