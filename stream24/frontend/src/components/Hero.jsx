import React from 'react';
import BGImg from '../assets/BGImg.png';
import { useNavigate } from 'react-router-dom';

const Hero = () => {

  let navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${BGImg})` }}
    >
      {/* Form Container */}
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-black text-white tracking-wider py-16 px-16 text-center bg-opacity-100 p-8 rounded-lg shadow-lg w-full max-w-fit">
          <h2 className="text-2xl font-bold mb-6">Unlimited movies, TV shows and more</h2>
          <h4>Watch anywhere. Cancel anytime.<br />
              Ready to watch? Enter your email to create or restart your membership.</h4>

          <div className="flex flex-row mt-4 gap-4">
            <input
              id="username"
              type="text"
              placeholder="Email or Phone number"
              className="flex-1 px-3 py-2 border border-[#383838] bg-[#121212] rounded-md shadow-sm focus:outline-none focus:ring-white focus:border-[#686868] sm:text-sm text-white"
            />
            <button
              type="submit"
              onClick={handleClick}
              className="px-4 bg-blue-600 outline-none text-white font-semibold rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-offset-2"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
