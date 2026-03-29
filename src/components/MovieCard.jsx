import { useState } from 'react'

export default function MovieCard({ movie, globalIdx, onPlay }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onPlay(globalIdx)}
      style={{
        flexShrink: 0, width: 200,
        borderRadius: 10, overflow: 'hidden',
        background: 'var(--card)', cursor: 'pointer',
        border: `1px solid ${hovered ? 'var(--teal)' : 'transparent'}`,
        transform: hovered ? 'scale(1.06) translateY(-4px)' : 'scale(1)',
        boxShadow: hovered ? '0 20px 60px rgba(0,0,0,0.6)' : 'none',
        transition: 'transform 0.25s, box-shadow 0.25s, border-color 0.25s',
        position: 'relative', zIndex: hovered ? 2 : 1,
      }}
    >
      <div style={{ position: 'relative' }}>
        <img
          src={movie.poster}
          alt={movie.title}
          onError={e => {
            e.target.src = `https://placehold.co/200x290/0f1a1a/0d9488?text=${encodeURIComponent(movie.title)}`
          }}
          style={{ width: '100%', height: 290, objectFit: 'cover', display: 'block' }}
        />
        {/* Hover overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(8,12,12,0.95) 0%, transparent 50%)',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.25s',
          display: 'flex', flexDirection: 'column',
          justifyContent: 'flex-end', padding: 14,
        }}>
          <button style={{
            width: 40, height: 40, background: 'var(--teal)',
            borderRadius: '50%', border: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', marginBottom: 10,
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
          </button>
          <div style={{
            fontSize: 13, fontWeight: 600, color: 'white',
            marginBottom: 4, whiteSpace: 'nowrap',
            overflow: 'hidden', textOverflow: 'ellipsis',
          }}>{movie.title}</div>
          <div style={{ fontSize: 11, color: 'var(--teal-light)' }}>
            {movie.genre} &middot; {movie.year}
          </div>
        </div>
      </div>

      <div style={{ padding: 12 }}>
        <div style={{
          fontSize: 13, fontWeight: 600, color: 'var(--text)',
          marginBottom: 4, whiteSpace: 'nowrap',
          overflow: 'hidden', textOverflow: 'ellipsis',
        }}>{movie.title}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 11, color: '#fbbf24', fontWeight: 600 }}>
            &#9733; {movie.rating}
          </span>
          <span style={{ fontSize: 11, color: 'var(--muted)' }}>{movie.year}</span>
        </div>
      </div>
    </div>
  )
}
