import React from 'react';
import X from '../assets/X.png';
import fb from '../assets/fb.png';
import linkedin from '../assets/linkedin.png';
import instagram from '../assets/instagram.png';

const Footer = () => {
  return (
    <div className='bg-[#121212] py-12 mb-2 text-[#787878] flex flex-row px-12 gap-20 tracking-wider'>
        <div className='flex flex-col gap-2'>
            <h className='font-semibold'>Company</h>
            <p className='cursor-pointer hover:text-white'>Terms and Conditions</p>
            <p className='cursor-pointer hover:text-white'>Privacy Policy</p>
        </div>
        <div className='flex flex-col gap-2'>
            <h className='font-semibold'>Support</h>
            <p className='cursor-pointer hover:text-white'>Help</p>
            <p className='cursor-pointer hover:text-white'>Contact Us</p>
        </div>
        <div className='right-32'>
            <h className='font-semibold'>Follow us on</h>
            <div className='flex flex-row gap-4 mt-4 cursor-pointer'>
                <img className='h-6 opacity-40 hover:opacity-80' src={X} />
                <img className='h-6 opacity-40 hover:opacity-80' src={fb} />
                <img className='h-6 opacity-40 hover:opacity-80' src={instagram} />
                <img className='h-6 opacity-40 hover:opacity-80' src={linkedin} />
            </div>
        </div>
    </div>
  )
}

export default Footer