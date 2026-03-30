import { useRef, useState } from 'react'
import MovieCard from './MovieCard'

export default function MovieRow({ title, movies, onPlayTrailer, onWatchFull, onToggleList, myList = [] }) {
  const trackRef    = useRef(null)
  const [canLeft,  setCanLeft]  = useState(false)
  const [canRight, setCanRight] = useState(true)

  const scroll = dir => {
    const el = trackRef.current
    if (!el) return
    el.scrollBy({ left: dir * 640, behavior: 'smooth' })
    setTimeout(() => {
      setCanLeft(el.scrollLeft > 0)
      setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
    }, 400)
  }

  const ArrowBtn = ({ dir }) => (
    <button onClick={() => scroll(dir)} style={{
      position:'absolute', top:'50%', transform:'translateY(-50%)',
      [dir < 0 ? 'left' : 'right']: 4, zIndex:10,
      width:36, height:72, background:'rgba(8,12,12,0.85)',
      border:'1px solid var(--border)', borderRadius:6,
      color:'white', cursor:'pointer', fontSize:18,
      display:'flex', alignItems:'center', justifyContent:'center',
      backdropFilter:'blur(6px)',
      transition:'background .2s, opacity .2s',
      opacity: dir < 0 ? (canLeft ? 1 : 0) : (canRight ? 1 : 0),
      pointerEvents: dir < 0 ? (canLeft ? 'auto' : 'none') : (canRight ? 'auto' : 'none'),
    }}
    onMouseEnter={e => e.currentTarget.style.background='rgba(13,148,136,0.4)'}
    onMouseLeave={e => e.currentTarget.style.background='rgba(8,12,12,0.85)'}
    >
      {dir < 0 ? '‹' : '›'}
    </button>
  )

  return (
    <div style={{ marginBottom:44 }}>
      <div style={{
        display:'flex', alignItems:'center', justifyContent:'space-between',
        padding:'0 clamp(16px,4vw,48px)', marginBottom:14,
      }}>
        <div style={{
          fontFamily:"'Bebas Neue',sans-serif",
          fontSize:22, letterSpacing:2, color:'white',
        }}>{title}</div>
        <div style={{ fontSize:12, color:'var(--teal)', cursor:'pointer', opacity:0.8 }}
          onMouseEnter={e => e.currentTarget.style.opacity=1}
          onMouseLeave={e => e.currentTarget.style.opacity=0.8}
        >See all ›</div>
      </div>

      <div style={{ position:'relative' }}>
        <ArrowBtn dir={-1} />
        <div
          ref={trackRef}
          className="row-track"
          onScroll={e => {
            const el = e.currentTarget
            setCanLeft(el.scrollLeft > 0)
            setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
          }}
          style={{
            display:'flex', gap:12,
            padding:'8px clamp(16px,4vw,48px) 16px',
            overflowX:'auto', scrollBehavior:'smooth',
          }}
        >
          {movies.map(m => (
            <MovieCard
              key={m.id}
              movie={m}
              onPlayTrailer={onPlayTrailer}
              onWatchFull={onWatchFull}
              onToggleList={onToggleList}
              inList={myList.some(l => l.id === m.id)}
            />
          ))}
        </div>
        <ArrowBtn dir={1} />
      </div>
    </div>
  )
}
