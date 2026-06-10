import { useState, useEffect, useCallback } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { useData } from '../../../context/DataContext'
import { useTranslation } from 'react-i18next'
import ProjectModal from '../Modal/ProjectModal'
import MobileJTAGCarousel from './MobileJTAGCarousel'

const mod = (n, m) => ((n % m) + m) % m

const getSlotStyle = (offset, screenWidth) => {
  const absOff = Math.abs(offset)
  if (absOff > 2) return null
  const cardWidth = screenWidth < 640 ? 200 : screenWidth < 1024 ? 220 : 256
  const translateX = offset * (screenWidth < 640 ? 22 : 38)
  const translateY = absOff * absOff * (screenWidth < 640 ? 4 : 8)
  const translateZ = -(absOff * (screenWidth < 640 ? 80 : 120))
  const rotateY = offset * -28
  const scale = 1 - absOff * 0.18
  return {
    transform: `translateX(${translateX}%) translateY(${translateY}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
    opacity: absOff === 0 ? 1 : absOff === 1 ? 0.75 : 0.4,
    zIndex: 10 - absOff,
    width: `${cardWidth}px`,
    marginLeft: `-${cardWidth / 2}px`,
  }
}

const CarouselCard = ({ proj, isActive, lang }) => (
  <div
    className="rounded-2xl overflow-hidden transition-all duration-500"
    style={{
      background: 'var(--bg-card)',
      border: `1px solid ${isActive ? 'var(--border-glow)' : 'var(--border)'}`,
      boxShadow: isActive ? 'var(--shadow-glow)' : 'none',
    }}
  >
    <div className="relative h-40" style={{ background: '#000' }}>
      {proj.videoId
        ? <img src={`https://img.youtube.com/vi/${proj.videoId}/maxresdefault.jpg`} alt={proj.titulo?.[lang] || proj.titulo?.pt} className="w-full h-full object-cover" />
        : <div className="w-full h-full flex items-center justify-center"><span className="text-3xl" style={{ color: 'var(--text-subtle)' }}>◇</span></div>
      }
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, var(--bg-card), transparent)' }} />
      {isActive && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(0,0,0,0.65)', border: '1px solid var(--border-glow)', backdropFilter: 'blur(6px)' }}>
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 ml-0.5" style={{ color: 'var(--primary)' }}>
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </div>
        </div>
      )}
    </div>
    <div className="p-4">
      <p className="text-[10px] font-display font-bold uppercase tracking-wider mb-0.5" style={{ color: proj.cor || 'var(--primary)' }}>{proj.ano}</p>
      <h4 className="font-display font-bold text-sm leading-tight" style={{ color: 'var(--text)' }}>{proj.titulo?.[lang] || proj.titulo?.pt}</h4>
      <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{proj.subtitulo?.[lang] || proj.subtitulo?.pt}</p>
    </div>
  </div>
)

const DesktopJTAGCarousel = () => {
  const { data } = useData()
  const { i18n, t } = useTranslation()
  const lang = i18n.language
  const projetos = data.projects || []
  const total = projetos.length
  const [active, setActive] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const [screenWidth, setScreenWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024)

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const prev = useCallback(() => setActive(p => (p - 1 + total) % total), [total])
  const next = useCallback(() => setActive(p => (p + 1) % total), [total])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'Enter' && !modalOpen) setModalOpen(true)
      if (e.key === 'Escape' && modalOpen) setModalOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [prev, next, modalOpen])

  if (total === 0) return null

  return (
    <div className="w-full">
      <div className="relative h-[270px] sm:h-[290px] lg:h-[310px]" style={{ perspective: '1000px' }}>
        {projetos.map((proj, i) => {
          const offset = mod(i - active + Math.floor(total / 2), total) - Math.floor(total / 2)
          const style = getSlotStyle(offset, screenWidth)
          if (!style) return null
          const isActive = offset === 0
          return (
            <div
              key={proj.id}
              onClick={() => { if (isActive) setModalOpen(true); else setActive(i) }}
              className="absolute left-1/2 top-0 cursor-pointer transition-all duration-500"
              style={style}
              role="button"
            >
              <CarouselCard proj={proj} isActive={isActive} lang={lang} />
              {isActive && (
                <p className="text-center text-xs mt-1.5 font-medium" style={{ color: 'var(--primary)' }}>
                  {t('buttons.view_details')}
                </p>
              )}
            </div>
          )
        })}
      </div>

      <div className="flex flex-col items-center justify-center mt-2 space-y-2">
        <div className="flex items-center gap-5">
          <button
            onClick={prev}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
            style={{ border: '1px solid var(--border)', color: 'var(--text-muted)' }}
          >
            <FaChevronLeft size={12} />
          </button>
          <div className="flex gap-1.5">
            {projetos.map((_, i) => (
              <button key={i} onClick={() => setActive(i)}>
                <span
                  className="block rounded-full transition-all duration-300"
                  style={{
                    width: i === active ? '18px' : '6px',
                    height: '6px',
                    background: i === active ? 'var(--primary)' : 'var(--border)',
                  }}
                />
              </button>
            ))}
          </div>
          <button
            onClick={next}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
            style={{ border: '1px solid var(--border)', color: 'var(--text-muted)' }}
          >
            <FaChevronRight size={12} />
          </button>
        </div>
        <p className="text-[10px] flex items-center gap-1" style={{ color: 'var(--text-subtle)' }}>
          <kbd className="px-1.5 py-0.5 rounded text-[9px]" style={{ background: 'var(--border)', color: 'var(--text-muted)' }}>←</kbd>
          <kbd className="px-1.5 py-0.5 rounded text-[9px]" style={{ background: 'var(--border)', color: 'var(--text-muted)' }}>→</kbd>
          <kbd className="px-1.5 py-0.5 rounded text-[9px]" style={{ background: 'var(--border)', color: 'var(--text-muted)' }}>Enter</kbd>
          <span>{t('carousel.keyboard_hint')}</span>
        </p>
      </div>

      {modalOpen && (
        <ProjectModal
          project={projetos[active]}
          onClose={() => setModalOpen(false)}
          onPrev={prev}
          onNext={next}
          hasPrev={total > 1}
          hasNext={total > 1}
          lang={lang}
          t={t}
          currentIndex={active}
          total={total}
          goTo={setActive}
        />
      )}
    </div>
  )
}

// Componente principal que decide qual versão usar
const JTAGCarousel = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return isMobile ? <MobileJTAGCarousel /> : <DesktopJTAGCarousel />
}

export default JTAGCarousel