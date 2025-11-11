// import React, { useState } from 'react';
// import tmdb from '../api/tmdb';
// import { FaSearch, FaTimes } from 'react-icons/fa';

// /**
//  * Props:
//  *  - onResults(resultsArray)  -> callback when search finishes
//  *  - onClear()                -> callback when search is cleared
//  *
//  * This component performs a realtime search on submit (Enter) or form submit.
//  * It does NOT navigate away; it passes results to parent which decides how to display.
//  */

// const SearchBar = ({ onResults = () => {}, onClear = () => {} }) => {
//   const [query, setQuery] = useState('');
//   const [loading, setLoading] = useState(false);

//   const doSearch = async (q) => {
//     const trimmed = (q || '').trim();
//     if (!trimmed) {
//       // clear results
//       onClear();
//       return;
//     }

//     try {
//       setLoading(true);
//       const res = await tmdb.get(`/search/movie`, {
//         params: {
//           api_key: process.env.REACT_APP_TMDB_KEY,
//           query: trimmed,
//           language: 'en-US',
//           page: 1,
//           include_adult: false,
//         },
//       });

//       const results = res?.data?.results || [];
//       onResults(results);
//     } catch (err) {
//       console.error('Search error', err);
//       onResults([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const onSubmit = (e) => {
//     e.preventDefault();
//     doSearch(query);
//   };

//   const clear = (e) => {
//     e?.preventDefault();
//     setQuery('');
//     onClear();
//   };

//   return (
//     <form onSubmit={onSubmit} className="max-w-2xl mx-auto">
//       <div className="flex items-center bg-[#121212] border border-[#222] rounded-full px-4 py-3 shadow-sm">
//         <FaSearch className="text-gray-400 mr-3" />
//         <input
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           placeholder="Search for movies..."
//           className="flex-1 bg-transparent outline-none text-gray-200 placeholder-gray-500"
//           aria-label="Search movies"
//         />
//         {query ? (
//           <button onClick={clear} aria-label="Clear search" className="ml-3 text-gray-400">
//             <FaTimes />
//           </button>
//         ) : (
//           <button
//             type="submit"
//             className="ml-3 bg-blue-600 px-4 py-1 rounded-full text-white hover:bg-blue-700"
//             aria-label="Search"
//           >
//             {loading ? '...' : 'Search'}
//           </button>
//         )}
//       </div>
//     </form>
//   );
// };

// export default SearchBar;













// src/components/SearchBar.jsx
import React, { useEffect, useRef, useState } from 'react';
import tmdb from '../api/tmdb';
import { useSearch } from '../contexts/SearchContext';
import { FaTimes, FaSearch } from 'react-icons/fa';

const DEBOUNCE_MS = 350;

const SearchBar = () => {
  const { query, setSearchQuery, setSearchResults, closeSearch } = useSearch();
  const [local, setLocal] = useState(query || '');
  const [loading, setLoading] = useState(false);
  const timerRef = useRef(null);
  const containerRef = useRef(null);

  // close on Escape and click outside
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') closeSearch(); };
    const onClick = (e) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target)) closeSearch();
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('mousedown', onClick);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('mousedown', onClick);
    };
  }, [closeSearch]);

  useEffect(() => {
    // debounce searching
    clearTimeout(timerRef.current);
    if (!local || local.trim() === '') {
      setSearchResults(null);
      setSearchQuery('');
      return;
    }

    timerRef.current = setTimeout(async () => {
      try {
        setLoading(true);
        setSearchQuery(local);
        // use your tmdb wrapper. endpoint: /search/movie?query=...
        const res = await tmdb.get(`/search/movie`, {
          params: { query: local, language: 'en-US', page: 1, include_adult: false }
        });
        setSearchResults(res.data.results || []);
      } catch (err) {
        console.error('Search failed', err);
        setSearchResults([]);
      } finally {
        setLoading(false);
      }
    }, DEBOUNCE_MS);

    return () => clearTimeout(timerRef.current);
  }, [local, setSearchQuery, setSearchResults]);

  return (
    <div ref={containerRef} className="w-full flex justify-center">
      {/* center container; pointer-events-auto ensures it receives clicks even if parent is pointer-events-none */}
      <div className="w-[64%] md:w-[50%] lg:w-[40%]">
        <div className="flex items-center border border-[#333] rounded-full px-4 py-3 bg-transparent">
          <FaSearch className="mr-3 text-gray-300" />
          <input
            autoFocus
            value={local}
            onChange={(e) => setLocal(e.target.value)}
            className="w-full bg-transparent outline-none text-white placeholder:text-gray-400"
            placeholder="Search for movies..."
            aria-label="Search movies"
          />
          {local && (
            <button onClick={() => { setLocal(''); setSearchResults(null); }} className="ml-3">
              <FaTimes className="text-gray-400" />
            </button>
          )}
        </div>
        {loading && <div className="text-sm text-gray-400 mt-2">Searching...</div>}
      </div>
    </div>
  );
};

export default SearchBar;
