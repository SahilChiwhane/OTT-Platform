import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import requests from '../assets/Requests';

const ShowsMain = () => {
    const [shows, setShows] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const show = shows[Math.floor(Math.random() * shows.length)];

    useEffect(() => {
        const fetchShows = async () => {
            try {
                const response = await axios.get(requests.requestTvTrending);
                setShows(response.data.results);
            } catch (error) {
                setError("Error fetching TV shows.");
                console.error("Error fetching TV shows:", error);
            }
        };

        fetchShows();
    }, []);

    const truncateString = (str, num) => {
        if (str?.length > num) {
            return str.slice(0, num) + "...";
        } else {
            return str;
        }
    };

    const handleWatchNow = () => {
        if (show) {
            navigate(`/tv/${show.id}`); // Navigate to the TV show detail page
        }
    };

    return (
        <div className='content'>
            <div className='content-box relative z-50'>
                <div className='opacity-40'>
                    <img className='content-poster' src={`https://image.tmdb.org/t/p/original/${show?.backdrop_path}`} alt={show?.name} />
                </div>
                <div className='absolute justify-start px-10 bottom-10 text-white'>
                    <div className='flex gap-5 font-semibold tracking-wider'>
                        <p> Home </p>
                        <p> ● TV </p>
                        <p className='text-[#a3a3a3]'> ● {truncateString(show?.name, 24)} </p>
                    </div>
                    <h1 className='my-2 text-2xl font-extrabold tracking-wider'> {show?.name} </h1>
                    <div className='flex gap-2 my-3 text-black font-normal'>
                        <p className='px-2 bg-white rounded'> HD </p>
                        {/* <p className='px-2 bg-white rounded'> {show?.duration} </p> */}
                        <p className='px-2 bg-white rounded'> TV </p>
                        <p className='px-2 bg-white rounded'> 1h </p>
                    </div>
                    <div className='w-[50%] my-4'>
                        <p>{truncateString(show?.overview, 180)}</p>
                    </div>
                    <div className='flex gap-2 my-2 text-black font-semibold tracking-wider ease-in-out hover:ease-in-out'>
                        <button
                            className='px-4 py-2 bg-white rounded-md hover:bg-[#c9c9c9]'
                            onClick={handleWatchNow}
                        >
                            ▶ Watch now
                        </button>
                        <button className='px-4 py-2 bg-white rounded-md hover:bg-[#c9c9c9]'> <span className='text-lg'>+</span> Add to List</button>
                        {/* <button className='px-4 py-2 bg-white rounded-full italic hover:bg-[#c9c9c9]'>i</button> */}
                    </div>
                </div>
            </div>
            {error && <p className='text-red-500'>{error}</p>}
        </div>
    );
};

export default ShowsMain;