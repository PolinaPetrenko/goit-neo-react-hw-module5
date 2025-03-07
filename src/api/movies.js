import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';

const options = {
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNzU0OGNjNGI1ZTNkMTZkMjhmZjM5NDk2MWU3NzA1MSIsIm5iZiI6MTc0MTM2NTI2My45MjksInN1YiI6IjY3Y2IyMDBmODFmYmIxMjUzOWNiNzFhMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.X21_P4hONbVRkXKV-WWQYVMImuFEPu29PudIZfLFsAg',
  },
  params: {
    language: 'en-US',
  },
};

export const fetchTrendingMovies = async () => {
  const response = await axios.get('trending/movie/day', options);
  return response.data.results;
};

export const fetchSearchMovie = async query => {
  const response = await axios.get('search/movie', {
    ...options,
    params: {query, include_adult: false, page: 1},
  });
  return response.data.results;
};

export const fetchMovieDetails = async movieId => {
  const response = await axios.get(`movie/${movieId}`, options);
  return response.data;
};

export const fetchMovieCast = async movieId => {
  const response = await axios.get(`movie/${movieId}/credits`, options);
  return response.data.cast;
};

export const fetchMovieReviews = async movieId => {
  const response = await axios.get(`movie/${movieId}/reviews`, options);
  return response.data.results;
};
