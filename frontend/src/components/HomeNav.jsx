// import React from 'react';
// import { Link } from 'react-router-dom';

// const HomeNav = () => {
//   return (
//     <nav className="bg-gradient-to-b from-black via-black to-transparent py-4">
//       <div className="container mx-auto flex items-center justify-between">
//         <div className="flex flex-grow justify-center space-x-4">
//           <Link to="/" className="text-white tracking-wider border-b-2 border-b-white px-4 py-2">Home</Link>
//           <Link to="/movies" className="text-white tracking-wider border-2 border-transparent hover:border-b-white px-4 py-2">Movies</Link>
//           <Link to="/tvshows" className="text-white tracking-wider border-2 border-transparent hover:border-b-white px-4 py-2">TV Shows</Link>
//           <Link to="/anime" className="text-white tracking-wider border-2 border-transparent hover:border-b-white px-4 py-2">Anime</Link>
//           <Link to="/discover" className="text-white tracking-wider border-2 border-transparent hover:border-b-white px-4 py-2">Discover</Link>
//           <Link to="/trending" className="text-white tracking-wider border-2 border-transparent hover:border-b-white px-4 py-2">Trending</Link>
//         </div>
//         <div className="absolute right-5 flex-shrink-0">
//           <Link
//             to="/signin"
//             className="bg-blue-600 text-white px-4 py-2 rounded-lg tracking-wider hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             Sign In
//           </Link>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default HomeNav;












import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const HomeNav = () => {
  const [isVisible, setIsVisible] = useState(true);
  let lastScrollTop = 0;

  const handleScroll = () => {
    const currentScrollTop = window.pageYOffset;
    if (currentScrollTop > lastScrollTop) {
      // Scrolling down
      setIsVisible(false);
    } else {
      // Scrolling up
      setIsVisible(true);
    }
    lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop; // For Mobile or negative scrolling
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full bg-gradient-to-b from-black via-black to-transparent py-4 z-50 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
        
      <div className="container mx-auto flex items-center justify-between">
      <div className="text-white absolute left-10 text-xl font-semibold">YourLogo</div>
        <div className="flex flex-grow justify-center space-x-4">
          <Link
            to="/"
            className="text-white tracking-wider border-b-2 border-b-white px-4 py-2"
          >
            Home
          </Link>
          <Link
            to="/movies"
            className="text-white tracking-wider border-2 border-transparent hover:border-b-white px-4 py-2"
          >
            Movies
          </Link>
          <Link
            to="/tvshows"
            className="text-white tracking-wider border-2 border-transparent hover:border-b-white px-4 py-2"
          >
            TV Shows
          </Link>
          <Link
            to="/anime"
            className="text-white tracking-wider border-2 border-transparent hover:border-b-white px-4 py-2"
          >
            Anime
          </Link>
          <Link
            to="/discover"
            className="text-white tracking-wider border-2 border-transparent hover:border-b-white px-4 py-2"
          >
            Discover
          </Link>
          <Link
            to="/trending"
            className="text-white tracking-wider border-2 border-transparent hover:border-b-white px-4 py-2"
          >
            Trending
          </Link>
        </div>
        <div className="absolute right-10 flex-shrink-0">
          <Link
            to="/signin"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg tracking-wider hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign In
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default HomeNav;

