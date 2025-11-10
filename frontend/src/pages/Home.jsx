// src/pages/Home.jsx
import React from 'react';
import HomeNav from '../components/HomeNav';
import Hero from '../components/Hero';
import MultiDevices from '../components/MultiDevices';
import HomeSub from '../components/HomeSub';
import StreamExp from '../components/StreamExp';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className=''>
      <HomeNav />
      <Hero />
      <MultiDevices />
      <HomeSub />
      <StreamExp />
      <Footer />
    </div>
  );
};

export default Home;
