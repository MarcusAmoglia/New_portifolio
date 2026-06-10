// src/components/sections/CertificationsSection.jsx
import { useState, useRef, useEffect } from 'react'
import { useData } from '../../context/DataContext'
import { useTranslation } from 'react-i18next'
import { FaTimes, FaExternalLinkAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { motion } from 'framer-motion'

const formatUrl = (url) => {
  if (!url) return ''
  if (url.startsWith('http://') || url.startsWith('https://')) return url
  const cleanUrl = url.startsWith('/') ? url.slice(1) : url
  return `${import.meta.env.BASE_URL}${cleanUrl}`
}

const PdfModal = ({ cert, onClose, lang }) => {
  if (!cert) return null
  
  const formattedPdfUrl = formatUrl(cert.pdf)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.95)' }} onClick={onClose}>
      <div className="relative w-full h-full max-w-5xl max-h-[92vh] rounded-2xl overflow-hidden shadow-2xl bg-white" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.1)' }}>
          <FaTimes size={14} style={{ color: '#333' }} />
        </button>
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/40 to-transparent p-4 z-10 pointer-events-none">
          <h2 className="text-white text-sm font-semibold truncate">{cert.title?.[lang] || cert.title?.pt}</h2>
        </div>
        <object data={formattedPdfUrl} type="application/pdf" className="w-full h-full" title={cert.title?.[lang] || cert.title?.pt}>
          <div className="flex flex-col items-center justify-center h-full gap-4">
            <p className="text-gray-600">Não foi possível exibir o PDF.</p>
            <a href={formattedPdfUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold" style={{ background: 'var(--primary)', color: '#000' }}>
              <FaExternalLinkAlt size={12} /> Abrir PDF
            </a>
          </div>
        </object>
      </div>
    </div>
  )
}

const CertificationsSection = () => {
  const { data } = useData()
  const { i18n, t } = useTranslation()
  const lang = i18n.language
  const certifications = data.certifications || []
  const [selectedCert, setSelectedCert] = useState(null)
  const scrollRef = useRef(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)

  const checkScroll = () => {
    if (!scrollRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
    setShowLeftArrow(scrollLeft > 20)
    setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 20)
  }

  const scroll = (direction) => {
    if (!scrollRef.current) return
    const amount = direction === 'left' ? -300 : 300
    scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' })
    setTimeout(checkScroll, 300)
  }

  useEffect(() => {
    checkScroll()
    window.addEventListener('resize', checkScroll)
    return () => window.removeEventListener('resize', checkScroll)
  }, [certifications])

  if (certifications.length === 0) return null

  return (
    <section id="certificacoes" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="section-divider mb-24" />
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="mb-14 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-display font-bold tracking-widest uppercase mb-3" style={{ color: 'var(--primary)' }}>
            Certified
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight" style={{ color: 'var(--text)' }}>
            {t('certifications.title')}
          </h2>
          <p className="text-sm mt-2" style={{ color: 'var(--text-muted)' }}>{t('certifications.subtitle')}</p>
        </motion.div>

        {/* Carrossel horizontal */}
        <div className="relative">
          {showLeftArrow && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full flex items-center justify-center bg-black/50 backdrop-blur-sm transition hover:scale-110"
              style={{ border: '1px solid var(--border)', color: 'var(--text-muted)' }}
            >
              <FaChevronLeft size={12} />
            </button>
          )}
          {showRightArrow && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full flex items-center justify-center bg-black/50 backdrop-blur-sm transition hover:scale-110"
              style={{ border: '1px solid var(--border)', color: 'var(--text-muted)' }}
            >
              <FaChevronRight size={12} />
            </button>
          )}

          <div
            ref={scrollRef}
            onScroll={checkScroll}
            className="flex overflow-x-auto gap-5 pb-4 scroll-smooth snap-x snap-mandatory"
            style={{ scrollbarWidth: 'thin', WebkitOverflowScrolling: 'touch' }}
          >
            {certifications.map((cert, idx) => (
              <div
                key={idx}
                className="snap-start shrink-0 w-[280px] rounded-2xl overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
                onClick={() => setSelectedCert(cert)}
              >
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={formatUrl(cert.preview)}
                    alt={cert.title?.[lang] || cert.title?.pt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={e => { e.target.src = 'https://placehold.co/400x225/0d0d1a/00eeff?text=Certificado' }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition">
                    <span className="text-white text-xs px-3 py-1.5 rounded-full bg-black/60">Ver →</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-display font-bold text-sm leading-snug mb-1" style={{ color: 'var(--text)' }}>
                    {cert.title?.[lang] || cert.title?.pt}
                  </h3>
                  <p className="text-xs mb-2" style={{ color: 'var(--text-muted)' }}>{cert.issuer?.[lang] || cert.issuer?.pt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-3 text-xs" style={{ color: 'var(--text-subtle)' }}>
                      <span>{cert.hours}h</span>
                      <span>·</span>
                      <span>{cert.year}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-1.5 mt-4">
          {certifications.map((_, i) => (
            <button key={i} onClick={() => {
              const cardWidth = 280 + 20
              scrollRef.current?.scrollTo({ left: i * cardWidth, behavior: 'smooth' })
            }}>
              <span
                className="block rounded-full transition-all"
                style={{
                  width: '6px',
                  height: '6px',
                  background: 'var(--border)',
                }}
              />
            </button>
          ))}
        </div>
      </div>

      {selectedCert && <PdfModal cert={selectedCert} lang={lang} onClose={() => setSelectedCert(null)} />}
    </section>
  )
}

export default CertificationsSection