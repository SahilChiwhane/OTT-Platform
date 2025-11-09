import React from 'react';
import BG1 from '../assets/BG1.png';
import ImageStack from '../assets/ImageStack.png';

const HomeSub = () => {
  return (
    <div className="relative w-fit bg-cover text-white bg-center opacity-100 tracking-wider" style={{ backgroundImage: `url(${BG1})` }}>
    <div className='flex items-center justify-center py-32 relative gap-20'>
        <img className='max-w-full h-auto ml-32' src={ImageStack} alt="Image Stack" />
        <div className='mr-32'>
            <h1 className='text-4xl font-bold mb-4'>Unlock Unlimited Entertainment!</h1>
            <p className='text-lg mb-6'>Ready to dive into a world of endless entertainment? Subscribe now and enjoy a vast library of movies, binge-worthy TV shows, exclusive originals, and more! Don’t miss out—your next favorite series awaits. Subscribe today and start streaming wherever, whenever.</p>
            <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
                Subscribe Now
            </button>
        </div>
    </div>
</div>

  )
}

export default HomeSub