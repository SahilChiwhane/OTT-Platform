import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import AnimeCarousal from './AnimeCarousal';

const AnimeSection = ({ title, fetchURL, rowId }) => {
    const [anime, setAnime] = useState([]);

    useEffect(() => {
        axios.get(fetchURL)
            .then((response) => {
                // Adjust based on actual response structure
                console.log(response.data); // Log the entire response to check structure
                setAnime(response.data.data || []); // Set data or default to empty array
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [fetchURL]);


    const slideLeft = () => {
        var slider = document.getElementById('slider' + rowId);
        slider.scrollLeft -= 250;
    };

    const slideRight = () => {
        var slider = document.getElementById('slider' + rowId);
        slider.scrollLeft += 250;
    };

    return (
        <div className='sec-content -mt-2'>
            <div className='m-2 ml-0 text-white items-center'>
                <div className='p-2 bg-[#121212] rounded-md'>
                    <h1 className='pl-2 text-xl mt-5 mb-7 font-bold tracking-wider'>{title}</h1>
                    <div className='relative flex items-center group'>
                        <MdChevronLeft 
                            onClick={slideLeft} 
                            className='bg-[#121212] -left-1 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block' 
                            size={40} 
                        />
                        <div 
                            id={'slider' + rowId} 
                            className='flex h-full gap-2 relative overflow-x-scroll whitespace-nowrap scroll-smooth' 
                            style={{
                                scrollbarWidth: 'none', /* Firefox */
                                msOverflowStyle: 'none' /* IE and Edge */
                            }}
                        >
                            {anime.map((item, id) => (
                                <AnimeCarousal key={id} item={item} />
                            ))}
                        </div>
                        <MdChevronRight 
                            onClick={slideRight} 
                            className='bg-[#121212] -right-1 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block' 
                            size={40} 
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AnimeSection;
