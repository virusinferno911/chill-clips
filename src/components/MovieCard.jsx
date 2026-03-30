import { useState } from 'react'

export default function MovieCard({ movie, onPlayTrailer, onWatchFull }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flexShrink:0, width:196, borderRadius:10, overflow:'hidden',
        background:'var(--card)', cursor:'pointer',
        border:`1px solid ${hovered ? 'var(--teal)' : 'transparent'}`,
        transform: hovered ? 'scale(1.07) translateY(-5px)' : 'scale(1)',
        boxShadow: hovered ? '0 24px 64px rgba(0,0,0,0.7), 0 0 20px var(--teal-glow)' : 'none',
        transition:'transform .25s ease, box-shadow .25s ease, border-color .25s ease',
        position:'relative', zIndex: hovered ? 3 : 1,
      }}
    >
      {/* Poster */}
      <div style={{ position:'relative', overflow:'hidden' }}>
        <img
          src={movie.poster} alt={movie.title}
          onError={e => {
            e.target.src = `https://placehold.co/196x290/0f1a1a/0d9488?text=${encodeURIComponent(movie.title)}`
          }}
          style={{
            width:'100%', height:290, objectFit:'cover', display:'block',
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
            transition:'transform .35s ease',
          }}
        />

        {/* Overlay */}
        <div style={{
          position:'absolute', inset:0,
          background:'linear-gradient(to top, rgba(8,12,12,1) 0%, rgba(8,12,12,0.3) 40%, transparent 70%)',
          opacity: hovered ? 1 : 0,
          transition:'opacity .25s',
          display:'flex', flexDirection:'column',
          justifyContent:'flex-end', padding:12, gap:8,
        }}>
          {/* Action buttons */}
          <div style={{ display:'flex', gap:8 }}>
            <button
              onClick={e => { e.stopPropagation(); onPlayTrailer(movie) }}
              style={{
                flex:1, background:'var(--teal)', color:'white', border:'none',
                padding:'8px 0', borderRadius:6, fontSize:12, fontWeight:600,
                cursor:'pointer', display:'flex', alignItems:'center',
                justifyContent:'center', gap:5,
                transition:'background .2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background='var(--teal-light)'}
              onMouseLeave={e => e.currentTarget.style.background='var(--teal)'}
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
                <polygon points="5 3 19 12 5 21 5 3"/>
              </svg>
              Trailer
            </button>
            <button
              onClick={e => { e.stopPropagation(); onWatchFull(movie) }}
              style={{
                flex:1, background:'rgba(255,255,255,0.12)', color:'white',
                border:'1px solid rgba(255,255,255,0.2)',
                padding:'8px 0', borderRadius:6, fontSize:12, fontWeight:500,
                cursor:'pointer', display:'flex', alignItems:'center',
                justifyContent:'center', gap:5,
                transition:'background .2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.2)'}
              onMouseLeave={e => e.currentTarget.style.background='rgba(255,255,255,0.12)'}
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
                stroke="white" strokeWidth="2.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              Full
            </button>
          </div>

          <div style={{ fontSize:11, fontWeight:600, color:'white',
                        whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>
            {movie.title}
          </div>
        </div>

        {/* Rating badge */}
        <div style={{
          position:'absolute', top:8, right:8,
          background:'rgba(8,12,12,0.85)', backdropFilter:'blur(4px)',
          borderRadius:6, padding:'3px 7px',
          fontSize:11, fontWeight:700, color:'#fbbf24',
          opacity: hovered ? 1 : 0.9,
          transition:'opacity .2s',
        }}>&#9733; {movie.rating}</div>
      </div>

      {/* Info */}
      <div style={{ padding:'10px 12px 12px' }}>
        <div style={{
          fontSize:13, fontWeight:600, color:'var(--text)',
          whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis',
          marginBottom:4,
        }}>{movie.title}</div>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <span style={{
            background:'rgba(13,148,136,0.15)', border:'1px solid rgba(13,148,136,0.25)',
            borderRadius:4, padding:'1px 6px', fontSize:10,
            color:'var(--teal-light)', fontWeight:600,
          }}>{movie.genre}</span>
          <span style={{ fontSize:11, color:'var(--muted)' }}>{movie.year}</span>
        </div>
      </div>
    </div>
  )
}
