// src/routes/paths.js
// Centralized route constants to keep URLs consistent across the app.

export const PATHS = {
  HOME: () => '/',
  MOVIES: () => '/movies',
  TVSHOWS: () => '/tvshows',
  ANIME: () => '/anime',
  BROWSE: () => '/browse',
  LOGIN: () => '/login',
  SIGNUP: () => '/signup',
  WATCH: (id) => `/watch/${id}`, // ✅ canonical route
};
