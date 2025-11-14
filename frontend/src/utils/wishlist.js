const KEY = 'user_wishlist_v1'; // canonical key

const subscribers = new Set();

function notify() {
  subscribers.forEach((cb) => {
    try { cb(); } catch (e) { /* swallow subscriber errors */ }
  });
}

/**
 * Migration: if legacy 'myList' exists, move it to KEY and remove legacy key.
 * This runs once when module loads.
 */
(function migrateIfNeeded() {
  try {
    const legacy = localStorage.getItem('myList');
    const current = localStorage.getItem(KEY);
    if (!current && legacy) {
      // try parsing legacy, but be defensive
      try {
        const parsed = JSON.parse(legacy);
        if (Array.isArray(parsed)) {
          localStorage.setItem(KEY, JSON.stringify(parsed));
        } else {
          // if it's not an array, discard
          localStorage.setItem(KEY, '[]');
        }
      } catch {
        localStorage.setItem(KEY, '[]');
      }
      // remove legacy key to avoid duplicate data
      try { localStorage.removeItem('myList'); } catch (e) {}
    }
  } catch (e) {
    // ignore storage errors (e.g. blocked)
  }
})();

export function getWishlist() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]');
  } catch {
    return [];
  }
}

export function addToWishlist(movie) {
  try {
    const current = getWishlist();
    if (!current.find((m) => m.id === movie.id)) {
      current.unshift(movie); // keep newest at top (optional)
      localStorage.setItem(KEY, JSON.stringify(current));
      notify();
    }
  } catch (e) {
    console.error('addToWishlist error', e);
  }
}

export function removeFromWishlist(movieId) {
  try {
    const current = getWishlist();
    const next = current.filter((m) => m.id !== movieId);
    localStorage.setItem(KEY, JSON.stringify(next));
    notify();
  } catch (e) {
    console.error('removeFromWishlist error', e);
  }
}

export function isInWishlist(movieId) {
  try {
    const current = getWishlist();
    return current.some((m) => m.id === movieId);
  } catch {
    return false;
  }
}

export function subscribeWishlist(cb) {
  if (typeof cb !== 'function') return () => {};
  subscribers.add(cb);
  // return unsubscribe fn
  return () => subscribers.delete(cb);
}
