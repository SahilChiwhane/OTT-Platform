// // import React from 'react';
// // import BGImg from '../assets/BGImg.png';
// // import { useNavigate } from 'react-router-dom';

// // const SignIn = () => {

// //   let navigate = useNavigate();

// //   const handleClick = () => {
// //     navigate('/movies');
// //   };

// //   return (
// //     <div
// //       className="relative min-h-screen bg-cover bg-center"
// //       style={{ backgroundImage: `url(${BGImg})` }}
// //     >
// //       {/* Navbar */}
// //       <nav className="absolute top-0 left-0 w-full bg-gradient-to-b from-black via-black to-transparent py-4 px-6 flex justify-between items-center text-white">
// //         <div className="text-xl mt-5 font-semibold">YourLogo</div>
// //         <a href="/sign-in" className="text-white mt-5 py-2 px-5 rounded-lg tracking-widest bg-blue-600 hover:bg-blue-700">Sign Up</a>
// //       </nav>

// //       {/* Form Container */}
// //       <div className="flex items-center justify-center min-h-screen">
// //         <div className="bg-black px-12 py-12 rounded-lg shadow-lg w-full max-w-xl">
// //           <h2 className="text-white text-2xl font-bold mb-6 text-center tracking-wider">Sign In</h2>
// //           <form>
// //             <div className="mb-4">
// //               <input
// //                 id="username"
// //                 type="text"
// //                 placeholder="Enter your username"
// //                 className="mt-1 block w-full px-3 tracking-wider py-2 border border-[#383838] bg-[#121212] rounded-md shadow-sm focus:outline-none focus:ring-white focus:border-[#686868] sm:text-sm text-white"
// //               />
// //             </div>

// //             <div className="mb-6">
// //               <input
// //                 id="password"
// //                 type="password"
// //                 placeholder="Enter your password"
// //                 className="mt-1 block w-full px-3 py-2 tracking-wider border border-[#383838] bg-[#121212] rounded-md shadow-sm focus:outline-none focus:ring-white focus:border-[#686868] sm:text-sm text-white"
// //               />
// //             </div>

// //             <button
// //               type="submit"
// //               onClick={handleClick}
// //               className="w-full py-2 px-4 bg-blue-600 tracking-wider text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-offset-2"
// //             >
// //               Sign In
// //             </button>
// //           </form>

// //           <p className="mt-4 text-center text-[#545454] tracking-wider text-sm">
// //             New to Stream24? <a href="/signup" className="text-blue-600 tracking-wider hover:text-blue-700">Sign up now</a>
// //           </p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default SignIn;









// import React, { useState } from 'react';
// import BGImg from '../assets/BGImg.png';
// import { useNavigate } from 'react-router-dom';

// const SignIn = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

//   const handleClick = (e) => {
//     e.preventDefault(); // Prevent default form submission behavior
//     navigate('/movies');
//   };

//   const handlePasswordToggle = () => {
//     setShowPassword(!showPassword);
//   };

//   return (
//     <div
//       className="relative min-h-screen bg-cover bg-center"
//       style={{ backgroundImage: `url(${BGImg})` }}
//     >
//       {/* Navbar */}
//       <nav className="absolute top-0 left-0 w-full bg-gradient-to-b from-black via-black to-transparent py-4 px-6 flex justify-between items-center text-white">
//         <div className="text-xl mt-5 font-semibold">YourLogo</div>
//         <a href="/sign-in" className="text-white mt-5 py-2 px-5 rounded-lg tracking-widest bg-blue-600 hover:bg-blue-700">Sign Up</a>
//       </nav>

//       {/* Form Container */}
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="bg-black px-12 py-12 rounded-lg shadow-lg w-full max-w-xl">
//           <h2 className="text-white text-2xl font-bold mb-6 text-center tracking-wider">Sign In</h2>
//           <form>
//             <div className="mb-4">
//               <input
//                 id="username"
//                 type="text"
//                 placeholder="Enter your username"
//                 className="mt-1 block w-full px-3 tracking-wider py-2 border border-[#383838] bg-[#121212] rounded-md shadow-sm focus:outline-none focus:ring-white focus:border-[#686868] sm:text-sm text-white"
//               />
//             </div>

//             <div className="mb-6 relative">
//               <input
//                 id="password"
//                 type={showPassword ? 'text' : 'password'}
//                 placeholder="Enter your password"
//                 className="mt-1 block w-full px-3 py-2 tracking-wider border border-[#383838] bg-[#121212] rounded-md shadow-sm focus:outline-none focus:ring-white focus:border-[#686868] sm:text-sm text-white"
//               />
//               <button
//                 type="button"
//                 onClick={handlePasswordToggle}
//                 className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500"
//               >
//                 {showPassword ? 'Hide' : 'Show'}
//               </button>
//             </div>

//             <button
//               type="submit"
//               onClick={handleClick}
//               className="w-full py-2 px-4 bg-blue-600 tracking-wider text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-offset-2"
//             >
//               Sign In
//             </button>
//           </form>

//           <p className="mt-4 text-center text-[#545454] tracking-wider text-sm">
//             New to Stream24? <a href="/signup" className="text-blue-600 tracking-wider hover:text-blue-700">Sign up now</a>
//           </p>

//           <p className="mt-4 text-center text-[#545454] tracking-wider text-sm">
//             <a href="/forgot-password" className="text-blue-600 tracking-wider hover:text-blue-700">Forgot your password?</a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignIn;







import React, { useState } from 'react';
import BGImg from '../assets/BGImg.png';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    navigate('/movies');
  };

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${BGImg})` }}
    >
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full bg-gradient-to-b from-black via-black to-transparent py-4 px-6 flex justify-between items-center text-white">
        <div className="text-xl mt-5 font-semibold">YourLogo</div>
        <a href="/sign-in" className="text-white mt-5 py-2 px-5 rounded-lg tracking-widest bg-blue-600 hover:bg-blue-700">Sign Up</a>
      </nav>

      {/* Form Container */}
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-black px-12 py-12 rounded-lg shadow-lg w-full max-w-xl">
          <h2 className="text-white text-2xl font-bold mb-6 text-center tracking-wider">Sign In</h2>
          <form>
            <div className="mb-4">
              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                className="mt-1 block w-full px-3 tracking-wider py-2 border border-[#383838] bg-[#121212] rounded-md shadow-sm focus:outline-none focus:ring-white focus:border-[#686868] sm:text-sm text-white"
              />
            </div>

            <div className="mb-6 relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                className="mt-1 block w-full px-3 py-2 tracking-wider border border-[#383838] bg-[#121212] rounded-md shadow-sm focus:outline-none focus:ring-white focus:border-[#686868] sm:text-sm text-white"
              />
              <button
                type="button"
                onClick={handlePasswordToggle}
                className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>

            <button
              type="submit"
              onClick={handleClick}
              className="w-full py-2 px-4 bg-blue-600 tracking-wider text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-offset-2"
            >
              Sign In
            </button>
          </form>

          <div className="flex justify-between mt-4 text-center text-[#545454] tracking-wider text-sm">
            <p>
              New to Stream24? <a href="/signup" className="text-blue-600 tracking-wider hover:text-blue-700">Sign up now</a>
            </p>
            <p>
              <a href="/forgot-password" className="text-blue-600 tracking-wider hover:text-blue-700">Forgot your password?</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
