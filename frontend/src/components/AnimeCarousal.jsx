import React, { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AnimeCarousal = ({ item }) => {
    const [like, setLike] = useState(false);
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/anime/${item.mal_id}`); // Navigate to the anime detail page
    };

    const truncateString = (str, num) => {
        if (str?.length > num) {
            return str.slice(0, num) + "...";
        } else {
            return str;
        }
    };

    const truncateDur = (str, num) => {
        if (str?.length > num) {
            return str.slice(0, num);
        } else {
            return str;
        }
    };

    return (
        <div
            className='px-3 h-fit py-2 flex-shrink-0 bg-black rounded-md relative cursor-pointer hover:border-[#515151] border-b-4 border-t-4 border-black hover:ease-in-out ease-in-out'
            onClick={handleCardClick}
        >
            <img 
                className='rounded-md' 
                src={item?.images?.jpg?.large_image_url} 
                alt={item?.title} 
                style={{ width: '200px', height: '300px' }} // Set default width and height here
            />
            <h1 className='font-semibold pt-2 tracking-wide' title={item?.title_english}>
                {truncateString(item?.title_english, 18)}
            </h1>
            <p className='text-[#5c5c5c] flex pt-2 flex-row tracking-wider'>
                TV <span className=' absolute left-14 px-1 rounded-sm text-[#acacac] bg-[#2d2d2d]'>{truncateDur(item?.episodes, 6)} ep</span> 
                <span title='Add to Wishlist' className='absolute right-2 bottom-3'>
                    {like ? <FaHeart /> : <FaRegHeart />}
                </span>
            </p>
        </div>
    );
}

export default AnimeCarousal;
