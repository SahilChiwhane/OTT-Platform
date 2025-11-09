import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AnimeDetail = () => {
    const { id } = useParams();
    const [anime, setAnime] = useState(null);
    const [error, setError] = useState(null);
    const [trailer, setTrailer] = useState(null);

    useEffect(() => {
        const fetchAnimeDetails = async () => {
            try {
                // Fetch anime details
                const response = await axios.get(`https://api.jikan.moe/v4/anime/${id}`);
                setAnime(response.data.data);

                // Assuming the YouTube ID is available; update this part as necessary
                const youtubeId = response.data.data.trailer?.youtube_id;
                if (youtubeId) {
                    setTrailer(`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`);
                } else {
                    setError("No trailer available.");
                }
            } catch (error) {
                setError("Error fetching anime details.");
                console.error("Error fetching anime details:", error);
            }
        };

        fetchAnimeDetails();
    }, [id]);

    if (error) return <p className='text-red-500'>{error}</p>;
    if (!anime) return <p className='text-center'>Loading...</p>;

    return (
        <div className='relative h-full w-full bg-black text-white'>
            {/* Video/Trailer Section */}
            <div className='mb-8 h-full'>
                {trailer ? (
                    <div className='relative'>
                        <iframe
                            className='w-full h-[100vh]'
                            src={trailer}
                            title={anime.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                ) : (
                    <div className='h-[100vh] flex items-center justify-center'>
                        <p className='text-center'>{error}</p>
                    </div>
                )}
            </div>

            {/* Details and Images Section */}
            <div className='flex flex-row gap-10 p-10 md:flex-row'>
                {/* Details */}
                <div className='md:w-2/3 mb-4 md:mb-0'>
                    <h1 className='text-2xl font-bold mb-4'>{anime.title}</h1>
                    <p className='text-lg mb-4'>{anime.synopsis}</p>
                    <p className='text-base mb-4'><span className='font-semibold'>Aired: </span>{anime.aired?.string}</p>
                    <p className='text-base mb-4'><span className='font-semibold'>Seasons: </span>{anime.season}</p>
                    <p className='text-base mb-4'><span className='font-semibold'>Episodes: </span>{anime.episodes}</p>
                    <p className='text-base mb-4'><span className='font-semibold'>Score: </span>{anime.score}</p>
                    <p className='text-base mb-4'><span className='font-semibold'>Genres: </span>{anime.genres.map(genre => genre.name).join(', ')}</p>
                </div>
                
                {/* Images */}
                <div className='flex flex-col items-center md:w-1/3'>
                    <img
                        className='w-[300px] rounded-md mb-4'
                        src={anime.images?.jpg?.large_image_url}
                        alt={anime.title}
                    />
                </div>
            </div>
        </div>
    );
};

export default AnimeDetail;
