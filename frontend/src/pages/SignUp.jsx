import React from 'react';
import BGImg from '../assets/BGImg.png';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {

  let navigate = useNavigate();

  const handleClick = () => {
    navigate('/signin');
  };


  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${BGImg})` }}
    >
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full bg-gradient-to-b from-black via-black to-transparent py-4 px-6 flex justify-between items-center text-white">
        <div className="text-xl mt-5 font-semibold">YourLogo</div>
        <a href="/signin" className="text-white py-2 mt-5 px-5 rounded-lg tracking-widest bg-blue-600 hover:bg-blue-700">Sign In</a>
      </nav>

      {/* Form Container */}
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-black bg-opacity-100 px-12 py-12 rounded-lg shadow-lg w-full max-w-xl">
          <h2 className="text-white text-2xl font-bold mb-6 text-center tracking-wider">Sign Up</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">
                Username
              </label>
              <input
                id="username"
                type="text"
                // placeholder="Enter your username"
                className="mt-1 block w-full px-3 tracking-wider py-2 border border-[#383838] bg-[#121212] rounded-md shadow-sm focus:outline-none focus:ring-white focus:border-[#686868] sm:text-sm text-white"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                // placeholder="Enter your email"
                className="mt-1 block w-full px-3 py-2 tracking-wider border border-[#383838] bg-[#121212] rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-[#686868] sm:text-sm text-white"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="mobile" className="block text-sm font-medium text-gray-300 mb-1">
                Mobile Number
              </label>
              <input
                id="mobile"
                type="tel"
                // placeholder="Enter your mobile number"
                className="mt-1 block w-full px-3 py-2 tracking-wider border border-[#383838] bg-[#121212] rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-[#686868] sm:text-sm text-white"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                // placeholder="Enter your password"
                className="mt-1 block w-full px-3 py-2 tracking-wider border border-[#383838] bg-[#121212] rounded-md shadow-sm focus:outline-none focus:ring-white focus:border-[#686868] sm:text-sm text-white"
              />
            </div>

            <button
              type="submit"
              onClick={handleClick}
              className="w-full py-2 px-4 bg-blue-600 tracking-wider text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-offset-2"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-4 text-center text-[#545454] tracking-wider text-sm">
            Already Registered? <a href="/signin" className="text-blue-600 tracking-wider hover:text-blue-700">Sign in here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
