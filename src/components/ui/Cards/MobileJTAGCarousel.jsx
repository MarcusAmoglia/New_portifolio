import { useRef, useState, useEffect } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { useData } from '../../../context/DataContext'
import { useTranslation } from 'react-i18next'
import ProjectModal from '../Modal/ProjectModal'

const MobileJTAGCarousel = () => {
  const { data } = useData()
  const { i18n, t } = useTranslation()
  const lang = i18n.language
  const projetos = data.projects || []
  const scrollRef = useRef(null)
  const [selectedIndex, setSelectedIndex] = useState(null)
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
    const amount = direction === 'left' ? -260 : 260
    scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' })
    setTimeout(checkScroll, 300)
  }

  useEffect(() => {
    checkScroll()
    window.addEventListener('resize', checkScroll)
    return () => window.removeEventListener('resize', checkScroll)
  }, [projetos])

  if (projetos.length === 0) return null

  return (
    <div className="w-full">
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
          className="flex overflow-x-auto gap-4 pb-4 scroll-smooth snap-x snap-mandatory"
          style={{ scrollbarWidth: 'thin', WebkitOverflowScrolling: 'touch' }}
        >
          {projetos.map((proj, idx) => (
            <div
              key={proj.id}
              className="snap-start shrink-0 w-[260px] rounded-2xl overflow-hidden cursor-pointer active:scale-95 transition-transform"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
              onClick={() => setSelectedIndex(idx)}
            >
              <div className="relative h-36">
                {proj.videoId ? (
                  <img
                    src={`https://img.youtube.com/vi/${proj.videoId}/mqdefault.jpg`}
                    alt={proj.titulo?.[lang] || proj.titulo?.pt}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-black/20">
                    <span className="text-2xl">◇</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <div className="p-3">
                <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: proj.cor || 'var(--primary)' }}>
                  {proj.ano}
                </p>
                <h4 className="font-bold text-sm mt-0.5" style={{ color: 'var(--text)' }}>
                  {proj.titulo?.[lang] || proj.titulo?.pt}
                </h4>
                <p className="text-xs text-muted line-clamp-2" style={{ color: 'var(--text-muted)' }}>
                  {proj.subtitulo?.[lang] || proj.subtitulo?.pt}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-1.5 mt-3">
        {projetos.map((_, i) => (
          <button key={i} onClick={() => {
            const cardWidth = 260 + 16
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

      {selectedIndex !== null && (
        <ProjectModal
          project={projetos[selectedIndex]}
          onClose={() => setSelectedIndex(null)}
          onPrev={() => setSelectedIndex((selectedIndex - 1 + projetos.length) % projetos.length)}
          onNext={() => setSelectedIndex((selectedIndex + 1) % projetos.length)}
          hasPrev={true}
          hasNext={true}
          lang={lang}
          t={t}
          currentIndex={selectedIndex}
          total={projetos.length}
          goTo={setSelectedIndex}
        />
      )}
    </div>
  )
}

export default MobileJTAGCarousel