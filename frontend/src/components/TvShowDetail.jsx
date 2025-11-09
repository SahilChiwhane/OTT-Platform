import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import requests from '../assets/Requests';

const TvShowDetail = () => {
    const { id } = useParams(); // Get the TV show ID from the URL
    const [show, setShow] = useState(null);
    const [trailer, setTrailer] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchShowData = async () => {
            try {
                // Fetch TV show details
                const showResponse = await axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=${requests.apiKey}&language=en-US`);
                setShow(showResponse.data);

                // Fetch TV show videos
                const videoResponse = await axios.get(`https://api.themoviedb.org/3/tv/${id}/videos?api_key=${requests.apiKey}&language=en-US`);
                const videos = videoResponse.data.results;

                // Filter for trailers
                const trailerVideo = videos.find(video => video.type === 'Trailer' && video.site === 'YouTube');
                if (trailerVideo) {
                    setTrailer(trailerVideo); // Set the first trailer found
                } else {
                    setError("No trailer available.");
                }
                } catch (error) {
                    setError("Error fetching TV show details or trailer.");
                    console.error("Error fetching TV show details or trailer:", error);
                }
        };

        fetchShowData();
    }, [id]);

    if (!show) return <div className='h-[100vh] flex items-center justify-center'>Loading...</div>;

    return (
        <div className='bg-black text-white'>
            {trailer ? (
                <div className='flex flex-col'>
                    <div className='relative h-[100vh] w-full'>
                        <iframe
                            className='w-full h-full'
                            src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&modestbranding=1&playsinline=1&rel=0`}
                            title={show.name}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                    
                    <div className='p-16 lg:flex lg:justify-between'>
                        <div className='lg:w-2/3'>
                            <h2 className='text-2xl font-bold mb-4'>{show.name}</h2>
                            <p className='text-lg mb-4'>{show.overview}</p>
                            <p className='text-base'><span className='font-semibold'>Release Date: </span> {show.first_air_date}</p>
                            <p className='text-base'><span className='font-semibold'>Number of Seasons: </span> {show.number_of_seasons}</p>
                            <p className='text-base'><span className='font-semibold'>Number of Episodes: </span> {show.number_of_episodes}</p>
                        </div>
                        
                        <div className='lg:w-1/3 lg:pl-6 mt-6 lg:mt-0'>
                            <img 
                                className='w-full h-auto rounded'
                                src={`https://image.tmdb.org/t/p/w500/${show.backdrop_path}`} 
                                alt={show.name} 
                            />
                        </div>
                    </div>
                </div>
            ) : (
                <div className='h-[100vh] flex items-center justify-center'>
                    <p className='text-center'>{error}</p>
                </div>
            )}
        </div>
    );
};

export default TvShowDetail;
