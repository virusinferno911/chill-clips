import MovieCard from './MovieCard'

export default function MovieRow({ title, movies, onPlay }) {
  return (
    <div style={{ marginBottom: 40 }}>
      <div style={{
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 48px', marginBottom: 16,
      }}>
        <div style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 22, letterSpacing: 2, color: 'white',
        }}>{title}</div>
        <div style={{
          fontSize: 12, color: 'var(--teal)', cursor: 'pointer', opacity: 0.8,
        }}>See all</div>
      </div>

      <div style={{
        display: 'flex', gap: 12,
        padding: '8px 48px 16px',
        overflowX: 'auto', scrollbarWidth: 'none',
      }}>
        {movies.map((movie, i) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            globalIdx={i}
            onPlay={onPlay}
          />
        ))}
      </div>
    </div>
  )
}
