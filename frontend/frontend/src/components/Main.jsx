import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import requests from '../assets/Requests';

const Main = () => {
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();

    const movie = movies[Math.floor(Math.random() * movies.length)];

    useEffect(() => {
        axios.get(requests.requestPopular)
            .then((response) => {
                setMovies(response.data.results);
            });
    }, []);

    console.log(movie);

    const truncateString = (str, num) => {
        return str?.length > num ? str.slice(0, num) + "..." : str;
    };

    const handleWatchNow = () => {
        if (movie?.id) {
            navigate(`/video/${movie.id}`);
        }
    };

    return (
        <div className='content'>
            <div className='content-box relative z-50'>
                <div className='opacity-40'>
                    <img className='content-poster' src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`} alt={movie?.title} />
                </div>
                <div className='absolute justify-start px-10 bottom-10 text-white'>
                    <div className='flex gap-5 font-semibold tracking-wider'>
                        <p> Home </p>
                        <p> ● Movies </p>
                        <p className='text-[#a3a3a3]'> ● {truncateString(movie?.title, 24)} </p>
                    </div>
                    <h1 className='my-2 text-2xl font-extrabold tracking-wider'> {movie?.title} </h1>
                    <div className='flex gap-2 my-3 text-black font-normal'>
                        <p className='px-2 bg-white rounded'> HD </p>
                        <p className='px-2 bg-white rounded'> 1 </p>
                        <p className='px-2 bg-white rounded'> Movie </p>
                        <p className='px-2 bg-white rounded'> 2h 30m </p>
                    </div>
                    <div className='w-[50%] my-4'>
                        <p>{truncateString(movie?.overview, 180)}</p>
                    </div>
                    <div className='flex gap-2 my-2 text-black font-semibold tracking-wider ease-in-out hover:ease-in-out'>
                        <button onClick={handleWatchNow} className='px-4 py-2 bg-white rounded-md hover:bg-[#c9c9c9]'>▶ Watch now</button>
                        <button className='px-4 py-2 bg-white rounded-md hover:bg-[#c9c9c9]'> + Add to List</button>
                        <button className='px-4 py-2 bg-white rounded-full italic hover:bg-[#c9c9c9]'>i</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;
