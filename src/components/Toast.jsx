import { useEffect, useState } from 'react'

export default function Toast({ message, onDone }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => { setVisible(false); setTimeout(onDone, 300) }, 2800)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <div style={{
      position:'fixed', bottom:32, left:'50%',
      transform:'translateX(-50%)',
      background:'var(--teal)', color:'white',
      borderRadius:10, padding:'12px 22px',
      fontSize:13, fontWeight:600, zIndex:999,
      boxShadow:'0 8px 32px rgba(13,148,136,0.4)',
      display:'flex', alignItems:'center', gap:8,
      animation: visible ? 'toastIn .3s ease both' : 'none',
      opacity: visible ? 1 : 0, transition:'opacity .3s',
      pointerEvents:'none',
    }}>
      <span>&#10003;</span> {message}
    </div>
  )
}
