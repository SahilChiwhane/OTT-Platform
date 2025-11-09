import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import requests from '../assets/Requests'; // Import requests from your config file

const VideoPlayer = () => {
    const { id } = useParams(); // Get the movie ID from the URL
    const [videoUrl, setVideoUrl] = useState('');
    const [movie, setMovie] = useState(null);
    const [error, setError] = useState(null); // State to handle errors

    useEffect(() => {
        const fetchVideoAndMovieDetails = async () => {
            try {
                // Fetch movie details
                const movieResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
                    params: { api_key: requests.apiKey }
                });
                setMovie(movieResponse.data);

                // Fetch movie videos
                const videoResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}/videos`, {
                    params: { api_key: requests.apiKey }
                });

                // Find the trailer video
                const trailer = videoResponse.data.results.find(v => v.type === 'Trailer' || v.type === 'Featurette');
                if (trailer) {
                    setVideoUrl(`https://www.youtube.com/embed/${trailer.key}?autoplay=1&modestbranding=1&playsinline=1`);
                } else {
                    setError("Trailer not found");
                }
            } catch (error) {
                console.error("Error fetching data", error);
                setError("Error fetching data");
            }
        };

        fetchVideoAndMovieDetails();
    }, [id]);

    return (
        <div className='relative min-h-full w-full bg-black text-white'>
            <div className="relative w-full h-[100vh] bg-black">
                {videoUrl ? (
                    <iframe
                        className="w-full h-full"
                        src={videoUrl}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Movie Trailer"
                    ></iframe>
                ) : error ? (
                    <p className="absolute inset-0 flex items-center justify-center">{error}</p>
                ) : (
                    <p className="absolute inset-0 flex items-center justify-center">Loading...</p>
                )}
            </div>
            <div className="relative p-6 bg-black">
                {movie ? (
                    <div className='flex flex-row p-10'>
                    <div className='mx-auto'>
                        <h1 className='text-2xl font-bold mb-4'>{movie.title}</h1>
                        <p className='text-lg mb-4'>{movie.overview}</p>
                        <p className='text-base'><span className='font-semibold'>Release Date: </span> {movie.release_date}</p>
                    </div>
                    <div className='lg:w-1/3 lg:pl-6 mt-6 lg:mt-0'>
                    <img 
                        className='w-[200px] rounded'
                        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} 
                        alt={movie.name} 
                    />
                    </div>
                </div>
                ) : (
                    <p className="text-center">Loading movie details...</p>
                )}
            </div>
        </div>
    );
};

export default VideoPlayer;
