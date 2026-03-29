import { useEffect, useState } from 'react'

export default function Modal({ movie, onClose }) {
  const [added, setAdded] = useState(false)

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  if (!movie) return null

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'rgba(0,0,0,0.85)',
        backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 24,
      }}
    >
      <div style={{
        background: 'var(--surface)',
        borderRadius: 16, width: '100%', maxWidth: 800,
        border: '1px solid var(--border)',
        maxHeight: '90vh', overflowY: 'auto',
        animation: 'modalIn 0.3s ease both',
      }}>
        <style>{`
          @keyframes modalIn {
            from { opacity: 0; transform: scale(0.94) translateY(20px); }
            to   { opacity: 1; transform: scale(1) translateY(0); }
          }
        `}</style>

        {/* Video */}
        <div style={{ width: '100%', aspectRatio: '16/9', background: '#000' }}>
          <iframe
            width="100%" height="100%"
            src={`https://www.youtube.com/embed/${movie.trailerKey}?autoplay=1&rel=0`}
            allow="autoplay; encrypted-media"
            allowFullScreen
            style={{ border: 'none' }}
          />
        </div>

        {/* Body */}
        <div style={{ padding: 28 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
            <h2 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 32, letterSpacing: 2, color: 'white',
            }}>{movie.title}</h2>
            <button onClick={onClose} style={{
              width: 36, height: 36,
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid var(--border)',
              borderRadius: '50%', cursor: 'pointer',
              color: 'var(--text)', fontSize: 18,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>&#10005;</button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16, flexWrap: 'wrap' }}>
            <span style={{ color: '#fbbf24', fontSize: 14, fontWeight: 600 }}>
              &#9733; {movie.rating}
            </span>
            <span style={{
              background: 'rgba(13,148,136,0.2)',
              border: '1px solid rgba(13,148,136,0.3)',
              borderRadius: 4, padding: '2px 8px',
              fontSize: 11, color: 'var(--teal-light)', fontWeight: 600,
            }}>{movie.genre}</span>
            <span style={{ fontSize: 13, color: 'var(--muted)' }}>{movie.year}</span>
          </div>

          <p style={{
            fontSize: 14, lineHeight: 1.7,
            color: 'rgba(226,232,240,0.75)',
            marginBottom: 24,
          }}>{movie.description}</p>

          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={onClose} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              background: 'var(--teal)', color: 'white', border: 'none',
              padding: '12px 24px', borderRadius: 10,
              fontSize: 14, fontWeight: 600, cursor: 'pointer',
            }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3"/>
              </svg>
              Watch Now
            </button>
            <button onClick={() => setAdded(true)} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              background: added ? 'rgba(13,148,136,0.2)' : 'rgba(255,255,255,0.1)',
              color: added ? 'var(--teal-light)' : 'white',
              border: `1px solid ${added ? 'rgba(13,148,136,0.4)' : 'rgba(255,255,255,0.15)'}`,
              padding: '12px 20px', borderRadius: 10,
              fontSize: 14, fontWeight: 500, cursor: 'pointer',
            }}>
              {added ? '✓ Added' : '+ My List'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
