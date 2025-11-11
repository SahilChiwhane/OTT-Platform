import React from 'react';
import Sidebar from '../components/Sidebar';
import requests from '../assets/requests';
import ShowsMain from '../components/ShowsMain';
import TvSection from '../components/TvSection';
import Footer from '../components/Footer';

const TvSeries = () => {
  return (
    <div>
        <div className='h-screen bg-black'>
            <div className='h-[100%] flex'>
                <Sidebar />
                <div className='w-[100%] justify-around overflow-y-auto'>
                    <ShowsMain />
                    <TvSection rowId='1' title='Top Rated...' fetchURL={requests.requestTvTopRated} />
                    {/* <TvSection rowId='2' title='Airing...' fetchURL={requests.requestTvAiring} /> */}
                    {/* <TvSection rowId='3' title='Airing Soon...' fetchURL={requests.requestTvAiringSoon} /> */}
                    <Footer />
                </div>
            </div>
        </div>
    </div>
  )
}

export default TvSeries