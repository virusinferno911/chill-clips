import { useState, useEffect } from 'react'

export default function Navbar({ onSearch }) {
  const [scrolled, setScrolled] = useState(false)
  const [query, setQuery] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleSearch = (e) => {
    setQuery(e.target.value)
    onSearch(e.target.value)
  }

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 48px', height: '70px',
      background: scrolled
        ? 'rgba(8,12,12,0.98)'
        : 'linear-gradient(to bottom, rgba(8,12,12,0.95), transparent)',
      transition: 'background 0.3s',
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
        <div style={{
          width: 36, height: 36, background: 'var(--teal)',
          borderRadius: 8, display: 'flex', alignItems: 'center',
          justifyContent: 'center', fontSize: 18, color: 'white',
        }}>&#9654;</div>
        <span style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 30, color: 'var(--teal)', letterSpacing: 3,
        }}>CHILL CLIPS</span>
      </div>

      {/* Links */}
      <ul style={{ display: 'flex', gap: 28, listStyle: 'none' }}>
        {['Home', 'Movies', 'Series', 'My List'].map(l => (
          <li key={l}>
            <a href="#" style={{
              color: 'var(--text)', textDecoration: 'none',
              fontSize: 14, fontWeight: 500, opacity: 0.8,
            }}>{l}</a>
          </li>
        ))}
      </ul>

      {/* Right */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid var(--border)',
          borderRadius: 24, padding: '7px 16px',
        }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
            stroke="var(--muted)" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            value={query}
            onChange={handleSearch}
            placeholder="Search..."
            style={{
              background: 'none', border: 'none', outline: 'none',
              color: 'var(--text)', fontSize: 13, width: 140,
            }}
          />
        </div>
        <div style={{
          width: 34, height: 34,
          background: 'linear-gradient(135deg, var(--teal), var(--teal-dark))',
          borderRadius: 8, display: 'flex', alignItems: 'center',
          justifyContent: 'center', fontSize: 14, fontWeight: 600,
          color: 'white', cursor: 'pointer',
        }}>O</div>
      </div>
    </nav>
  )
}
