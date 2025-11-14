import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../routes/paths';
import requests from '../assets/requests';

// Wishlist helpers
import {
  addToWishlist,
  removeFromWishlist,
  isInWishlist,
  subscribeWishlist,
} from '../utils/wishlist';

const Main = () => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [posterLoaded, setPosterLoaded] = useState(false);
  const [inWishlist, setInWishlist] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(requests.requestTrending);
        const data = await res.json();
        const results = data?.results || [];
        const randomMovie = results[Math.floor(Math.random() * results.length)];
        if (!cancelled) {
          setMovie(randomMovie);
          if (randomMovie?.id) {
            setInWishlist(isInWishlist(randomMovie.id));
          }
        }
      } catch (err) {
        console.error('Failed to fetch trending movie:', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchData();
    return () => { cancelled = true; };
  }, []);

  // subscribe so if wishlist changes elsewhere, the hero updates its button state
  useEffect(() => {
    if (!movie?.id) return undefined;
    const unsub = subscribeWishlist(() => {
      setInWishlist(isInWishlist(movie.id));
    });
    return () => unsub();
  }, [movie?.id]);

  const truncateString = (str, num) => {
    if (!str) return '';
    return str.length > num ? str.slice(0, num) + '...' : str;
  };

  const toggleWishlist = (e) => {
    e?.stopPropagation?.();
    if (!movie || !movie.id) return;

    if (isInWishlist(movie.id)) {
      removeFromWishlist(movie.id);
      setInWishlist(false);
    } else {
      addToWishlist({
        id: movie.id,
        title: movie.title || movie.name,
        poster_path: movie.poster_path || movie.backdrop_path || null,
      });
      setInWishlist(true);
    }
  };

  if (loading || !movie) {
    return (
      <div className="w-full h-[550px] text-white relative">
        <div className="absolute inset-0">
          <div className="skeleton skeleton-image" />
        </div>
        <div className="main-overlay absolute w-full top-[30%] px-8 md:px-16">
          <div style={{ maxWidth: 900 }}>
            <div className="skeleton-line long" style={{ height: 36, borderRadius: 8 }} />
            <div style={{ marginTop: 12, display: 'flex', gap: 12 }}>
              <div className="skeleton-button" />
              <div className="skeleton-button" style={{ minWidth: 84 }} />
            </div>
            <div style={{ marginTop: 14 }}>
              <div className="skeleton-line medium" />
              <div className="skeleton-line short" style={{ marginTop: 8 }} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const backdropUrl = movie?.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : null;

  return (
    <div className="w-full h-[550px] text-white relative">
      <div className="absolute inset-0 bg-gradient-to-r from-black/95 to-black/40 z-10" />

      {backdropUrl ? (
        <img
          src={backdropUrl}
          alt={movie?.title}
          loading="lazy"
          className={`absolute inset-0 w-full h-full object-cover z-0 blur-up ${posterLoaded ? 'loaded' : ''}`}
          onLoad={() => setPosterLoaded(true)}
        />
      ) : (
        <div className="absolute inset-0 bg-gray-800" />
      )}

      <div className="main-overlay absolute w-full top-[30%] px-8 md:px-16 z-20">
        <h1 className="text-3xl md:text-5xl font-bold">{movie?.title}</h1>

        <div className="my-4 flex gap-3">
          <button
            onClick={() => navigate(PATHS.WATCH(movie.id))}
            className="bg-gray-300 text-black py-2 px-5 rounded font-semibold hover:bg-white transition"
            aria-label={`Watch ${movie?.title}`}
          >
            Watch Now
          </button>

          <button
            onClick={toggleWishlist}
            className={`px-5 py-2 rounded font-semibold transition ${
              inWishlist ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-transparent border border-white/30 text-white hover:bg-white/5'
            }`}
            aria-pressed={inWishlist}
            aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            {inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
          </button>
        </div>

        <p className="text-gray-400 text-sm mb-2">Released: {movie?.release_date}</p>
        <p className="w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200">
          {truncateString(movie?.overview, 160)}
        </p>
      </div>
    </div>
  );
};

export default Main;
