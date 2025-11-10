// src/components/MovieCarousal.jsx
import React, { useState, useCallback } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../routes/paths';

const truncateString = (str, num) => {
  if (!str) return '';
  return str.length > num ? str.slice(0, num) + '...' : str;
};

const MovieCarousal = ({ item }) => {
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();

  // Use centralized PATHS helper to build canonical route
  const handleClick = useCallback(() => {
    navigate(PATHS.WATCH(item?.id));
  }, [navigate, item]);

  // toggle like - stop propagation so it doesn't trigger navigation
  const handleLike = (e) => {
    e.stopPropagation();
    setLiked((v) => !v);
    // TODO: persist to backend or localStorage if desired
  };

  const posterPath = item?.poster_path;
  const imageSrc = posterPath ? `https://image.tmdb.org/t/p/w300${posterPath}` : null;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => { if (e.key === 'Enter') handleClick(); }}
      className="px-3 py-2 w-fit flex-shrink-0 bg-black rounded-md relative cursor-pointer hover:border-[#515151] border-b-4 border-t-4 border-black hover:ease-in-out ease-in-out"
      aria-label={item?.title ? `Open ${item.title} details` : 'Open details'}
    >
      {imageSrc ? (
        <img
          className="rounded-md block"
          src={imageSrc}
          alt={item?.title || 'Poster'}
          loading="lazy"
          width="200"
          height="300"
          style={{ display: 'block' }}
        />
      ) : (
        <div
          style={{
            width: 200,
            height: 300,
            borderRadius: 8,
            background: '#2b2b2b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          aria-hidden
        >
          <span className="text-gray-400">No Image</span>
        </div>
      )}

      <h1
        className="font-semibold pt-2 tracking-wide"
        title={item?.title}
        style={{ width: 200, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
      >
        {truncateString(item?.title || item?.name, 18)}
      </h1>

      <p className="text-[#5c5c5c] flex flex-row tracking-wider">
        TV <span className="pl-5">● 1h</span>
        <span
          title={liked ? 'Remove from wishlist' : 'Add to wishlist'}
          className="absolute right-2 bottom-3"
          onClick={handleLike}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter') handleLike(e); }}
          aria-pressed={liked}
          aria-label={liked ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          {liked ? <FaHeart className="text-gray-300" /> : <FaRegHeart className="text-gray-300" />}
        </span>
      </p>
    </div>
  );
};

export default React.memo(MovieCarousal);
