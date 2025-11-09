import React from 'react';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import AnimeSection from '../components/AnimeSection';
import requests from '../assets/Requests';

const Anime = () => {
  return (
    <div>
      <div className='h-screen bg-black'>
            <div className='h-[100%] flex'>
                <Sidebar />
                <div className='w-[100%] justify-around overflow-y-auto'>
                    <div className='mt-2'>
                      <AnimeSection rowId='1' title='Top Anime' fetchURL={requests.requestTopAnime} />
                      <AnimeSection rowId='2' title='Demon Slayer' fetchURL={requests.requestDemonSlayer} />
                      <AnimeSection rowId='3' title='Jujutsu Kaisen' fetchURL={requests.requestJK} />
                      <AnimeSection rowId='4' title='Attack on Titan' fetchURL={requests.requestAOT} />
                      <AnimeSection rowId='5' title='Naruto' fetchURL={requests.requestNaruto} />
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Anime;
