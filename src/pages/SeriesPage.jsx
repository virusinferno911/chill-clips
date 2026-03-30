import { useState } from 'react'
import { series, SERIES_BY_GENRE } from '../data/movies'
import MovieCard from '../components/MovieCard'
import MovieRow from '../components/MovieRow'

export default function SeriesPage({ onPlayTrailer, onWatchFull, onToggleList, myList }) {
  const [activeGenre, setActiveGenre] = useState('All')
  const genres = ['All', ...Object.keys(SERIES_BY_GENRE)]
  const filtered = activeGenre === 'All' ? series : (SERIES_BY_GENRE[activeGenre] || [])

  return (
    <div style={{ paddingTop: 68, paddingBottom: 80 }}>
      {/* Page header */}
      <div style={{
        padding: 'clamp(32px,5vh,56px) clamp(16px,4vw,48px) 0',
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
          }}>SERIES</h1>
        </div>
        <p style={{ fontSize: 14, color: 'var(--muted)', paddingLeft: 16, paddingBottom: 24 }}>
          Binge-worthy shows across every genre
        </p>

        {/* Genre tabs */}
        <div style={{
          display: 'flex', gap: 8, overflowX: 'auto',
          paddingLeft: 'clamp(16px,4vw,48px)',
          paddingRight: 'clamp(16px,4vw,48px)',
          marginLeft: 'calc(-1 * clamp(16px,4vw,48px))',
          scrollbarWidth: 'none',
        }}>
          {genres.map(g => (
            <button key={g} onClick={() => setActiveGenre(g)} style={{
              flexShrink: 0,
              padding: '8px 18px',
              border: 'none',
              background: activeGenre === g ? 'var(--teal)' : 'rgba(255,255,255,0.06)',
              color: activeGenre === g ? 'white' : 'var(--muted)',
              fontSize: 13, fontWeight: activeGenre === g ? 600 : 400,
              cursor: 'pointer', transition: 'all .2s',
              borderRadius: '8px 8px 0 0',
              borderBottom: activeGenre === g ? '2px solid var(--teal-light)' : '2px solid transparent',
            }}>
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {activeGenre === 'All' ? (
        <>
          <MovieRow title="Trending Series" movies={series} onPlayTrailer={onPlayTrailer} onWatchFull={onWatchFull} onToggleList={onToggleList} myList={myList} />
          {Object.entries(SERIES_BY_GENRE).map(([genre, list]) =>
            list.length > 0 ? (
              <MovieRow key={genre} title={genre} movies={list} onPlayTrailer={onPlayTrailer} onWatchFull={onWatchFull} onToggleList={onToggleList} myList={myList} />
            ) : null
          )}
        </>
      ) : (
        <div style={{ padding: '0 clamp(16px,4vw,48px)' }}>
          <div className="movie-grid">
            {filtered.map(s => (
              <MovieCard key={s.id} movie={s} onPlayTrailer={onPlayTrailer} onWatchFull={onWatchFull} onToggleList={onToggleList} inList={myList.some(l => l.id === s.id)} />
            ))}
          </div>
          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--muted)' }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>📺</div>
              <div style={{ fontSize: 18, color: 'var(--text)' }}>No series in this genre yet</div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
