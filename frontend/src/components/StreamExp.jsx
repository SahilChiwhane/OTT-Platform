// import React from 'react';
// import StreamingExp from '../assets/StreamingExp.png';

// const StreamExp = () => {
//   return (
//     <div className='flex items-center justify-center py-32 bg-black text-white relative gap-20'>
//         <div className='mx-24 flex flex-row gap-5'>
//             <div className='pr-10'>
//                 <h4 className='text-4xl font-bold mb-4'>Best pick for Hassle-Free<br /> <span className='text-blue-600'>Streaming Experience</span></h4>
//                 <h3 className='font-bold mb-1'>Access While Travelling</h3>
//                 <p className='mb-3'>Keep access to your Entertainment Content while
//                 roaming the world. Pick from Thousands.</p>
//                 <h3 className='font-bold mb-1'>Stream with No Interruptions</h3>
//                 <p className='mb-3'>Pause for snacks, not Buffering stream smoothly with 
//                 our lightning-fast NordLynx Protocol Network.</p>
//                 <h3 className='font-bold mb-1'>Stay Secure at all Times</h3>
//                 <p className='mb-3'>Securely access and enjoy your favorite content.</p>
//             </div>
//             <img className='rounded-lg' src={StreamingExp} />
//         </div>
//     </div>

//   )
// }

// export default StreamExp




import React from 'react';
import StreamingExp from '../assets/StreamingExp.png';

const StreamExp = () => {
  return (
    <div className='flex items-center justify-center py-32 bg-black text-white relative'>
        <div className='flex flex-col md:flex-row items-center justify-center gap-10'>
            <div className='flex-1 mx-24 text-center tracking-wider md:text-left'>
                <h4 className='text-4xl font-bold mb-4'>
                    Best pick for Hassle-Free<br />
                    <span className='text-blue-600'>Streaming Experience</span>
                </h4>
                <h3 className='font-bold mb-1'>Access While Travelling</h3>
                <p className='mb-3'>Keep access to your Entertainment Content while
                roaming the world. Pick from Thousands.</p>
                <h3 className='font-bold mb-1'>Stream with No Interruptions</h3>
                <p className='mb-3'>Pause for snacks, not Buffering stream smoothly with 
                our lightning-fast NordLynx Protocol Network.</p>
                <h3 className='font-bold mb-1'>Stay Secure at all Times</h3>
                <p className='mb-3'>Securely access and enjoy your favorite content.</p>
            </div>
            <img className='mr-24 md:w-auto rounded-lg' src={StreamingExp} alt="Streaming Experience" />
        </div>
    </div>
  )
}

export default StreamExp