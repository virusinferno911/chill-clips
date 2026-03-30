import { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'

export default function WatchGate({ movie, onClose, onAuthClick }) {
  const { user } = useAuth()

  useEffect(() => {
    // If user is already signed in, we wouldn't show this — but just in case
    if (user) { onClose(); return }
    const fn = e => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', fn)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', fn)
      document.body.style.overflow = ''
    }
  }, [user, onClose])

  if (!movie) return null

  return (
    <div onClick={e => { if (e.target === e.currentTarget) onClose() }} style={{
      position:'fixed', inset:0, zIndex:250,
      background:'rgba(0,0,0,0.92)', backdropFilter:'blur(8px)',
      display:'flex', alignItems:'center', justifyContent:'center', padding:24,
    }}>
      <div className="modal-in" style={{
        background:'var(--surface)', borderRadius:16,
        width:'100%', maxWidth:460,
        border:'1px solid var(--border)',
        overflow:'hidden',
        boxShadow:'0 32px 80px rgba(0,0,0,0.9)',
      }}>
        {/* Movie preview strip */}
        <div style={{
          height:160, position:'relative', overflow:'hidden',
        }}>
          <div style={{
            position:'absolute', inset:0,
            backgroundImage:`url('${movie.banner}')`,
            backgroundSize:'cover', backgroundPosition:'center',
            filter:'brightness(0.3) blur(2px)',
          }} />
          <div style={{
            position:'absolute', inset:0,
            background:'linear-gradient(to top, var(--surface), transparent)',
          }} />
          {/* Lock icon */}
          <div style={{
            position:'absolute', inset:0,
            display:'flex', alignItems:'center', justifyContent:'center',
          }}>
            <div style={{
              width:56, height:56, borderRadius:'50%',
              background:'rgba(13,148,136,0.2)',
              border:'2px solid rgba(13,148,136,0.5)',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:24,
            }}>&#128274;</div>
          </div>
        </div>

        <div style={{ padding:'20px 28px 28px' }}>
          <div style={{
            fontFamily:"'Bebas Neue',sans-serif",
            fontSize:22, letterSpacing:2, color:'white', marginBottom:6,
          }}>MEMBERS ONLY</div>
          <p style={{ fontSize:14, color:'rgba(226,232,240,0.7)', lineHeight:1.6, marginBottom:22 }}>
            Create a free account to watch <strong style={{ color:'white' }}>{movie.title}</strong> and unlock the full library. Trailers are always free.
          </p>

          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            <button onClick={() => { onClose(); onAuthClick('signup') }} style={{
              background:'var(--teal)', color:'white', border:'none',
              padding:'13px', borderRadius:8, fontSize:14, fontWeight:700,
              cursor:'pointer', transition:'background .2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background='var(--teal-light)'}
            onMouseLeave={e => e.currentTarget.style.background='var(--teal)'}
            >Create Free Account</button>

            <button onClick={() => { onClose(); onAuthClick('signin') }} style={{
              background:'rgba(255,255,255,0.07)', color:'white',
              border:'1px solid rgba(255,255,255,0.15)',
              padding:'13px', borderRadius:8, fontSize:14, fontWeight:500,
              cursor:'pointer', transition:'background .2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.12)'}
            onMouseLeave={e => e.currentTarget.style.background='rgba(255,255,255,0.07)'}
            >Sign In to Existing Account</button>
          </div>

          <div style={{
            textAlign:'center', marginTop:16,
            fontSize:12, color:'var(--muted)',
          }}>
            Free to join. No credit card required.
          </div>
        </div>
      </div>
    </div>
  )
}
