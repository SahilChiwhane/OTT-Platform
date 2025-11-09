// import React, { useState } from 'react';
// import { FaHeart, FaRegHeart} from 'react-icons/fa';


// const TvCarousal = ({item}) => {

//     const [like, setLike] = useState(false);

//     const truncateString = (str, num) => {
//         if(str?.length > num) {
//             return str.slice(0, num) + "...";
//         } else {
//             return str;
//         }
//     };

//   return (
//         <div className='px-3 py-2 w-fit flex-shrink-0 bg-black rounded-md relative cursor-pointer hover:border-[#515151] border-b-4 border-t-4 border-black hover:ease-in-out ease-in-out'>
//             <img className=' rounded-md' src={`https://image.tmdb.org/t/p/w200/${ item?.poster_path }`} alt={ item?.name } />
//             <h1 className='font-semibold pt-2 tracking-wide'  title={ item?.name } > { truncateString( item?.name, 18 ) } </h1>
//             <p className='text-[#5c5c5c] flex flex-row tracking-wider'> TV <span className='pl-5'>● 1h</span> <span title='Add to Wishlist' className='absolute right-2 bottom-3'> 
//                 { like ? <FaHeart className='absolute top-4 left-4 text-gray-300' /> : <FaRegHeart className='text-gray-300' /> } </span> </p>
//         </div>
//   )
// }

// export default TvCarousal






import React, { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const TvCarousal = ({ item }) => {
    const [like, setLike] = useState(false);
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/tv/${item.id}`); // Navigate to the TV show detail page
    };

    const truncateString = (str, num) => {
        if (str?.length > num) {
            return str.slice(0, num) + "...";
        } else {
            return str;
        }
    };

    return (
        <div
            className='px-3 py-2 w-fit flex-shrink-0 bg-black rounded-md relative cursor-pointer hover:border-[#515151] border-b-4 border-t-4 border-black hover:ease-in-out ease-in-out'
            onClick={handleCardClick}
        >
            <img className='rounded-md' src={`https://image.tmdb.org/t/p/w200/${item?.poster_path}`} alt={item?.name} />
            <h1 className='font-semibold pt-2 tracking-wide' title={item?.name}>
                {truncateString(item?.name, 18)}
            </h1>
            <p className='text-[#5c5c5c] flex flex-row tracking-wider'>
                TV <span className='pl-5'>● 1h</span>
                <span title='Add to Wishlist' className='absolute right-2 bottom-3'>
                    {like ? <FaHeart className='absolute top-4 left-4 text-gray-300' /> : <FaRegHeart className='text-gray-300' />}
                </span>
            </p>
        </div>
    );
};

export default TvCarousal;
