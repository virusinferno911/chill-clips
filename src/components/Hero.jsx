import { useState, useEffect } from 'react'
import { movies } from '../data/movies'

export default function Hero({ onPlay }) {
  const [idx, setIdx] = useState(0)
  const m = movies[idx]

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % 5), 6000)
    return () => clearInterval(t)
  }, [])

  return (
    <section style={{
      position: 'relative', height: '92vh', minHeight: 600,
      display: 'flex', alignItems: 'flex-end',
      padding: '0 48px 80px', overflow: 'hidden',
    }}>
      {/* BG */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url('${m.banner}')`,
        backgroundSize: 'cover', backgroundPosition: 'center top',
        filter: 'brightness(0.4)',
        transition: 'background-image 0.8s ease',
      }} />

      {/* Gradient */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `
          linear-gradient(to right, rgba(8,12,12,0.95) 0%, rgba(8,12,12,0.5) 45%, transparent 70%),
          linear-gradient(to top, rgba(8,12,12,1) 0%, rgba(8,12,12,0.3) 30%, transparent 60%)
        `,
      }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, maxWidth: 560 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          background: 'rgba(13,148,136,0.2)',
          border: '1px solid rgba(13,148,136,0.4)',
          borderRadius: 20, padding: '4px 12px',
          fontSize: 11, fontWeight: 600,
          color: 'var(--teal-light)', letterSpacing: 1,
          textTransform: 'uppercase', marginBottom: 16,
        }}>&#9733; Featured Tonight</div>

        <h1 style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 'clamp(48px, 7vw, 80px)',
          lineHeight: 1, letterSpacing: 2,
          color: 'white', marginBottom: 14,
        }}>{m.title}</h1>

        <div style={{
          display: 'flex', alignItems: 'center', gap: 12,
          marginBottom: 14, flexWrap: 'wrap',
        }}>
          <span style={{ color: '#fbbf24', fontSize: 14, fontWeight: 600 }}>
            &#9733; {m.rating}
          </span>
          <span style={{ width: 3, height: 3, background: 'var(--muted)', borderRadius: '50%', display: 'inline-block' }} />
          <span style={{ fontSize: 13, color: 'var(--muted)' }}>{m.year}</span>
          <span style={{ width: 3, height: 3, background: 'var(--muted)', borderRadius: '50%', display: 'inline-block' }} />
          <span style={{ fontSize: 13, color: 'var(--muted)' }}>{m.genre}</span>
        </div>

        <p style={{
          fontSize: 15, lineHeight: 1.7,
          color: 'rgba(226,232,240,0.8)',
          marginBottom: 28,
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>{m.description}</p>

        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          <button onClick={() => onPlay(idx)} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            background: 'var(--teal)', color: 'white', border: 'none',
            padding: '14px 28px', borderRadius: 10,
            fontSize: 15, fontWeight: 600, cursor: 'pointer',
          }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
            Play Now
          </button>
          <button onClick={() => onPlay(idx)} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            background: 'rgba(255,255,255,0.1)',
            color: 'white', border: '1px solid rgba(255,255,255,0.15)',
            padding: '14px 24px', borderRadius: 10,
            fontSize: 15, fontWeight: 500, cursor: 'pointer',
          }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 16v-4M12 8h.01"/>
            </svg>
            More Info
          </button>
        </div>
      </div>
    </section>
  )
}
