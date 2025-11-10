import React, { useEffect, useState } from 'react';
import { getWatchlist, removeFromWatchlist } from '../utils/watchlist';
import { Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Watchlist = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    setMovies(getWatchlist());
  }, []);

  const removeMovie = (id) => {
    removeFromWatchlist(id);
    setMovies(getWatchlist());
  };

  if (movies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-gray-400">
        <p className="text-xl mb-4">Your Watchlist is empty 😢</p>
        <Link to="/movies" className="text-blue-400 underline">
          Browse Movies
        </Link>
      </div>
    );
  }

  return (
    <div className="px-10 py-8">
      <h1 className="text-3xl font-semibold mb-6 text-white">Your Watchlist ❤️</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {movies.map((movie) => (
          <div key={movie.id} className="relative group">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="rounded-lg"
            />
            <button
              onClick={() => removeMovie(movie.id)}
              className="absolute top-2 right-2 bg-black/60 p-1 rounded-full"
            >
              <Trash2 size={18} className="text-white" />
            </button>
            <p className="text-center text-sm text-gray-300 mt-2">{movie.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Watchlist;
