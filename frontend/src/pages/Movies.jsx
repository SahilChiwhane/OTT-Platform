// src/pages/Movies.jsx
import React from 'react';
import Sidebar from '../components/Sidebar';
import requests from '../assets/Requests';
import Carousel from '../components/Carousel';
import Main from '../components/Main';
import Footer from '../components/Footer';

const Movies = () => {
  return (
    <div className="h-screen bg-black">
      <div className="h-[100%] flex">
        <Sidebar />
        <div className="w-[100%] justify-around overflow-y-auto">
          <Main />

          {/* Use the same Carousel component as Home */}
          <Carousel title="Top Airing..." fetchUrl={requests.requestTrending} />
          <Carousel title="Top Rated..." fetchUrl={requests.requestTopRated} />
          <Carousel title="Upcoming..." fetchUrl={requests.requestUpcoming} />

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Movies;
