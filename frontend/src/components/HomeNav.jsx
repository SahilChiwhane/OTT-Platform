import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const HomeNav = () => {
  const [isVisible, setIsVisible] = useState(true);
  let lastScrollTop = 0;

  const handleScroll = () => {
    const currentScrollTop = window.pageYOffset;
    if (currentScrollTop > lastScrollTop) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
    lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
  };

  useEffect(() => {
    const onScroll = () => handleScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full bg-gradient-to-b from-black via-black/95 to-transparent py-3 z-50 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6">
        {/* Left Logo */}
        <div className="text-white text-xl font-semibold">Stream24</div>

        {/* Center Navigation */}
        <div className="flex flex-wrap justify-center gap-6">
          <Link to="/" className="text-white text-sm tracking-wider border-b-2 border-b-white px-2 py-1">Home</Link>
          <Link to="/movies" className="text-white text-sm tracking-wider hover:border-b-white px-2 py-1">Movies</Link>
          <Link to="/tvshows" className="text-white text-sm tracking-wider hover:border-b-white px-2 py-1">TV Shows</Link>
          <Link to="/anime" className="text-white text-sm tracking-wider hover:border-b-white px-2 py-1">Anime</Link>
          <Link to="/discover" className="text-white text-sm tracking-wider hover:border-b-white px-2 py-1">Discover</Link>
          <Link to="/trending" className="text-white text-sm tracking-wider hover:border-b-white px-2 py-1">Trending</Link>
        </div>

        {/* Right Side Buttons */}
        <div className="flex items-center space-x-4 ml-4">
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
