// src/components/ui/VideoPanel/VideoPanel.jsx
import { useState } from 'react'

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 ml-0.5" style={{ color: 'var(--primary)' }}>
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
)

const VideoPanel = ({ videoId }) => {
  const [playing, setPlaying] = useState(false)

  if (!videoId) {
    return (
      <div className="w-full aspect-video rounded-xl flex items-center justify-center" style={{ background: 'var(--bg-card-2)' }}>
        <span className="text-xs" style={{ color: 'var(--text-subtle)' }}>Sem vídeo</span>
      </div>
    )
  }

  return (
    <div className="w-full rounded-xl overflow-hidden" style={{ background: '#000' }}>
      {!playing ? (
        <div className="relative aspect-video w-full group cursor-pointer" onClick={() => setPlaying(true)}>
          <img
            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
            alt="Thumbnail do vídeo"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={e => { e.target.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` }}
          />
          <div className="absolute inset-0 flex items-center justify-center transition-all" style={{ background: 'rgba(0,0,0,0.3)' }}>
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
              style={{ background: 'rgba(0,0,0,0.7)', border: '1px solid var(--border-glow)', backdropFilter: 'blur(8px)' }}
            >
              <PlayIcon />
            </div>
          </div>
        </div>
      ) : (
        <div className="aspect-video w-full">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      )}
    </div>
  )
}

export default VideoPanel
