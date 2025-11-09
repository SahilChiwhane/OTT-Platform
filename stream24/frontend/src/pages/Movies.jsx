import React from 'react';
import Sidebar from '../components/Sidebar';
import requests from '../assets/Requests';
import Main from '../components/Main';
import Carousal from '../components/Carousal';
import Footer from '../components/Footer';

const Movies = () => {
  return (
    <div>
        <div className='h-screen bg-black'>
            <div className='h-[100%] flex'>
                <Sidebar />
                <div className='w-[100%] justify-around overflow-y-auto'>
                    <Main />
                    <Carousal rowId='1' title='Top Airing...' fetchURL={requests.requestTrending} />
                    <Carousal rowId='2' title='Top Rated...' fetchURL={requests.requestTopRated} />
                    <Carousal rowId='3' title='Upcoming...' fetchURL={requests.requestUpcoming} />
                    <Footer />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Movies