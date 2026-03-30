import { useEffect, useState } from 'react'

export default function TrailerModal({ movie, onClose, onWatchFull }) {
  const [added, setAdded] = useState(false)

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

  return (
    <div onClick={e => { if (e.target === e.currentTarget) onClose() }} style={{
      position:'fixed', inset:0, zIndex:200,
      background:'rgba(0,0,0,0.9)', backdropFilter:'blur(5px)',
      display:'flex', alignItems:'center', justifyContent:'center', padding:24,
    }}>
      <div className="modal-in" style={{
        background:'var(--surface)', borderRadius:16,
        width:'100%', maxWidth:860,
        border:'1px solid var(--border)',
        maxHeight:'90vh', overflowY:'auto',
        boxShadow:'0 32px 100px rgba(0,0,0,0.8)',
      }}>
        {/* Video */}
        <div style={{ width:'100%', aspectRatio:'16/9', background:'#000', borderRadius:'16px 16px 0 0', overflow:'hidden' }}>
          <iframe
            width="100%" height="100%"
            src={`https://www.youtube.com/embed/${movie.trailerKey}?autoplay=1&rel=0&modestbranding=1`}
            allow="autoplay; encrypted-media; fullscreen"
            allowFullScreen style={{ border:'none', display:'block' }}
          />
        </div>

        {/* Body */}
        <div style={{ padding:'24px 28px 28px' }}>
          <div style={{ display:'flex', justifyContent:'space-between',
                        alignItems:'flex-start', marginBottom:14 }}>
            <h2 style={{
              fontFamily:"'Bebas Neue',sans-serif",
              fontSize:30, letterSpacing:2, color:'white',
            }}>{movie.title}</h2>
            <button onClick={onClose} style={{
              width:34, height:34, background:'rgba(255,255,255,0.07)',
              border:'1px solid var(--border)', borderRadius:'50%',
              cursor:'pointer', color:'var(--text)', fontSize:16,
              display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0,
            }}>&#10005;</button>
          </div>

          <div style={{ display:'flex', alignItems:'center', gap:12,
                        marginBottom:14, flexWrap:'wrap' }}>
            <span style={{ color:'#fbbf24', fontSize:14, fontWeight:700 }}>
              &#9733; {movie.rating}
            </span>
            <span style={{
              background:'rgba(13,148,136,0.2)', border:'1px solid rgba(13,148,136,0.35)',
              borderRadius:5, padding:'2px 9px', fontSize:11,
              color:'var(--teal-light)', fontWeight:600,
            }}>{movie.genre}</span>
            <span style={{ fontSize:13, color:'var(--muted)' }}>{movie.year}</span>
          </div>

          <p style={{
            fontSize:14, lineHeight:1.7, color:'rgba(226,232,240,0.72)',
            marginBottom:22,
          }}>{movie.description}</p>

          <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
            <button onClick={() => { onClose(); onWatchFull(movie) }} style={{
              display:'flex', alignItems:'center', gap:8,
              background:'var(--teal)', color:'white', border:'none',
              padding:'12px 22px', borderRadius:8,
              fontSize:14, fontWeight:600, cursor:'pointer',
              transition:'background .2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background='var(--teal-light)'}
            onMouseLeave={e => e.currentTarget.style.background='var(--teal)'}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3"/>
              </svg>
              Watch Full Movie
            </button>

            <button onClick={() => setAdded(true)} style={{
              display:'flex', alignItems:'center', gap:8,
              background: added ? 'rgba(13,148,136,0.15)' : 'rgba(255,255,255,0.08)',
              color: added ? 'var(--teal-light)' : 'white',
              border:`1px solid ${added ? 'rgba(13,148,136,0.4)' : 'rgba(255,255,255,0.15)'}`,
              padding:'12px 18px', borderRadius:8,
              fontSize:14, fontWeight:500, cursor:'pointer',
              transition:'all .2s',
            }}>
              {added ? '✓ Added to List' : '+ My List'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
