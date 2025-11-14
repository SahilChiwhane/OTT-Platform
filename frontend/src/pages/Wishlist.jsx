import React, { useEffect, useState } from 'react';
import { getWishlist, removeFromWishlist, subscribeWishlist } from '../utils/wishlist';
import { Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const [movies, setMovies] = useState(getWishlist());

  useEffect(() => {
    const unsub = subscribeWishlist(() => setMovies(getWishlist()));
    return () => unsub();
  }, []);

  const removeMovie = (id) => {
    removeFromWishlist(id);
    setMovies(getWishlist());
  };

  return (
    <div className="w-full min-h-screen bg-black text-white px-6 py-8">
      <h1 className="text-3xl font-semibold mb-6">Your Wishlist</h1>

      {movies.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-slate-400 px-4">
          <p className="text-2xl mb-4">Your wishlist is empty</p>
          <Link to="/movies" className="text-sky-400 underline hover:text-sky-300">Browse Movies</Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {movies.map((movie) => (
            <div className="relative group cursor-pointer transform transition-all duration-200 hover:scale-105 hover:shadow-2xl" key={movie.id}>
              <img
                src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/300x450?text=No+Image'}
                alt={movie.title || movie.name}
                className="rounded-lg w-full h-auto block"
                loading="lazy"
              />
              <button
                onClick={(e) => { e.stopPropagation(); removeMovie(movie.id); }}
                aria-label={`Remove ${movie.title} from wishlist`}
                className="absolute top-2 right-2 bg-black/60 p-2 rounded-full opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity duration-200"
              >
                <Trash2 size={18} className="text-white" />
              </button>
              <p className="text-center text-sm text-slate-300 mt-2 truncate">{movie.title || movie.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
