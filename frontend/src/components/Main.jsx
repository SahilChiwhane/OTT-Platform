// // import React, { useEffect, useState } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import axios from 'axios';
// // import requests from '../assets/Requests';

// // const Main = () => {
// //     const [movies, setMovies] = useState([]);
// //     const navigate = useNavigate();

// //     const movie = movies[Math.floor(Math.random() * movies.length)];

// //     useEffect(() => {
// //         axios.get(requests.requestPopular)
// //             .then((response) => {
// //                 setMovies(response.data.results);
// //             });
// //     }, []);

// //     console.log(movie);

// //     const truncateString = (str, num) => {
// //         return str?.length > num ? str.slice(0, num) + "..." : str;
// //     };

// //     const handleWatchNow = () => {
// //         if (movie?.id) {
// //             navigate(`/video/${movie.id}`);
// //         }
// //     };

// //     return (
// //         <div className='content'>
// //             <div className='content-box relative z-50'>
// //                 <div className='opacity-40'>
// //                     <img className='content-poster' src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`} alt={movie?.title} />
// //                 </div>
// //                 <div className='absolute justify-start px-10 bottom-10 text-white'>
// //                     <div className='flex gap-5 font-semibold tracking-wider'>
// //                         <p> Home </p>
// //                         <p> ● Movies </p>
// //                         <p className='text-[#a3a3a3]'> ● {truncateString(movie?.title, 24)} </p>
// //                     </div>
// //                     <h1 className='my-2 text-2xl font-extrabold tracking-wider'> {movie?.title} </h1>
// //                     <div className='flex gap-2 my-3 text-black font-normal'>
// //                         <p className='px-2 bg-white rounded'> HD </p>
// //                         <p className='px-2 bg-white rounded'> 1 </p>
// //                         <p className='px-2 bg-white rounded'> Movie </p>
// //                         <p className='px-2 bg-white rounded'> 2h 30m </p>
// //                     </div>
// //                     <div className='w-[50%] my-4'>
// //                         <p>{truncateString(movie?.overview, 180)}</p>
// //                     </div>
// //                     <div className='flex gap-2 my-2 text-black font-semibold tracking-wider ease-in-out hover:ease-in-out'>
// //                         <button onClick={handleWatchNow} className='px-4 py-2 bg-white rounded-md hover:bg-[#c9c9c9]'>▶ Watch now</button>
// //                         <button className='px-4 py-2 bg-white rounded-md hover:bg-[#c9c9c9]'> + Add to List</button>
// //                         <button className='px-4 py-2 bg-white rounded-full italic hover:bg-[#c9c9c9]'>i</button>
// //                     </div>
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // };

// // export default Main;




// // src/components/Main.jsx
// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { PATHS } from '../routes/paths';
// import requests from '../assets/Requests';
// import tmdb from '../api/tmdb'; // optional if you plan dynamic fetches
// import { useEffect, useState } from 'react';

// const Main = () => {
//   const [movie, setMovie] = useState(null);
//   const navigate = useNavigate();

//   // ✅ Fetch a random trending movie for the main poster
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await fetch(requests.requestTrending);
//         const data = await res.json();
//         const results = data?.results || [];
//         const randomMovie = results[Math.floor(Math.random() * results.length)];
//         setMovie(randomMovie);
//       } catch (err) {
//         console.error('Failed to fetch trending movie:', err);
//       }
//     };
//     fetchData();
//   }, []);

//   // ✅ Helper function to truncate long overviews
//   const truncateString = (str, num) => {
//     if (!str) return '';
//     return str.length > num ? str.slice(0, num) + '...' : str;
//   };

//   if (!movie) {
//     return (
//       <div className="w-full h-[550px] bg-black flex items-center justify-center">
//         <p className="text-gray-400 text-lg">Loading...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full h-[550px] text-white relative">
//       {/* Background Image */}
//       <div className="absolute w-full h-full bg-gradient-to-r from-black"></div>
//       <img
//         className="w-full h-full object-cover"
//         src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
//         alt={movie?.title}
//         loading="lazy"
//       />

//       {/* Overlay content */}
//       <div className="absolute w-full top-[30%] px-8 md:px-16">
//         <h1 className="text-3xl md:text-5xl font-bold">{movie?.title}</h1>
//         <div className="my-4 flex gap-3">
//           {/* ✅ Watch Now Button — navigates to canonical /watch/:id */}
//           <button
//             onClick={() => navigate(PATHS.WATCH(movie.id))}
//             className="bg-gray-300 text-black py-2 px-5 rounded font-semibold hover:bg-white transition"
//           >
//             Watch Now
//           </button>

//           {/* Add to List (future feature) */}
//           <button
//             onClick={() => alert('Feature coming soon!')}
//             className="bg-transparent border border-gray-400 py-2 px-5 rounded font-semibold text-white hover:bg-gray-600 transition"
//           >
//             + My List
//           </button>
//         </div>

//         <p className="text-gray-400 text-sm mb-2">
//           Released: {movie?.release_date}
//         </p>
//         <p className="w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200">
//           {truncateString(movie?.overview, 160)}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Main;





// src/components/Main.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../routes/paths';
import requests from '../assets/requests';

const Main = () => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [posterLoaded, setPosterLoaded] = useState(false);
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

  const truncateString = (str, num) => {
    if (!str) return '';
    return str.length > num ? str.slice(0, num) + '...' : str;
  };

  // Render skeleton while fetching (YouTube-like)
  if (loading || !movie) {
    return (
      <div className="w-full h-[550px] text-white relative">
        <div className="absolute inset-0">
          {/* Poster skeleton */}
          <div className="skeleton skeleton-image" />
        </div>

        {/* overlay content skeleton */}
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

  // When movie is loaded, show blur-up poster and overlay
  const backdropUrl = movie?.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : null;

  return (
    <div className="w-full h-[550px] text-white relative">
      {/* background gradient to darken left side for overlay readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/95 to-black/40 z-10" />

      {/* Poster image with blur-up */}
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

      {/* Overlay content */}
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
            onClick={() => {
              // small visual feedback for now
              try {
                const list = JSON.parse(localStorage.getItem('myList') || '[]');
                if (!list.find((m) => m.id === movie.id)) {
                  list.unshift({ id: movie.id, title: movie.title });
                  localStorage.setItem('myList', JSON.stringify(list));
                  alert('Added to My List');
                } else {
                  alert('Already in My List');
                }
              } catch (err) {
                alert('Could not update list');
              }
            }}
            className="bg-transparent border border-gray-400 py-2 px-5 rounded font-semibold text-white hover:bg-gray-600 transition"
            aria-label={`Add ${movie?.title} to My List`}
          >
            + My List
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
