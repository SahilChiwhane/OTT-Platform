import React from 'react';
import Sidebar from '../components/Sidebar';
import requests from '../assets/requests';
import Main from '../components/Main';
import Carousel from '../components/Carousel';
import Footer from '../components/Footer';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';
import { useSearch } from '../contexts/SearchContext';

const Movies = () => {
  const { open: searchOpen, results, closeSearch } = useSearch();

  return (
    <div className="h-screen bg-black">
      <div className="h-full flex">
        <Sidebar />

        {/* right content area */}
        <div className="flex-1 relative overflow-y-auto text-white">
          {/* Overlay search bar (positioned above hero) */}
          {searchOpen && (
            <div className="absolute inset-x-0 z-50 pointer-events-none" style={{ top: '120px' }}>
              {/* container centers input and enables clicks inside */}
              <div className="pointer-events-auto">
                <SearchBar />
              </div>
            </div>
          )}

          {/* Main hero/banner (stays in normal flow) */}
          <div>
            <Main />
          </div>

          {/* If search results exist, show them; otherwise show carousels */}
          <div className="mt-8 px-6 pb-20">
            {results ? (
              <>
                <h2 className="text-2xl font-bold mb-4">Search Results</h2>
                {results.length ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {results.map(movie => <MovieCard key={movie.id} movie={movie} />)}
                  </div>
                ) : (
                  <div className="text-gray-400 py-8">No results found.</div>
                )}
              </>
            ) : (
              <>
                <Carousel title="Top Airing..." fetchUrl={requests.requestTrending} />
                <Carousel title="Top Rated..." fetchUrl={requests.requestTopRated} />
                <Carousel title="Upcoming..." fetchUrl={requests.requestUpcoming} />
                <Footer />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movies;
