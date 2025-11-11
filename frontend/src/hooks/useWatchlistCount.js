// src/hooks/useWatchlistCount.js
import { useEffect, useState } from 'react';
import { getWatchlist } from '../utils/watchlist';

export default function useWatchlistCount() {
  const [count, setCount] = useState(getWatchlist().length);

  useEffect(() => {
    // Polling-free approach: attach storage event for multi-tab update
    const onStorage = (e) => {
      if (e.key === 'user_watchlist') {
        setCount(JSON.parse(e.newValue || '[]').length);
      }
    };
    window.addEventListener('storage', onStorage);

    // small helper for same-tab mutations: override localStorage setItem (optional)
    const origSet = Storage.prototype.setItem;
    Storage.prototype.setItem = function (key, value) {
      origSet.apply(this, [key, value]);
      if (key === 'user_watchlist') {
        setCount(JSON.parse(value || '[]').length);
      }
    };

    return () => {
      window.removeEventListener('storage', onStorage);
      Storage.prototype.setItem = origSet;
    };
  }, []);

  return count;
}
