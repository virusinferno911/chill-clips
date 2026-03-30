import { useEffect } from 'react'

export default function Toast({ message, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 3000)
    return () => clearTimeout(t)
  }, [message, onDone])

  return (
    <div style={{
      position: 'fixed', bottom: 32, left: '50%',
      transform: 'translateX(-50%)',
      background: 'var(--surface)',
      border: '1px solid var(--teal)',
      borderRadius: 10, padding: '12px 22px',
      display: 'flex', alignItems: 'center', gap: 10,
      boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 0 20px var(--teal-glow)',
      zIndex: 400,
      animation: 'toastIn 0.35s ease both',
      whiteSpace: 'nowrap',
      maxWidth: 'calc(100vw - 32px)',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    }}>
      <div style={{
        width: 28, height: 28,
        background: 'rgba(13,148,136,0.2)',
        border: '1px solid var(--teal)',
        borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 13, flexShrink: 0,
      }}>▶</div>
      <span style={{ fontSize: 14, color: 'var(--text)', fontWeight: 500 }}>{message}</span>
    </div>
  )
}
