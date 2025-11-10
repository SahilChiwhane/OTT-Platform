// src/pages/Browse.jsx
// Shows popular movies by default and search results when a query is provided.
// Uses TMDB API through api/tmdb.js

import React, { useEffect, useState, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { getPopular, searchMovies } from '../api/tmdb';

export default function Browse() {
  const [searchParams] = useSearchParams();
  const q = searchParams.get('q') || '';

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch data based on search query
  const loadMovies = useCallback(async () => {
    try {
      setError(null);
      setLoading(true);

      const data = q ? await searchMovies(q) : await getPopular();
      setItems(data.results || []);
    } catch (err) {
      console.error('Browse page error:', err);
      setError('Failed to fetch movies. Check API key or network.');
    } finally {
      setLoading(false);
    }
  }, [q]);

  useEffect(() => {
    loadMovies();
  }, [loadMovies]);

  return (
    <div style={{ padding: 20 }}>
      <h2 style={{ marginBottom: 16 }}>
        {q ? `Search Results for "${q}"` : 'Popular Movies'}
      </h2>

      {loading && <p>Loading movies...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && items.length === 0 && (
        <p>No movies found.</p>
      )}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
          gap: 16,
        }}
      >
        {items.map((movie) => (
          <Link
            to={`/watch/${movie.id}`}
            key={movie.id}
            style={{
              textDecoration: 'none',
              color: '#111',
            }}
          >
            <div
              style={{
                background: '#f5f5f5',
                borderRadius: 8,
                overflow: 'hidden',
                textAlign: 'center',
              }}
            >
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                  alt={movie.title}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                  }}
                />
              ) : (
                <div
                  style={{
                    height: 240,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#ddd',
                    color: '#555',
                    fontSize: 14,
                  }}
                >
                  No Image
                </div>
              )}
              <div style={{ padding: '8px' }}>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {movie.title}
                </div>
                <div style={{ fontSize: 12, color: '#777' }}>
                    {movie.vote_average?.toFixed(1)}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
