import { useState, useEffect } from 'react'
import { FEATURED } from '../data/movies'

export default function Hero({ onPlayTrailer, onWatchFull }) {
  const [idx, setIdx]         = useState(0)
  const [transitioning, setT] = useState(false)

  const advance = () => {
    if (transitioning) return
    setT(true)
    setTimeout(() => {
      setIdx(i => (i + 1) % FEATURED.length)
      setT(false)
    }, 400)
  }

  useEffect(() => {
    const t = setInterval(advance, 7000)
    return () => clearInterval(t)
  }, [idx, transitioning])

  const m = FEATURED[idx]

  return (
    <section style={{
      position:'relative',
      height: 'clamp(480px, 90vh, 92vh)',
      display:'flex', alignItems:'flex-end',
      padding:'0 clamp(16px,4vw,48px) clamp(48px,8vh,80px)',
      overflow:'hidden',
    }}>
      {/* BG */}
      <div style={{
        position:'absolute', inset:0,
        backgroundImage:`url('${m.banner}')`,
        backgroundSize:'cover', backgroundPosition:'center top',
        filter:'brightness(0.38)',
        opacity: transitioning ? 0 : 1,
        transition:'opacity 0.6s ease',
      }} />

      {/* Gradients */}
      <div style={{
        position:'absolute', inset:0,
        background:`
          linear-gradient(to right, rgba(8,12,12,0.95) 0%, rgba(8,12,12,0.55) 45%, transparent 70%),
          linear-gradient(to top, rgba(8,12,12,1) 0%, rgba(8,12,12,0.3) 30%, transparent 60%)
        `,
      }} />

      {/* Content */}
      <div style={{
        position:'relative', zIndex:2,
        width: '100%', maxWidth: 560,
        opacity: transitioning ? 0 : 1,
        transform: transitioning ? 'translateY(10px)' : 'translateY(0)',
        transition:'opacity 0.5s ease, transform 0.5s ease',
      }}>
        <div style={{
          display:'inline-flex', alignItems:'center', gap:6,
          background:'rgba(13,148,136,0.15)',
          border:'1px solid rgba(13,148,136,0.4)',
          borderRadius:20, padding:'4px 12px', marginBottom:14,
          fontSize:11, fontWeight:600, color:'var(--teal-light)',
          letterSpacing:1, textTransform:'uppercase',
        }}>&#9733; Featured Tonight</div>

        <h1 style={{
          fontFamily:"'Bebas Neue',sans-serif",
          fontSize:'clamp(36px,7vw,78px)',
          lineHeight:1, letterSpacing:2,
          color:'white', marginBottom:12,
          textShadow:'0 4px 20px rgba(0,0,0,0.5)',
        }}>{m.title}</h1>

        <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:12, flexWrap:'wrap' }}>
          <span style={{ color:'#fbbf24', fontSize:14, fontWeight:600 }}>&#9733; {m.rating}</span>
          <span style={{ width:3, height:3, background:'var(--muted)', borderRadius:'50%', display:'inline-block' }} />
          <span style={{ fontSize:13, color:'var(--muted)' }}>{m.year}</span>
          <span style={{ width:3, height:3, background:'var(--muted)', borderRadius:'50%', display:'inline-block' }} />
          <span style={{
            background:'rgba(13,148,136,0.2)', border:'1px solid rgba(13,148,136,0.35)',
            borderRadius:4, padding:'2px 8px', fontSize:11,
            color:'var(--teal-light)', fontWeight:600,
          }}>{m.genre}</span>
        </div>

        <p style={{
          fontSize:'clamp(13px,2vw,15px)', lineHeight:1.7, color:'rgba(226,232,240,0.78)',
          marginBottom:26,
          display:'-webkit-box',
          WebkitLineClamp:3, WebkitBoxOrient:'vertical', overflow:'hidden',
        }}>{m.description}</p>

        <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
          <button onClick={() => onPlayTrailer(m)} style={{
            display:'flex', alignItems:'center', gap:9,
            background:'var(--teal)', color:'white', border:'none',
            padding:'clamp(10px,2vw,13px) clamp(16px,3vw,26px)', borderRadius:10,
            fontSize:'clamp(13px,2vw,14px)', fontWeight:600, cursor:'pointer',
            transition:'background .2s, transform .15s, box-shadow .2s',
            boxShadow:'0 0 20px var(--teal-glow)',
          }}
          onMouseEnter={e => { e.currentTarget.style.background='var(--teal-light)'; e.currentTarget.style.transform='translateY(-2px)' }}
          onMouseLeave={e => { e.currentTarget.style.background='var(--teal)'; e.currentTarget.style.transform='none' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
            Watch Trailer
          </button>

          <button onClick={() => onWatchFull(m)} style={{
            display:'flex', alignItems:'center', gap:9,
            background:'rgba(255,255,255,0.1)', color:'white',
            border:'1px solid rgba(255,255,255,0.18)',
            padding:'clamp(10px,2vw,13px) clamp(14px,3vw,22px)', borderRadius:10,
            fontSize:'clamp(13px,2vw,14px)', fontWeight:500, cursor:'pointer',
            backdropFilter:'blur(8px)',
            transition:'background .2s',
          }}
          onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.18)'}
          onMouseLeave={e => e.currentTarget.style.background='rgba(255,255,255,0.1)'}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
            Watch Full Movie
          </button>
        </div>
      </div>

      {/* Dot indicators */}
      <div style={{
        position:'absolute', bottom:'clamp(12px,3vh,28px)', left:'50%',
        transform:'translateX(-50%)',
        display:'flex', gap:8, zIndex:2,
      }}>
        {FEATURED.map((_, i) => (
          <div key={i} onClick={() => setIdx(i)} style={{
            width: i === idx ? 24 : 6,
            height:6, borderRadius:3,
            background: i === idx ? 'var(--teal)' : 'rgba(255,255,255,0.3)',
            cursor:'pointer',
            transition:'width .3s ease, background .3s ease',
          }} />
        ))}
      </div>
    </section>
  )
}
