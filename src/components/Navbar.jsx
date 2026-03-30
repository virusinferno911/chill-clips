import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import Toast from './Toast' // NEW: Importing the official UI component!

export default function Navbar({ onSearch, onAuthClick }) {
  const { user, signOut } = useAuth()
  const [scrolled, setScrolled]   = useState(false)
  const [query, setQuery]         = useState('')
  const [menuOpen, setMenuOpen]   = useState(false)
  const [toastMsg, setToastMsg]   = useState('') // Controls the official Toast

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const handleSearch = e => {
    setQuery(e.target.value)
    onSearch(e.target.value)
  }

  // Intelligent click handler for the links
  const handleNavClick = (e, item) => {
    e.preventDefault();
    if (item === 'Home' || item === 'Movies') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setToastMsg(`${item} feature coming in V3!`);
    }
  }

  const initials = user?.email?.slice(0, 2).toUpperCase() || 'CC'

  return (
    <>
      {/* NEW: Rendering the official Toast dynamically */}
      {toastMsg && <Toast message={toastMsg} onDone={() => setToastMsg('')} />}

      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 48px', height: 68,
        background: scrolled
          ? 'rgba(8,12,12,0.97)'
          : 'linear-gradient(to bottom, rgba(8,12,12,0.9), transparent)',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : 'none',
        transition: 'all 0.3s ease',
      }}>

        {/* Logo */}
        <div onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
             style={{ display:'flex', alignItems:'center', gap:8, cursor:'pointer', flexShrink: 0 }}>
          <div style={{
            width:34, height:34, background:'var(--teal)', borderRadius:8,
            display:'flex', alignItems:'center', justifyContent:'center',
            fontSize:16, color:'white', animation: 'glowPulse 3s ease-in-out infinite',
          }}>&#9654;</div>
          <span style={{
            fontFamily:"'Bebas Neue',sans-serif", fontSize:28,
            color:'var(--teal)', letterSpacing:3,
          }}>CHILL CLIPS</span>
        </div>

        {/* Links */}
        <ul style={{ display:'flex', gap:24, listStyle:'none', margin:'0 32px' }}>
          {['Home','Movies','Series','My List'].map(l => (
            <li key={l}>
              <a href="#" style={{
                color:'var(--text)', textDecoration:'none',
                fontSize:14, fontWeight:500, opacity:0.75,
                transition:'opacity .2s, color .2s',
              }}
              onClick={(e) => handleNavClick(e, l)}
              onMouseEnter={e => { e.target.style.opacity=1; e.target.style.color='var(--teal-light)' }}
              onMouseLeave={e => { e.target.style.opacity=0.75; e.target.style.color='var(--text)' }}
              >{l}</a>
            </li>
          ))}
        </ul>

        {/* Right */}
        <div style={{ display:'flex', alignItems:'center', gap:14, flexShrink:0 }}>
          {/* Search */}
          <div style={{
            display:'flex', alignItems:'center', gap:8,
            background:'rgba(255,255,255,0.06)',
            border:'1px solid var(--border)',
            borderRadius:24, padding:'6px 14px',
            transition:'border-color .2s, background .2s',
          }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
              stroke="var(--muted)" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input value={query} onChange={handleSearch} placeholder="Search..."
              style={{
                background:'none', border:'none', outline:'none',
                color:'var(--text)', fontSize:13, width:130,
              }}
            />
          </div>

          {/* Auth */}
          {user ? (
            <div style={{ position:'relative' }}>
              <div onClick={() => setMenuOpen(o => !o)} style={{
                width:34, height:34,
                background:'linear-gradient(135deg,var(--teal),var(--teal-dark))',
                borderRadius:8, display:'flex', alignItems:'center',
                justifyContent:'center', fontSize:12, fontWeight:700,
                color:'white', cursor:'pointer',
                border:'2px solid transparent',
                transition:'border-color .2s',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor='var(--teal-light)'}
              onMouseLeave={e => e.currentTarget.style.borderColor='transparent'}
              >{initials}</div>

              {menuOpen && (
                <div className="slide-down" style={{
                  position:'absolute', top:'calc(100% + 8px)', right:0,
                  background:'var(--surface)', border:'1px solid var(--border)',
                  borderRadius:10, minWidth:200, overflow:'hidden',
                  boxShadow:'0 20px 60px rgba(0,0,0,0.6)',
                }}>
                  <div style={{ padding:'12px 16px', borderBottom:'1px solid var(--border)' }}>
                    <div style={{ fontSize:11, color:'var(--muted)', marginBottom:2 }}>Signed in as</div>
                    <div style={{ fontSize:13, fontWeight:600, color:'var(--text)',
                                  overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                      {user.email}
                    </div>
                  </div>
                  {['My List','Settings'].map(item => (
                    <div key={item} style={{
                      padding:'11px 16px', fontSize:13, cursor:'pointer',
                      transition:'background .15s',
                    }}
                    onClick={() => { setMenuOpen(false); setToastMsg(`${item} coming in V3!`); }}
                    onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.05)'}
                    onMouseLeave={e => e.currentTarget.style.background='transparent'}
                    >{item}</div>
                  ))}
                  <div onClick={() => { signOut(); setMenuOpen(false); setToastMsg('Successfully signed out.'); }} style={{
                    padding:'11px 16px', fontSize:13, cursor:'pointer',
                    color:'var(--error)', borderTop:'1px solid var(--border)',
                    transition:'background .15s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background='rgba(239,68,68,0.08)'}
                  onMouseLeave={e => e.currentTarget.style.background='transparent'}
                  >Sign Out</div>
                </div>
              )}
            </div>
          ) : (
            <button onClick={() => onAuthClick('signin')} style={{
              background:'var(--teal)', color:'white', border:'none',
              padding:'8px 18px', borderRadius:8, fontSize:13,
              fontWeight:600, cursor:'pointer',
              transition:'background .2s, transform .1s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background='var(--teal-light)'; e.currentTarget.style.transform='translateY(-1px)' }}
            onMouseLeave={e => { e.currentTarget.style.background='var(--teal)'; e.currentTarget.style.transform='none' }}
            >Sign In</button>
          )}
        </div>
      </nav>
    </>
  )
}