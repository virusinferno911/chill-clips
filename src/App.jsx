import { useState, useMemo } from 'react'
import { AuthProvider, useAuth } from './context/AuthContext'
import Navbar        from './components/Navbar'
import Hero          from './components/Hero'
import MovieRow      from './components/MovieRow'
import TrailerModal  from './components/TrailerModal'
import WatchGate     from './components/WatchGate'
import AuthModal     from './components/AuthModal'
import VideoPlayer   from './components/VideoPlayer'
import Toast         from './components/Toast'
import SeriesPage    from './pages/SeriesPage'
import MoviesPage    from './pages/MoviesPage'
import MyListPage    from './pages/MyListPage'
import { movies, TRENDING, BY_GENRE } from './data/movies'

function AppContent() {
  const { user } = useAuth()

  const [page,          setPage]          = useState('home')   // home | movies | series | my-list
  const [search,        setSearch]        = useState('')
  const [trailerMovie,  setTrailerMovie]  = useState(null)
  const [gateMovie,     setGateMovie]     = useState(null)
  const [authMode,      setAuthMode]      = useState(null)     // 'signin' | 'signup' | null
  const [watchingMovie, setWatchingMovie] = useState(null)
  const [toast,         setToast]         = useState('')
  const [myList,        setMyList]        = useState([])

  const handleWatchFull = (movie) => {
    if (user) {
      setWatchingMovie(movie)
    } else {
      setGateMovie(movie)
    }
  }

  const handlePlayTrailer = (movie) => setTrailerMovie(movie)

  const openAuth = (mode) => setAuthMode(mode)

  const handleToggleList = (movie) => {
    setMyList(prev => {
      const exists = prev.some(m => m.id === movie.id)
      if (exists) {
        setToast(`Removed "${movie.title}" from My List`)
        return prev.filter(m => m.id !== movie.id)
      } else {
        setToast(`Added "${movie.title}" to My List`)
        return [...prev, movie]
      }
    })
  }

  const handleSearch = (q) => {
    setSearch(q)
    if (q.trim()) setPage('home')
  }

  // Home page search-filtered rows
  const rows = useMemo(() => {
    if (search.trim()) {
      const q = search.toLowerCase()
      const results = movies.filter(m =>
        m.title.toLowerCase().includes(q) ||
        m.genre.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q)
      )
      return [{ label: `Results for "${search}"`, list: results }]
    }
    return [
      { label: 'Trending Now', list: TRENDING },
      ...Object.entries(BY_GENRE)
        .filter(([, v]) => v.length > 0)
        .map(([genre, list]) => ({ label: genre, list })),
    ]
  }, [search])

  const sharedProps = {
    onPlayTrailer: handlePlayTrailer,
    onWatchFull: handleWatchFull,
    onToggleList: handleToggleList,
    myList,
  }

  const renderPage = () => {
    if (page === 'series')  return <SeriesPage  {...sharedProps} />
    if (page === 'my-list') return <MyListPage  {...sharedProps} onAuthClick={openAuth} />
    if (page === 'movies')  return <MoviesPage  {...sharedProps} />

    // HOME
    return (
      <>
        <Hero onPlayTrailer={handlePlayTrailer} onWatchFull={handleWatchFull} />

        {/* Stats bar */}
        {!search && (
          <div style={{
            display:'flex', justifyContent:'center',
            gap:'clamp(20px,5vw,48px)',
            padding:'clamp(16px,3vw,28px) clamp(16px,4vw,48px)',
            background:'var(--surface)',
            borderTop:'1px solid var(--border)',
            borderBottom:'1px solid var(--border)',
            flexWrap:'wrap',
          }}>
            {[['24+','Movies & Shows'],['6','Genres'],['Free','Trailers'],['HD','Quality']].map(([val,label]) => (
              <div key={label} style={{ textAlign:'center' }}>
                <div style={{
                  fontFamily:"'Bebas Neue',sans-serif",
                  fontSize:'clamp(22px,4vw,28px)', color:'var(--teal)', letterSpacing:1,
                }}>{val}</div>
                <div style={{ fontSize:11, color:'var(--muted)', fontWeight:500, letterSpacing:.5 }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Movie rows */}
        <section style={{ paddingBottom:80, paddingTop:40 }}>
          {rows.map(({ label, list }) =>
            list.length > 0 ? (
              <MovieRow
                key={label}
                title={label}
                movies={list}
                onPlayTrailer={handlePlayTrailer}
                onWatchFull={handleWatchFull}
                onToggleList={handleToggleList}
                myList={myList}
              />
            ) : null
          )}
          {rows[0]?.list.length === 0 && (
            <div style={{ textAlign:'center', padding:'80px 0', color:'var(--muted)' }}>
              <div style={{ fontSize:48, marginBottom:16 }}>🔍</div>
              <div style={{ fontSize:18, fontWeight:600, color:'var(--text)', marginBottom:8 }}>
                No results found
              </div>
              <div style={{ fontSize:14 }}>Try a different search term</div>
            </div>
          )}
        </section>
      </>
    )
  }

  return (
    <>
      <Navbar
        onSearch={handleSearch}
        onAuthClick={openAuth}
        activePage={page}
        onPageChange={setPage}
      />

      <main>{renderPage()}</main>

      {/* Footer — only on home */}
      {page === 'home' && !search && (
        <footer style={{
          padding:'clamp(20px,3vw,32px) clamp(16px,4vw,48px)',
          borderTop:'1px solid var(--border)',
          display:'flex', justifyContent:'space-between',
          alignItems:'center', flexWrap:'wrap', gap:14,
          background:'var(--surface)',
        }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, cursor:'pointer' }}
            onClick={() => setPage('home')}
          >
            <div style={{
              width:28, height:28, background:'var(--teal)', borderRadius:6,
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:14, color:'white',
            }}>▶</div>
            <span style={{
              fontFamily:"'Bebas Neue',sans-serif",
              fontSize:20, color:'var(--teal)', letterSpacing:3,
            }}>CHILL CLIPS</span>
          </div>
          <div style={{ display:'flex', gap:24, flexWrap:'wrap', justifyContent:'center' }}>
            {['About','Privacy','Terms','Contact'].map(l => (
              <span key={l} style={{
                fontSize:12, color:'var(--muted)', cursor:'pointer', transition:'color .2s',
              }}
              onMouseEnter={e => e.currentTarget.style.color='var(--text)'}
              onMouseLeave={e => e.currentTarget.style.color='var(--muted)'}
              >{l}</span>
            ))}
          </div>
          <span style={{ fontSize:12, color:'var(--muted)' }}>
            &copy; 2026 Chill Clips &mdash; Built by Oluwasheyi Olayemi Ojelade
          </span>
        </footer>
      )}

      {/* ── Modals ── */}
      {trailerMovie && (
        <TrailerModal
          movie={trailerMovie}
          onClose={() => setTrailerMovie(null)}
          onWatchFull={handleWatchFull}
          onToggleList={handleToggleList}
          inList={myList.some(m => m.id === trailerMovie.id)}
        />
      )}

      {watchingMovie && (
        <VideoPlayer
          movie={watchingMovie}
          onClose={() => setWatchingMovie(null)}
        />
      )}

      {gateMovie && (
        <WatchGate
          movie={gateMovie}
          onClose={() => setGateMovie(null)}
          onAuthClick={(mode) => { setGateMovie(null); openAuth(mode) }}
        />
      )}

      {authMode && (
        <AuthModal
          mode={authMode}
          onClose={() => setAuthMode(null)}
          onSuccess={() => setToast('Welcome to Chill Clips! 🎬')}
        />
      )}

      {toast && <Toast message={toast} onDone={() => setToast('')} />}
    </>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}
