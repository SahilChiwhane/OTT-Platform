// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import requests from '../assets/Requests'; // Import your requests file

// const MovieDetail = () => {
//     const { id } = useParams(); // Get the movie ID from URL
//     const [movie, setMovie] = useState(null);
//     const [video, setVideo] = useState(null);

//     useEffect(() => {
//         const fetchMovieData = async () => {
//             try {
//                 // Fetch movie details
//                 const movieResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${requests.apiKey}&language=en-US`);
//                 setMovie(movieResponse.data);

//                 // Fetch movie videos
//                 const videoResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${requests.apiKey}&language=en-US`);
//                 const videos = videoResponse.data.results;
                
//                 // Filter for trailers
//                 const trailer = videos.find(video => video.type === 'Trailer' && video.site === 'YouTube');
                
//                 if (trailer) {
//                     setVideo(trailer); // Set the first trailer found
//                 }
//             } catch (error) {
//                 console.error("Error fetching movie details or videos:", error);
//             }
//         };

//         fetchMovieData();
//     }, [id]);

//     if (!movie) return <div>Loading...</div>;

//     return (
//         <div className='p-4 bg-black text-white'>
            
//             {video ? (
//                 <div className='h-[100vh] relative'>
//                     <iframe
//                         className='w-full h-full mt-2 rounded'
//                         src={`https://www.youtube.com/embed/${video.key}?autoplay=1&modestbranding=1&playsinline=1&rel=0`}
//                         title={movie.title}
//                         frameBorder="0"
//                         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                         allowFullScreen
//                     ></iframe>
//                 </div>
//             ) : (
//                 <p className='mt-4'>No trailer available</p>
                
//             )}

//             <div className='flex flex-row p-10'>
//                 <div className='mx-auto'>
//                     <h1 className='text-2xl font-bold mb-4'>{movie.title}</h1>
//                     <p className='text-lg mb-4'>{movie.overview}</p>
//                     <p className='text-base'><span className='font-semibold'>Release Date: </span> {movie.release_date}</p>
//                 </div>
//                 <div className='lg:w-1/3 lg:pl-6 mt-6 lg:mt-0'>
//                 <img 
//                     className='w-[200px] rounded'
//                     src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} 
//                     alt={movie.name} 
//                 />
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default MovieDetail;





// src/pages/MovieDetail.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import requests from '../assets/requests'; // your requests file
import { addToWishlist, removeFromWishlist, isInWishlist, subscribeWishlist } from '../utils/wishlist';


// Wishlist helpers (make sure src/utils/wishlist.js exists and exports these)
import { addToWishlist, removeFromWishlist, isInWishlist } from '../utils/wishlist';

const MovieDetail = () => {
  const { id } = useParams(); // Get the movie ID from URL
  const [movie, setMovie] = useState(null);
  const [video, setVideo] = useState(null);
  const [inWishlist, setInWishlist] = useState(false); // local state for wishlist button
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        setLoading(true);
        // Fetch movie details
        const movieResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${requests.apiKey}&language=en-US`
        );
        setMovie(movieResponse.data);

        // Fetch movie videos
        const videoResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${requests.apiKey}&language=en-US`
        );
        const videos = videoResponse.data.results || [];

        // Prefer official YouTube trailer, fallback to any YouTube
        const trailer =
          videos.find(v => v.type === 'Trailer' && v.site === 'YouTube' && v.official === true) ||
          videos.find(v => v.type === 'Trailer' && v.site === 'YouTube') ||
          videos.find(v => v.site === 'YouTube');

        if (trailer) setVideo(trailer);
        else setVideo(null);

        // set wishlist state (only after movie loaded)
        if (movieResponse.data?.id) {
          setInWishlist(isInWishlist(movieResponse.data.id));
        }
      } catch (error) {
        console.error('Error fetching movie details or videos:', error);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
        if (!movie?.id) return;
            const unsub = subscribeWishlist(() => setInWishlist(isInWishlist(movie.id)));
            return () => unsub();
    }, [movie?.id]);


    fetchMovieData();
    // re-run when id changes
  }, [id]);

  // Toggle wishlist add/remove
  const handleWishlistToggle = (e) => {
    e?.stopPropagation?.();
    if (!movie || !movie.id) return;

    if (inWishlist) {
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

    // other parts of app (e.g. Wishlist page) should update via subscribeWishlist if implemented
  };

  if (loading) return <div className="p-4 bg-black text-white">Loading...</div>;
  if (!movie) return <div className="p-4 bg-black text-white">Movie not found.</div>;

  return (
    <div className="p-4 bg-black text-white min-h-screen">
      {/* Player / Trailer area */}
      {video ? (
        <div className="h-[60vh] md:h-[80vh] relative mb-6">
          <iframe
            className="w-full h-full rounded"
            src={`https://www.youtube.com/embed/${video.key}?autoplay=1&modestbranding=1&playsinline=1&rel=0`}
            title={movie.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          {/* Wishlist button overlay top-left of the player (adjust classes to match your design) */}
          <div className="absolute left-6 top-6">
            <button
              onClick={handleWishlistToggle}
              aria-pressed={inWishlist}
              aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
              className={`px-4 py-2 rounded-md font-medium transition
                ${inWishlist ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-transparent border border-white/30 text-white hover:bg-white/5'}
              `}
            >
              {inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
            </button>
          </div>
        </div>
      ) : (
        <div className="mb-6">
          <p className="mt-4">No trailer available</p>

          {/* Show wishlist button here too so button is visible even when no trailer */}
          <div className="mt-4">
            <button
              onClick={handleWishlistToggle}
              aria-pressed={inWishlist}
              aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
              className={`px-4 py-2 rounded-md font-medium transition
                ${inWishlist ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-transparent border border-white/30 text-white hover:bg-white/5'}
              `}
            >
              {inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
            </button>
          </div>
        </div>
      )}

      {/* Details */}
      <div className="flex flex-col lg:flex-row gap-8 p-6 bg-transparent">
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{movie.title}</h1>
          <p className="text-lg mb-4">{movie.overview}</p>
          <p className="text-base">
            <span className="font-semibold">Release Date: </span> {movie.release_date}
          </p>
        </div>

        <div className="lg:w-1/3 lg:pl-6 mt-6 lg:mt-0">
          {movie.poster_path ? (
            <img
              className="w-[200px] rounded"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
          ) : (
            <div className="w-[200px] h-[300px] bg-gray-800 rounded flex items-center justify-center text-gray-400">No poster</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
