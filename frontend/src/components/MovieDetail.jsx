import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import requests from '../assets/Requests'; // Import your requests file

const MovieDetail = () => {
    const { id } = useParams(); // Get the movie ID from URL
    const [movie, setMovie] = useState(null);
    const [video, setVideo] = useState(null);

    useEffect(() => {
        const fetchMovieData = async () => {
            try {
                // Fetch movie details
                const movieResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${requests.apiKey}&language=en-US`);
                setMovie(movieResponse.data);

                // Fetch movie videos
                const videoResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${requests.apiKey}&language=en-US`);
                const videos = videoResponse.data.results;
                
                // Filter for trailers
                const trailer = videos.find(video => video.type === 'Trailer' && video.site === 'YouTube');
                
                if (trailer) {
                    setVideo(trailer); // Set the first trailer found
                }
            } catch (error) {
                console.error("Error fetching movie details or videos:", error);
            }
        };

        fetchMovieData();
    }, [id]);

    if (!movie) return <div>Loading...</div>;

    return (
        <div className='p-4 bg-black text-white'>
            
            {video ? (
                <div className='h-[100vh] relative'>
                    <iframe
                        className='w-full h-full mt-2 rounded'
                        src={`https://www.youtube.com/embed/${video.key}?autoplay=1&modestbranding=1&playsinline=1&rel=0`}
                        title={movie.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            ) : (
                <p className='mt-4'>No trailer available</p>
                
            )}

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
        </div>
    );
}

export default MovieDetail;
