import { useState, useMemo } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import MovieRow from './components/MovieRow'
import Modal from './components/Modal'
import { movies, categories } from './data/movies'

export default function App() {
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  const handlePlay = (idx) => {
    setSelectedMovie(movies[idx])
  }

  const displayCategories = useMemo(() => {
    if (!searchQuery.trim()) {
      return Object.entries(categories).map(([label, idxList]) => ({
        label,
        movies: idxList.map(i => movies[i]),
      }))
    }
    const q = searchQuery.toLowerCase()
    const results = movies.filter(m =>
      m.title.toLowerCase().includes(q) ||
      m.genre.toLowerCase().includes(q) ||
      m.description.toLowerCase().includes(q)
    )
    return [{ label: `Results for "${searchQuery}"`, movies: results }]
  }, [searchQuery])

  return (
    <>
      <Navbar onSearch={setSearchQuery} />

      <Hero onPlay={handlePlay} />

      <section style={{ paddingBottom: 80 }}>
        {displayCategories.map(({ label, movies: list }) =>
          list.length > 0 ? (
            <MovieRow
              key={label}
              title={label}
              movies={list}
              onPlay={(localIdx) => setSelectedMovie(list[localIdx])}
            />
          ) : null
        )}
      </section>

      <footer style={{
        padding: '32px 48px',
        borderTop: '1px solid var(--border)',
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', flexWrap: 'wrap', gap: 12,
      }}>
        <span style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 22, color: 'var(--teal)', letterSpacing: 3,
        }}>CHILL CLIPS</span>
        <span style={{ fontSize: 12, color: 'var(--muted)' }}>
          &copy; 2026 Chill Clips &mdash; Built by Oluwasheyi Olayemi Ojelade
        </span>
      </footer>

      {selectedMovie && (
        <Modal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </>
  )
}
