import React, { useEffect, useState } from 'react';
import tmdb from '../api/tmdb';
import MovieCard from '../components/MovieCard';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!query || query.trim().length < 1) {
      setResults([]);
      return;
    }
    const id = setTimeout(async () => {
      try {
        setLoading(true);
        const res = await tmdb.get(`/search/movie`, {
          params: { query: query.trim(), language: 'en-US', page: 1, include_adult: false }
        });
        setResults(res.data.results || []);
      } catch (err) {
        console.error('Search error', err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(id);
  }, [query]);

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white py-10 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Search input */}
        <div className="mb-10">
          <div className="flex items-center bg-[#1a1a1a] border border-[#333] rounded-full px-4 py-3 shadow-lg">
            <svg className="w-5 h-5 text-gray-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.387-1.414 1.414-4.387-4.387zM10 16a6 6 0 100-12 6 6 0 000 12z" />
            </svg>
            <input
              className="w-full bg-transparent outline-none text-white placeholder:text-gray-500 text-lg"
              placeholder="Search movies, TV shows, actors..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              autoFocus
              aria-label="Search movies"
            />
          </div>
        </div>

        {loading && <p className="text-gray-400 text-center mb-6">Searching...</p>}

        {!loading && results.length === 0 && query.trim() !== '' && (
          <p className="text-gray-400 text-center mb-6">No results found.</p>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {results.map(movie => (
            <div
              key={movie.id}
              onClick={() => navigate(`/watch/${movie.id}`)}
              className="cursor-pointer transform hover:scale-[1.03] transition-transform duration-200"
            >
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
