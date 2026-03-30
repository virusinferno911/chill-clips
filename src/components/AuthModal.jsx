import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'

export default function AuthModal({ mode: initialMode, onClose, onSuccess }) {
  const { signIn, signUp } = useAuth()
  const [mode, setMode]     = useState(initialMode || 'signin')
  const [email, setEmail]   = useState('')
  const [pass, setPass]     = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError]   = useState('')
  const [done, setDone]     = useState(false)

  useEffect(() => {
    const fn = e => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', fn)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', fn)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    if (!email || !pass) { setError('Please fill in all fields.'); return }
    if (pass.length < 6) { setError('Password must be at least 6 characters.'); return }
    setLoading(true)
    try {
      if (mode === 'signup') {
        await signUp(email, pass)
        setDone(true)
      } else {
        await signIn(email, pass)
        onSuccess?.()
        onClose()
      }
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    width:'100%', background:'rgba(255,255,255,0.05)',
    border:'1px solid var(--border)', borderRadius:8,
    padding:'12px 14px', fontSize:14, color:'var(--text)',
    outline:'none', transition:'border-color .2s',
    fontFamily:'Inter,sans-serif',
  }

  return (
    <div onClick={e => { if (e.target === e.currentTarget) onClose() }} style={{
      position:'fixed', inset:0, zIndex:300,
      background:'rgba(0,0,0,0.88)', backdropFilter:'blur(6px)',
      display:'flex', alignItems:'center', justifyContent:'center', padding:24,
    }}>
      <div className="modal-in" style={{
        background:'var(--surface)', borderRadius:16,
        width:'100%', maxWidth:420,
        border:'1px solid var(--border)',
        overflow:'hidden',
        boxShadow:'0 32px 80px rgba(0,0,0,0.8)',
      }}>
        {/* Header */}
        <div style={{
          padding:'28px 28px 0',
          display:'flex', justifyContent:'space-between', alignItems:'flex-start',
        }}>
          <div>
            <div style={{
              fontFamily:"'Bebas Neue',sans-serif",
              fontSize:28, letterSpacing:2, color:'white', marginBottom:4,
            }}>
              {done ? 'CHECK YOUR EMAIL' : mode === 'signin' ? 'WELCOME BACK' : 'JOIN CHILL CLIPS'}
            </div>
            <div style={{ fontSize:13, color:'var(--muted)' }}>
              {done
                ? 'We sent you a confirmation link'
                : mode === 'signin'
                  ? 'Sign in to access your account'
                  : 'Create your free account today'}
            </div>
          </div>
          <button onClick={onClose} style={{
            background:'rgba(255,255,255,0.07)', border:'1px solid var(--border)',
            borderRadius:'50%', width:32, height:32, cursor:'pointer',
            color:'var(--text)', fontSize:16, display:'flex',
            alignItems:'center', justifyContent:'center', flexShrink:0,
          }}>&#10005;</button>
        </div>

        {/* Body */}
        <div style={{ padding:28 }}>
          {done ? (
            <div style={{ textAlign:'center', padding:'20px 0' }}>
              <div style={{
                width:60, height:60, background:'rgba(13,148,136,0.15)',
                border:'2px solid var(--teal)', borderRadius:'50%',
                display:'flex', alignItems:'center', justifyContent:'center',
                margin:'0 auto 16px', fontSize:28,
              }}>&#10003;</div>
              <p style={{ fontSize:14, color:'var(--text)', lineHeight:1.6, marginBottom:20 }}>
                Check your inbox at <strong>{email}</strong> and click the confirmation link to activate your account.
              </p>
              <button onClick={onClose} style={{
                background:'var(--teal)', color:'white', border:'none',
                padding:'12px 28px', borderRadius:8, fontSize:14,
                fontWeight:600, cursor:'pointer', width:'100%',
              }}>Got it</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {error && (
                <div style={{
                  background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.3)',
                  borderRadius:8, padding:'10px 14px', marginBottom:16,
                  fontSize:13, color:'#fca5a5',
                }}>{error}</div>
              )}

              <div style={{ marginBottom:16 }}>
                <label style={{ fontSize:12, fontWeight:600, color:'var(--muted)',
                                letterSpacing:.5, textTransform:'uppercase',
                                display:'block', marginBottom:6 }}>Email Address</label>
                <input
                  type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com" required
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor='var(--teal)'}
                  onBlur={e => e.target.style.borderColor='var(--border)'}
                />
              </div>

              <div style={{ marginBottom:24 }}>
                <label style={{ fontSize:12, fontWeight:600, color:'var(--muted)',
                                letterSpacing:.5, textTransform:'uppercase',
                                display:'block', marginBottom:6 }}>Password</label>
                <input
                  type="password" value={pass} onChange={e => setPass(e.target.value)}
                  placeholder={mode === 'signup' ? 'At least 6 characters' : 'Your password'}
                  required
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor='var(--teal)'}
                  onBlur={e => e.target.style.borderColor='var(--border)'}
                />
              </div>

              <button type="submit" disabled={loading} style={{
                width:'100%', background: loading ? 'var(--teal-dark)' : 'var(--teal)',
                color:'white', border:'none', padding:'13px',
                borderRadius:8, fontSize:15, fontWeight:600, cursor: loading ? 'not-allowed' : 'pointer',
                display:'flex', alignItems:'center', justifyContent:'center', gap:10,
                transition:'background .2s',
              }}>
                {loading ? <><span className="spinner"/> Processing...</> :
                  mode === 'signin' ? 'Sign In' : 'Create Account'}
              </button>

              <div style={{
                textAlign:'center', marginTop:18,
                fontSize:13, color:'var(--muted)',
              }}>
                {mode === 'signin' ? (
                  <>No account?{' '}
                    <span onClick={() => { setMode('signup'); setError('') }} style={{
                      color:'var(--teal-light)', cursor:'pointer', fontWeight:600,
                    }}>Sign up free</span>
                  </>
                ) : (
                  <>Already have an account?{' '}
                    <span onClick={() => { setMode('signin'); setError('') }} style={{
                      color:'var(--teal-light)', cursor:'pointer', fontWeight:600,
                    }}>Sign in</span>
                  </>
                )}
              </div>
            </form>
          )}
        </div>

        {/* Free note */}
        {!done && (
          <div style={{
            padding:'12px 28px 20px', textAlign:'center',
            fontSize:11, color:'var(--muted)',
          }}>
            Watch trailers free. Sign in to unlock full movies.
          </div>
        )}
      </div>
    </div>
  )
}
