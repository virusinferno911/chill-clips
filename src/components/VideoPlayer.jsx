import { useEffect } from 'react'

export default function VideoPlayer({ movie, onClose }) {
  useEffect(() => {
    const fn = e => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', fn)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', fn)
      document.body.style.overflow = ''
    }
  }, [onClose])

  if (!movie) return null

  const hasVideo = movie.fullMovieLink && movie.fullMovieLink.trim() !== ''

  return (
    <div
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
      style={{
        position: 'fixed', inset: 0, zIndex: 300,
        background: 'rgba(0,0,0,0.98)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '16px',
      }}
    >
      {/* Top bar */}
      <div style={{
        width: '100%', maxWidth: 960,
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', marginBottom: 12,
        flexWrap: 'wrap', gap: 8,
      }}>
        <div style={{ minWidth: 0 }}>
          <div style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(16px, 4vw, 22px)',
            letterSpacing: 2, color: 'white',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>{movie.title}</div>
          <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>
            {movie.year}
            {movie.genre && <> &middot; {movie.genre}</>}
            {movie.rating && <> &middot; &#9733; {movie.rating}</>}
            {movie.isSeries && movie.seasons && <> &middot; {movie.seasons} Season{movie.seasons > 1 ? 's' : ''}</>}
          </div>
        </div>
        <button onClick={onClose} style={{
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid var(--border)',
          borderRadius: 8, padding: '8px 16px',
          color: 'white', cursor: 'pointer', fontSize: 13,
          display: 'flex', alignItems: 'center', gap: 6,
          flexShrink: 0,
          transition: 'background .2s',
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
        onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
        >
          &#10005; Close
        </button>
      </div>

      {/* Video player */}
      <div style={{
        width: '100%', maxWidth: 960,
        borderRadius: 12, overflow: 'hidden',
        border: '1px solid var(--border)',
        boxShadow: '0 32px 80px rgba(0,0,0,0.8)',
        background: '#000',
      }}>
        {hasVideo ? (
          <video
            src={movie.fullMovieLink}
            controls
            autoPlay
            style={{ width: '100%', display: 'block', maxHeight: '65vh' }}
          >
            Your browser does not support HTML5 video.
          </video>
        ) : (
          /* Placeholder when no fullMovieLink is set yet */
          <div style={{
            width: '100%',
            aspectRatio: '16/9',
            maxHeight: '65vh',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            background: 'linear-gradient(135deg, #0a1a1a 0%, #0f1a1a 50%, #0a1510 100%)',
            gap: 16,
          }}>
            {/* Animated play icon */}
            <div style={{
              width: 80, height: 80,
              background: 'rgba(13,148,136,0.15)',
              border: '2px solid rgba(13,148,136,0.4)',
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 32,
              animation: 'glowPulse 3s ease-in-out infinite',
            }}>
              ▶
            </div>
            <div style={{ textAlign: 'center', padding: '0 24px' }}>
              <div style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 20, letterSpacing: 2, color: 'var(--teal-light)',
                marginBottom: 8,
              }}>VIDEO COMING SOON</div>
              <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6 }}>
                The full movie link for <strong style={{ color: 'white' }}>{movie.title}</strong> hasn't been added yet.
                <br />Add a <code style={{ color: 'var(--teal-light)', fontSize: 12 }}>fullMovieLink</code> in your MongoDB to enable playback.
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom info */}
      <div style={{
        width: '100%', maxWidth: 960,
        marginTop: 14, padding: '0 4px',
      }}>
        <p style={{
          fontSize: 13, color: 'rgba(226,232,240,0.55)',
          lineHeight: 1.6,
          display: '-webkit-box',
          WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>{movie.description}</p>
      </div>
    </div>
  )
}
