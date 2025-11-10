// // src/utils/watchlist.js
// const WATCHLIST_KEY = 'user_watchlist';

// export const getWatchlist = () => {
//   const data = localStorage.getItem(WATCHLIST_KEY);
//   return data ? JSON.parse(data) : [];
// };

// export const addToWatchlist = (movie) => {
//   const currentList = getWatchlist();
//   const exists = currentList.find((m) => m.id === movie.id);
//   if (!exists) {
//     const updated = [...currentList, movie];
//     localStorage.setItem(WATCHLIST_KEY, JSON.stringify(updated));
//   }
// };

// export const removeFromWatchlist = (movieId) => {
//   const currentList = getWatchlist();
//   const updated = currentList.filter((m) => m.id !== movieId);
//   localStorage.setItem(WATCHLIST_KEY, JSON.stringify(updated));
// };

// export const isInWatchlist = (movieId) => {
//   const currentList = getWatchlist();
//   return currentList.some((m) => m.id === movieId);
// };







// src/utils/watchlist.js
const KEY = 'user_watchlist';

export const getWatchlist = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]');
  } catch {
    return [];
  }
};

export const addToWatchlist = (movie) => {
  const current = getWatchlist();
  if (!current.find((m) => m.id === movie.id)) {
    current.push(movie);
    localStorage.setItem(KEY, JSON.stringify(current));
  }
};

export const removeFromWatchlist = (movieId) => {
  const current = getWatchlist();
  const next = current.filter((m) => m.id !== movieId);
  localStorage.setItem(KEY, JSON.stringify(next));
};

export const isInWatchlist = (movieId) => {
  const current = getWatchlist();
  return current.some((m) => m.id === movieId);
};
