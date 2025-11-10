// // import React, { useEffect, useRef, useState } from 'react';
// // import tmdb from '../api/tmdb';
// // import MovieCard from './MovieCard';
// // import { ChevronLeft, ChevronRight } from 'lucide-react';
// // import { motion } from 'framer-motion';

// // const Carousel = ({ title, fetchUrl }) => {
// //   const [movies, setMovies] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const carouselRef = useRef(null);

// //   useEffect(() => {
// //     let mounted = true;
// //     const fetchMovies = async () => {
// //       try {
// //         setLoading(true);
// //         const res = await tmdb.get(fetchUrl);
// //         if (!mounted) return;
// //         setMovies(res.data.results || []);
// //       } catch (error) {
// //         console.error(`Error fetching ${title}:`, error);
// //       } finally {
// //         if (mounted) setLoading(false);
// //       }
// //     };
// //     fetchMovies();
// //     return () => {
// //       mounted = false;
// //     };
// //   }, [fetchUrl, title]);

// //   const scroll = (dir) => {
// //     if (!carouselRef.current) return;
// //     const { scrollLeft, clientWidth } = carouselRef.current;
// //     const amount = dir === 'left' ? -clientWidth : clientWidth;
// //     carouselRef.current.scrollTo({
// //       left: scrollLeft + amount,
// //       behavior: 'smooth',
// //     });
// //   };

// //   if (loading) {
// //     return (
// //       <div className="my-6 text-gray-400 px-4">
// //         <h2 className="text-xl font-semibold mb-2">{title}</h2>
// //         <div className="flex space-x-3 overflow-x-hidden">
// //           {Array(6).fill(0).map((_, i) => (
// //             <div
// //               key={i}
// //               className="bg-[#1a1a1a] w-[150px] h-[225px] animate-pulse rounded-md"
// //             />
// //           ))}
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     // overflow-hidden added to prevent page-level horizontal scrollbar from elements inside
// //     <div className="relative w-full my-8 group overflow-hidden">
// //       <h2 className="text-2xl font-bold text-white mb-3 px-4">{title}</h2>

// //       {/* Arrows (appear on hover). Keep absolute positioning to avoid layout overflow */}
// //       <motion.button
// //         whileHover={{ scale: 1.15 }}
// //         initial={{ opacity: 0, x: -12 }}
// //         animate={{ opacity: 0 }}
// //         whileInView={{ opacity: 1, x: 0 }}
// //         transition={{ duration: 0.28 }}
// //         className="carousel-arrow left absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60 hover:bg-black/80"
// //         onClick={() => scroll('left')}
// //         aria-label={`Scroll ${title} left`}
// //       >
// //         <ChevronLeft className="w-6 h-6" />
// //       </motion.button>

// //       <motion.button
// //         whileHover={{ scale: 1.15 }}
// //         initial={{ opacity: 0, x: 12 }}
// //         animate={{ opacity: 0 }}
// //         whileInView={{ opacity: 1, x: 0 }}
// //         transition={{ duration: 0.28 }}
// //         className="carousel-arrow right absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60 hover:bg-black/80"
// //         onClick={() => scroll('right')}
// //         aria-label={`Scroll ${title} right`}
// //       >
// //         <ChevronRight className="w-6 h-6" />
// //       </motion.button>

// //       {/* Movie cards
// //           - `snap-x snap-mandatory` enables scroll snapping on the x axis.
// //           - `scroll-hide` hides the native scrollbar visually.
// //           - keep px-4/padding but overflow-hidden at the root prevents page overflow.
// //       */}
// //       <div
// //         ref={carouselRef}
// //         className="flex overflow-x-auto scroll-hide px-4 space-x-4 pb-2 snap-x snap-mandatory -mx-0"
// //       >
// //         {movies.map((movie) => (
// //           // add snap-start on each item so it snaps to the card
// //           <div key={movie.id} className="flex-shrink-0 snap-start">
// //             <MovieCard movie={movie} width={150} imageSize="w300" />
// //           </div>
// //         ))}
// //       </div>

// //       {/* Edge fade shadows (purely visual) */}
// //       <div className="carousel-edge-left" />
// //       <div className="carousel-edge-right" />
// //     </div>
// //   );
// // };

// // export default Carousel;








// // src/components/Carousel.jsx
// import React, { useEffect, useRef, useState } from 'react';
// import tmdb from '../api/tmdb';
// import MovieCard from './MovieCard';
// import { ChevronLeft, ChevronRight } from 'lucide-react';
// import { motion } from 'framer-motion';

// const Carousel = ({ title, fetchUrl }) => {
//   const [movies, setMovies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const carouselRef = useRef(null);

//   useEffect(() => {
//     let mounted = true;
//     const fetchMovies = async () => {
//       try {
//         setLoading(true);
//         const res = await tmdb.get(fetchUrl);
//         if (!mounted) return;
//         setMovies(res.data.results || []);
//       } catch (error) {
//         console.error(`Error fetching ${title}:`, error);
//       } finally {
//         if (mounted) setLoading(false);
//       }
//     };
//     fetchMovies();
//     return () => {
//       mounted = false;
//     };
//   }, [fetchUrl, title]);

//   const scroll = (dir) => {
//     if (!carouselRef.current) return;
//     const { scrollLeft, clientWidth } = carouselRef.current;
//     const amount = dir === 'left' ? -clientWidth : clientWidth;
//     carouselRef.current.scrollTo({
//       left: scrollLeft + amount,
//       behavior: 'smooth',
//     });
//   };

//   if (loading) {
//     return (
//       <div className="my-6 text-gray-400 px-4">
//         <h2 className="text-xl font-semibold mb-2">{title}</h2>
//         <div className="flex space-x-3 overflow-x-hidden">
//           {Array(6).fill(0).map((_, i) => (
//             <div
//               key={i}
//               className="bg-[#1a1a1a] w-[150px] h-[225px] animate-pulse rounded-md"
//             />
//           ))}
//         </div>
//       </div>
//     );
//   }

//   return (
//     // overflow-hidden added to prevent page-level horizontal scrollbar from elements inside
//     <div className="relative w-full my-8 group overflow-hidden">
//       <h2 className="text-2xl font-bold text-white mb-3 px-4">{title}</h2>

//       {/* Arrows (appear on hover). Keep absolute positioning to avoid layout overflow */}
//       <motion.button
//         whileHover={{ scale: 1.15 }}
//         initial={{ opacity: 0, x: -12 }}
//         animate={{ opacity: 0 }}
//         whileInView={{ opacity: 1, x: 0 }}
//         transition={{ duration: 0.28 }}
//         className="carousel-arrow left absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60 hover:bg-black/80"
//         onClick={() => scroll('left')}
//         aria-label={`Scroll ${title} left`}
//       >
//         <ChevronLeft className="w-6 h-6" />
//       </motion.button>

//       <motion.button
//         whileHover={{ scale: 1.15 }}
//         initial={{ opacity: 0, x: 12 }}
//         animate={{ opacity: 0 }}
//         whileInView={{ opacity: 1, x: 0 }}
//         transition={{ duration: 0.28 }}
//         className="carousel-arrow right absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60 hover:bg-black/80"
//         onClick={() => scroll('right')}
//         aria-label={`Scroll ${title} right`}
//       >
//         <ChevronRight className="w-6 h-6" />
//       </motion.button>

//       {/* Movie cards
//           - `snap-x snap-mandatory` enables scroll snapping on the x axis.
//           - `scroll-hide` hides the native scrollbar visually.
//           - keep px-4/padding but overflow-hidden at the root prevents page overflow.
//       */}
//       <div
//         ref={carouselRef}
//         className="flex overflow-x-auto scroll-hide px-4 space-x-4 pb-2 snap-x snap-mandatory -mx-0"
//       >
//         {movies.map((movie) => (
//           // add snap-start on each item so it snaps to the card
//           <div key={movie.id} className="flex-shrink-0 snap-start">
//             <MovieCard movie={movie} width={150} imageSize="w300" />
//           </div>
//         ))}
//       </div>

//       {/* Edge fade shadows (purely visual) */}
//       <div className="carousel-edge-left" />
//       <div className="carousel-edge-right" />
//     </div>
//   );
// };

// export default Carousel;







// src/components/Carousel.jsx
import React, { useEffect, useRef, useState, useCallback } from 'react';
import tmdb from '../api/tmdb';
import MovieCard from './MovieCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Carousel = ({ title, fetchUrl }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const carouselRef = useRef(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    let mounted = true;
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const res = await tmdb.get(fetchUrl);
        if (!mounted) return;
        setMovies(res.data.results || []);
      } catch (error) {
        console.error(`Error fetching ${title}:`, error);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchMovies();
    return () => { mounted = false; };
  }, [fetchUrl, title]);

  const updateArrows = useCallback(() => {
    const el = carouselRef.current;
    if (!el) {
      setCanScrollLeft(false);
      setCanScrollRight(false);
      return;
    }
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const max = scrollWidth - clientWidth;
    // tolerate a few pixels due to rounding
    setCanScrollLeft(scrollLeft > 8);
    setCanScrollRight(scrollLeft < max - 8);
  }, []);

  // attach listeners for scroll + resize + image loads
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    // update on scroll
    el.addEventListener('scroll', updateArrows, { passive: true });
    // update on resize
    window.addEventListener('resize', updateArrows);

    // when images load inside carousel, update arrows (ensures correct scrollWidth)
    const imgs = Array.from(el.querySelectorAll('img'));
    const onImgLoad = () => requestAnimationFrame(updateArrows);

    imgs.forEach((img) => {
      if (img.complete) {
        // already loaded
      } else {
        img.addEventListener('load', onImgLoad);
        img.addEventListener('error', onImgLoad);
      }
    });

    // mutation observer in case children change
    const mo = new MutationObserver(() => requestAnimationFrame(updateArrows));
    mo.observe(el, { childList: true, subtree: true });

    // initial call (defer one frame to allow layout)
    const id = setTimeout(() => updateArrows(), 120);

    return () => {
      el.removeEventListener('scroll', updateArrows);
      window.removeEventListener('resize', updateArrows);
      imgs.forEach((img) => {
        img.removeEventListener('load', onImgLoad);
        img.removeEventListener('error', onImgLoad);
      });
      mo.disconnect();
      clearTimeout(id);
    };
  }, [updateArrows, movies.length]);

  // also run updateArrows whenever movies array changes (after fetch)
  useEffect(() => {
    // delay a bit to let images start loading
    const id = setTimeout(() => updateArrows(), 120);
    return () => clearTimeout(id);
  }, [movies, updateArrows]);

  const scroll = (dir) => {
    const el = carouselRef.current;
    if (!el) return;
    const { scrollLeft, clientWidth } = el;
    const amount = dir === 'left' ? -clientWidth : clientWidth;
    el.scrollTo({ left: scrollLeft + amount, behavior: 'smooth' });
  };

  const handleArrowClick = (dir) => {
    scroll(dir);
    // schedule a check after the smooth scroll should have progressed
    setTimeout(() => updateArrows(), 350);
  };

  if (loading) {
    return (
      <div className="my-6 text-gray-400 px-4">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <div className="flex space-x-3 overflow-x-hidden">
          {Array(6).fill(0).map((_, i) => (
            <div key={i} className="bg-[#1a1a1a] w-[150px] h-[225px] animate-pulse rounded-md" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full my-8 group overflow-hidden">
      <h2 className="text-2xl font-bold text-white mb-3 px-4">{title}</h2>

      {/* Left arrow */}
      <button
        onClick={() => canScrollLeft && handleArrowClick('left')}
        aria-label={`Scroll ${title} left`}
        aria-disabled={!canScrollLeft}
        className={`carousel-arrow left absolute transition-opacity duration-300 ${
          canScrollLeft ? 'opacity-90 group-hover:opacity-100' : 'opacity-30 pointer-events-none'
        }`}
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Right arrow */}
      <button
        onClick={() => canScrollRight && handleArrowClick('right')}
        aria-label={`Scroll ${title} right`}
        aria-disabled={!canScrollRight}
        className={`carousel-arrow right absolute transition-opacity duration-300 ${
          canScrollRight ? 'opacity-90 group-hover:opacity-100' : 'opacity-30 pointer-events-none'
        }`}
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Movie cards container */}
      <div
        ref={carouselRef}
        className="flex overflow-x-auto scroll-hide px-4 space-x-4 pb-2 snap-x snap-mandatory -mx-0"
      >
        {movies.map((movie) => (
          <div key={movie.id} className="flex-shrink-0 snap-start">
            <MovieCard movie={movie} width={150} imageSize="w300" />
          </div>
        ))}
      </div>

      <div className="carousel-edge-left" />
      <div className="carousel-edge-right" />
    </div>
  );
};

export default Carousel;
