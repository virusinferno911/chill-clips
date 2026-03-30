import { useState, useEffect, useRef } from 'react'
import { useAuth } from '../context/AuthContext'

export default function Navbar({ onSearch, onAuthClick, activePage, onPageChange }) {
  const { user, signOut } = useAuth()
  const [scrolled, setScrolled]   = useState(false)
  const [query, setQuery]         = useState('')
  const [menuOpen, setMenuOpen]   = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    const fn = e => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false)
    }
    document.addEventListener('mousedown', fn)
    return () => document.removeEventListener('mousedown', fn)
  }, [])

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const handleSearch = e => {
    setQuery(e.target.value)
    onSearch(e.target.value)
    if (activePage !== 'home') onPageChange('home')
  }

  const initials = user?.email?.slice(0, 2).toUpperCase() || 'CC'
  const navLinks = ['Home', 'Movies', 'Series', 'My List']

  const LinkItem = ({ label, mobile = false }) => (
    <button
      onClick={() => {
        onPageChange(label.toLowerCase().replace(' ', '-'))
        if (mobile) setMobileOpen(false)
      }}
      style={{
        background: 'none', border: 'none', cursor: 'pointer',
        color: activePage === label.toLowerCase().replace(' ', '-') || (label === 'Home' && activePage === 'home')
          ? 'var(--teal-light)' : 'var(--text)',
        fontSize: mobile ? 18 : 14,
        fontWeight: activePage === label.toLowerCase().replace(' ', '-') ? 600 : 500,
        opacity: activePage === label.toLowerCase().replace(' ', '-') ? 1 : 0.75,
        transition: 'opacity .2s, color .2s',
        padding: mobile ? '12px 0' : '4px 0',
        textAlign: mobile ? 'left' : 'center',
        borderBottom: mobile ? '1px solid var(--border)' : 'none',
        width: mobile ? '100%' : 'auto',
        fontFamily: mobile ? "'Bebas Neue', sans-serif" : 'inherit',
        letterSpacing: mobile ? 1.5 : 0,
      }}
      onMouseEnter={e => { if (!mobile) { e.currentTarget.style.opacity=1; e.currentTarget.style.color='var(--teal-light)' }}}
      onMouseLeave={e => { if (!mobile) { e.currentTarget.style.opacity=activePage===label.toLowerCase().replace(' ','-')?1:0.75; e.currentTarget.style.color=activePage===label.toLowerCase().replace(' ','-')?'var(--teal-light)':'var(--text)' }}}
    >{label}</button>
  )

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 clamp(16px, 4vw, 48px)', height: 68,
        background: scrolled
          ? 'rgba(8,12,12,0.97)'
          : 'linear-gradient(to bottom, rgba(8,12,12,0.9), transparent)',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : 'none',
        transition: 'all 0.3s ease',
      }}>

        {/* Logo */}
        <div
          onClick={() => onPageChange('home')}
          style={{ display:'flex', alignItems:'center', gap:8, cursor:'pointer', flexShrink: 0 }}
        >
          <div style={{
            width:34, height:34, background:'var(--teal)', borderRadius:8,
            display:'flex', alignItems:'center', justifyContent:'center',
            fontSize:16, color:'white', animation: 'glowPulse 3s ease-in-out infinite',
          }}>&#9654;</div>
          <span style={{
            fontFamily:"'Bebas Neue',sans-serif", fontSize:'clamp(20px,4vw,28px)',
            color:'var(--teal)', letterSpacing:3,
          }}>CHILL CLIPS</span>
        </div>

        {/* Desktop nav links */}
        <ul style={{
          display:'flex', gap:24, listStyle:'none', margin:'0 32px',
          ['@media(max-width:768px)']: { display: 'none' },
        }} className="desktop-nav">
          {navLinks.map(l => (
            <li key={l}><LinkItem label={l} /></li>
          ))}
        </ul>

        {/* Right: search + auth */}
        <div style={{ display:'flex', alignItems:'center', gap:10, flexShrink:0 }}>
          {/* Search — hidden on very small screens unless focused */}
          <div style={{
            display:'flex', alignItems:'center', gap:8,
            background: searchFocused ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.06)',
            border:`1px solid ${searchFocused ? 'var(--teal)' : 'var(--border)'}`,
            borderRadius:24, padding:'6px 14px',
            transition:'border-color .2s, background .2s, width .3s',
          }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
              stroke="var(--muted)" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              value={query} onChange={handleSearch}
              placeholder="Search..."
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              style={{
                background:'none', border:'none', outline:'none',
                color:'var(--text)', fontSize:13,
                width: searchFocused ? 140 : 100,
                transition: 'width .3s',
              }}
            />
          </div>

          {/* Auth */}
          {user ? (
            <div style={{ position:'relative' }} ref={menuRef}>
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
                  borderRadius:10, minWidth:210, overflow:'hidden',
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
                    <div key={item}
                      onClick={() => {
                        if (item === 'My List') { onPageChange('my-list'); setMenuOpen(false) }
                      }}
                      style={{
                        padding:'11px 16px', fontSize:13, cursor:'pointer',
                        transition:'background .15s',
                      }}
                      onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.05)'}
                      onMouseLeave={e => e.currentTarget.style.background='transparent'}
                    >{item}</div>
                  ))}
                  <div onClick={() => { signOut(); setMenuOpen(false) }} style={{
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
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => { e.currentTarget.style.background='var(--teal-light)'; e.currentTarget.style.transform='translateY(-1px)' }}
            onMouseLeave={e => { e.currentTarget.style.background='var(--teal)'; e.currentTarget.style.transform='none' }}
            >Sign In</button>
          )}

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMobileOpen(true)}
            className="hamburger-btn"
            aria-label="Open menu"
            style={{
              display: 'none',
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid var(--border)',
              borderRadius: 8, padding: '7px 10px',
              cursor: 'pointer', flexDirection: 'column',
              gap: 4, alignItems: 'center', justifyContent: 'center',
            }}
          >
            <span style={{ display:'block', width:20, height:2, background:'var(--text)', borderRadius:1 }} />
            <span style={{ display:'block', width:20, height:2, background:'var(--text)', borderRadius:1 }} />
            <span style={{ display:'block', width:20, height:2, background:'var(--text)', borderRadius:1 }} />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <>
          <div
            className="mobile-overlay"
            onClick={() => setMobileOpen(false)}
          />
          <div className="mobile-menu-in" style={{
            position: 'fixed', top: 0, left: 0, bottom: 0,
            width: 'min(280px, 85vw)',
            background: 'var(--surface)',
            borderRight: '1px solid var(--border)',
            zIndex: 200, overflowY: 'auto',
            padding: '0 0 40px',
          }}>
            {/* Drawer header */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '18px 20px', borderBottom: '1px solid var(--border)',
            }}>
              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                <div style={{
                  width:28, height:28, background:'var(--teal)', borderRadius:6,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:13, color:'white',
                }}>▶</div>
                <span style={{
                  fontFamily:"'Bebas Neue',sans-serif",
                  fontSize:20, color:'var(--teal)', letterSpacing:3,
                }}>CHILL CLIPS</span>
              </div>
              <button onClick={() => setMobileOpen(false)} style={{
                background: 'rgba(255,255,255,0.07)', border: '1px solid var(--border)',
                borderRadius: 6, padding: '5px 10px', cursor: 'pointer',
                color: 'var(--text)', fontSize: 16,
              }}>✕</button>
            </div>

            {/* Nav links */}
            <div style={{ padding: '8px 20px' }}>
              {navLinks.map(l => <LinkItem key={l} label={l} mobile />)}
            </div>

            {/* User info or auth buttons */}
            <div style={{ padding: '16px 20px', borderTop: '1px solid var(--border)', marginTop: 8 }}>
              {user ? (
                <>
                  <div style={{
                    fontSize: 11, color: 'var(--muted)', marginBottom: 6,
                    textTransform: 'uppercase', letterSpacing: 1,
                  }}>Signed in as</div>
                  <div style={{
                    fontSize: 13, color: 'var(--text)', marginBottom: 16,
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  }}>{user.email}</div>
                  <button onClick={() => { signOut(); setMobileOpen(false) }} style={{
                    width: '100%', background: 'rgba(239,68,68,0.1)',
                    border: '1px solid rgba(239,68,68,0.3)',
                    color: '#fca5a5', borderRadius: 8, padding: '10px',
                    fontSize: 13, cursor: 'pointer', fontWeight: 500,
                  }}>Sign Out</button>
                </>
              ) : (
                <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                  <button onClick={() => { onAuthClick('signin'); setMobileOpen(false) }} style={{
                    width:'100%', background:'var(--teal)', color:'white', border:'none',
                    padding:'12px', borderRadius:8, fontSize:14, fontWeight:600, cursor:'pointer',
                  }}>Sign In</button>
                  <button onClick={() => { onAuthClick('signup'); setMobileOpen(false) }} style={{
                    width:'100%', background:'rgba(255,255,255,0.06)', color:'white',
                    border:'1px solid var(--border)',
                    padding:'12px', borderRadius:8, fontSize:14, fontWeight:500, cursor:'pointer',
                  }}>Create Account</button>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
      `}</style>
    </>
  )
}
