import { useAuth } from '../context/AuthContext'
import MovieCard from '../components/MovieCard'

export default function MyListPage({ myList, onPlayTrailer, onWatchFull, onToggleList, onAuthClick }) {
  const { user } = useAuth()

  if (!user) {
    return (
      <div style={{ paddingTop: 68, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', padding: 40, maxWidth: 400 }}>
          <div style={{
            width: 72, height: 72, borderRadius: '50%',
            background: 'rgba(13,148,136,0.12)',
            border: '2px solid rgba(13,148,136,0.35)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 24px', fontSize: 32,
          }}>🔒</div>
          <div style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 28, letterSpacing: 2, color: 'white', marginBottom: 12,
          }}>SIGN IN TO ACCESS YOUR LIST</div>
          <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.6, marginBottom: 24 }}>
            Create a free account to save movies and series to your personal watchlist.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <button onClick={() => onAuthClick('signup')} style={{
              background: 'var(--teal)', color: 'white', border: 'none',
              padding: '13px', borderRadius: 8, fontSize: 14, fontWeight: 700,
              cursor: 'pointer',
            }}>Create Free Account</button>
            <button onClick={() => onAuthClick('signin')} style={{
              background: 'rgba(255,255,255,0.07)', color: 'white',
              border: '1px solid var(--border)',
              padding: '13px', borderRadius: 8, fontSize: 14, fontWeight: 500,
              cursor: 'pointer',
            }}>Sign In</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ paddingTop: 68, paddingBottom: 80 }}>
      {/* Header */}
      <div style={{
        padding: 'clamp(32px,5vh,56px) clamp(16px,4vw,48px) 32px',
        background: 'linear-gradient(to bottom, rgba(13,148,136,0.06), transparent)',
        borderBottom: '1px solid var(--border)',
        marginBottom: 40,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <div style={{ width: 4, height: 32, background: 'var(--teal)', borderRadius: 2 }} />
          <h1 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(28px, 5vw, 44px)',
            letterSpacing: 3, color: 'white',
          }}>MY LIST</h1>
        </div>
        <p style={{ fontSize: 14, color: 'var(--muted)', paddingLeft: 16 }}>
          {myList.length > 0
            ? `${myList.length} title${myList.length !== 1 ? 's' : ''} saved`
            : 'Your watchlist is empty'}
        </p>
      </div>

      {myList.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px clamp(16px,4vw,48px)' }}>
          <div style={{ fontSize: 64, marginBottom: 20 }}>🎬</div>
          <div style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 24, letterSpacing: 2, color: 'var(--text)', marginBottom: 12,
          }}>NOTHING SAVED YET</div>
          <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7, maxWidth: 320, margin: '0 auto' }}>
            Browse movies and series and click "+ My List" to save them here for later.
          </p>
        </div>
      ) : (
        <div style={{ padding: '0 clamp(16px,4vw,48px)' }}>
          {/* Movies section */}
          {myList.filter(m => !m.isSeries).length > 0 && (
            <>
              <div style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 20, letterSpacing: 2, color: 'white',
                marginBottom: 20,
              }}>MOVIES ({myList.filter(m => !m.isSeries).length})</div>
              <div className="movie-grid" style={{ marginBottom: 48 }}>
                {myList.filter(m => !m.isSeries).map(m => (
                  <MovieCard
                    key={m.id}
                    movie={m}
                    onPlayTrailer={onPlayTrailer}
                    onWatchFull={onWatchFull}
                    onToggleList={onToggleList}
                    inList
                  />
                ))}
              </div>
            </>
          )}

          {/* Series section */}
          {myList.filter(m => m.isSeries).length > 0 && (
            <>
              <div style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 20, letterSpacing: 2, color: 'white',
                marginBottom: 20,
              }}>SERIES ({myList.filter(m => m.isSeries).length})</div>
              <div className="movie-grid">
                {myList.filter(m => m.isSeries).map(m => (
                  <MovieCard
                    key={m.id}
                    movie={m}
                    onPlayTrailer={onPlayTrailer}
                    onWatchFull={onWatchFull}
                    onToggleList={onToggleList}
                    inList
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
