import { useEffect, useState } from 'react';
import { getWishlist, subscribeWishlist } from '../utils/wishlist';

export default function useWishlistCount() {
  const [count, setCount] = useState(() => {
    try { return getWishlist().length; } catch { return 0; }
  });

  useEffect(() => {
    // callback updates count when wishlist changes
    const cb = () => {
      try { setCount(getWishlist().length); } catch { setCount(0); }
    };

    const unsub = subscribeWishlist(cb);
    // ensure initial sync in case something changed before we subscribed
    cb();

    return () => unsub && unsub();
  }, []);

  return count;
}
