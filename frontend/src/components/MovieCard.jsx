import React, { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { addToWatchlist, removeFromWatchlist, isInWatchlist } from '../utils/watchlist';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ movie, width = 150, imageSize = 'w300' }) => {
  const [inList, setInList] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setInList(isInWatchlist(movie.id));
  }, [movie.id]);

  const toggle = (e) => {
    e.stopPropagation();
    if (inList) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist({
        id: movie.id,
        title: movie.title || movie.name,
        poster_path: movie.poster_path,
      });
    }
    setInList(!inList);
  };

  const handleNav = () => {
    navigate(`/watch/${movie.id}`);
  };

  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/${imageSize}${movie.poster_path}`
    : 'https://via.placeholder.com/300x450?text=No+Image';

  return (
    <div
      onClick={handleNav}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') handleNav(); }}
      className="relative group cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-black/50"
      style={{ width }}
    >
      {/* Poster image */}
      <img
        src={poster}
        alt={movie.title || movie.name}
        className="rounded-md block w-full h-[225px] object-cover brightness-90 group-hover:brightness-110 transition-all duration-300"
        loading="lazy"
      />

      {/* Heart button (top-right) */}
      <button
        onClick={toggle}
        aria-label={inList ? 'Remove from watchlist' : 'Add to watchlist'}
        className="absolute top-2 right-2 bg-black/60 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-110"
        style={{
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {inList ? <FaHeart size={16} color="#ff4d4d" /> : <FaRegHeart size={16} color="#fff" />}
      </button>

      {/* Title overlay (bottom gradient) */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-2 rounded-b-md">
        <p className="text-sm text-gray-200 font-semibold truncate group-hover:text-white">
          {movie.title || movie.name}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
