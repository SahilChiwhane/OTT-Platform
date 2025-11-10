// src/api/tmdb.js
import axios from 'axios';

const KEY = process.env.REACT_APP_TMDB_KEY || '';

if (!KEY) {
  console.warn('⚠️ REACT_APP_TMDB_KEY is not set. Add it to frontend/.env (do not commit).');
}

const tmdb = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: { api_key: KEY, language: 'en-US' },
  timeout: 10000,
});

// helper functions
export async function getPopular(page = 1) {
  const res = await tmdb.get('/movie/popular', { params: { page } });
  return res.data;
}
export async function getTopRated(page = 1) {
  const res = await tmdb.get('/movie/top_rated', { params: { page } });
  return res.data;
}
export async function getTrending(page = 1) {
  const res = await tmdb.get('/trending/movie/day', { params: { page } });
  return res.data;
}
export async function getUpcoming(page = 1) {
  const res = await tmdb.get('/movie/upcoming', { params: { page } });
  return res.data;
}
export async function searchMovies(query, page = 1) {
  if (!query) return { results: [] };
  const res = await tmdb.get('/search/movie', { params: { query, page } });
  return res.data;
}

export default tmdb;
