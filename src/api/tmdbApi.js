import axios from "axios";

const API_KEY = "d03486e90ea71f6c430633f88c8a426b";
const BASE_URL = "https://api.themoviedb.org/3";

const fetchData = async (endpoint, params = {}) => {
  try {
    const response = await axios.get(`${BASE_URL}${endpoint}`, {
      params: { api_key: API_KEY, ...params },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}:`, error);
    throw new Error(`Error fetching data from ${endpoint}`);
  }
};

const fetchTrendingMovies = async () => {
  const data = await fetchData("/trending/movie/day");
  return data?.results || [];
};

const searchMovies = async (query) => {
  if (!query) return [];
  const data = await fetchData("/search/movie", { query });
  return data?.results || [];
};

const fetchMovieDetails = async (movieId) => {
  if (!movieId) {
    throw new Error("Movie ID is required to fetch movie details");
  }
  return await fetchData(`/movie/${movieId}`);
};

const fetchMovieCast = async (movieId) => {
  if (!movieId) {
    throw new Error("Movie ID is required to fetch movie cast");
  }
  const data = await fetchData(`/movie/${movieId}/credits`);
  return data?.cast || [];
};

const fetchMovieReviews = async (movieId) => {
  if (!movieId) {
    throw new Error("Movie ID is required to fetch movie reviews");
  }
  const data = await fetchData(`/movie/${movieId}/reviews`);
  return data?.results || [];
};

export {
  fetchTrendingMovies,
  searchMovies,
  fetchMovieDetails,
  fetchMovieCast,
  fetchMovieReviews,
};
