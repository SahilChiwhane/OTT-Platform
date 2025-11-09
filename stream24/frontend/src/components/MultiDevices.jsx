import React from 'react';
import Device from '../assets/Device.png';

const MultiDevices = () => {
  return (
    <div className='bg-black relative text-white text-center flex items-center justify-center min-h-screen'>
        <div className='py-32 text-center'>
            <h2 className='text-4xl font-bold'>Watch on Every Device</h2>
            <h4 className='text-lg mt-4'>Stream unlimited movies, TV shows, and anime on your phone, tablet, laptop, and TV.</h4>
            <img className='mt-8 mx-auto' src={Device} alt="Devices" />
        </div>
    </div>
  )
}

export default MultiDevices