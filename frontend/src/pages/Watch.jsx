// src/pages/Watch.jsx
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import tmdb from '../api/tmdb';

/**
 * Watch page — trailer + details
 * - Reduced poster size (more balanced layout)
 * - Clean, responsive, minimal
 */
export default function Watch() {
  const { id } = useParams();
  const iframeRef = useRef(null);
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [muted] = useState(true);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        setError(null);
        const [detailsRes, videosRes] = await Promise.all([
          tmdb.get(`/movie/${id}`),
          tmdb.get(`/movie/${id}/videos`),
        ]);
        if (cancelled) return;
        setMovie(detailsRes.data);

        const videos = videosRes.data?.results || [];
        const trailer =
          videos.find(v => v.site === 'YouTube' && v.type === 'Trailer' && v.official === true) ||
          videos.find(v => v.site === 'YouTube' && v.type === 'Trailer') ||
          videos.find(v => v.site === 'YouTube');

        setTrailerKey(trailer ? trailer.key : null);
      } catch (err) {
        console.error('Watch fetch error:', err);
        if (!cancelled) setError('Failed to load movie details or trailer.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) return <div className="w-full min-h-screen bg-black flex items-center justify-center text-gray-400">Loading...</div>;
  if (error) return <div className="w-full min-h-screen bg-black flex items-center justify-center text-red-500">{error}</div>;
  if (!movie) return <div className="w-full min-h-screen bg-black flex items-center justify-center text-gray-400">No movie found.</div>;

  const posterUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null;
  const backdropUrl = movie.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : null;
  const embedSrc = trailerKey
    ? `https://www.youtube-nocookie.com/embed/${trailerKey}?autoplay=1&mute=${muted ? 1 : 0}&rel=0&modestbranding=1&controls=1`
    : null;

  const handlePlayClick = () => {
    if (!trailerKey) {
      setError('No trailer available for this movie.');
      return;
    }
    setIsPlaying(true);
    setTimeout(() => {
      try {
        if (iframeRef.current) iframeRef.current.focus();
      } catch (e) {}
    }, 300);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center gap-6 pb-12">
      {/* Player */}
      <div className="w-full relative bg-black aspect-video max-w-[1280px]">
        {!isPlaying ? (
          <>
            {backdropUrl ? (
              <img src={backdropUrl} alt={movie.title} className="w-full h-full object-cover opacity-75" />
            ) : (
              <div className="w-full h-full bg-[#111]" />
            )}

            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={handlePlayClick}
                className="bg-white text-black px-6 py-3 rounded-lg text-lg font-semibold shadow-lg"
                aria-label="Play trailer"
              >
                ▶ Play Trailer
              </button>
            </div>
          </>
        ) : (
          <>
            {embedSrc ? (
              <iframe
                ref={iframeRef}
                title={movie.title || 'Trailer'}
                src={embedSrc}
                width="100%"
                height="100%"
                allow="autoplay; fullscreen"
                allowFullScreen
                frameBorder="0"
                style={{ display: 'block' }}
              />
            ) : (
              <div className="w-full h-full bg-[#111] flex items-center justify-center">
                <p className="text-gray-400">Trailer unavailable</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Details */}
      <div className="max-w-[1100px] w-full px-6">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <div className="md:w-1/4 w-full flex-shrink-0 flex justify-center">
            {posterUrl ? (
              <img
                src={posterUrl}
                alt={`${movie.title} poster`}
                className="rounded-md shadow-lg max-w-[180px] w-full object-cover"
              />
            ) : (
              <div className="w-full h-64 bg-[#1b1b1b] rounded-md flex items-center justify-center text-gray-500">
                No poster
              </div>
            )}
          </div>

          {/* Description */}
          <div className="md:w-3/4 w-full">
            <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
            {movie.tagline && <p className="text-gray-400 mb-4 italic">{movie.tagline}</p>}

            <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-300">
              <span><strong>Release:</strong> {movie.release_date}</span>
              <span><strong>Runtime:</strong> {movie.runtime ? `${movie.runtime} min` : 'N/A'}</span>
              <span><strong>Rating:</strong> ⭐ {movie.vote_average?.toFixed(1)}</span>
            </div>

            <p className="leading-relaxed text-gray-200">{movie.overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
