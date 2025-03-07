import css from './MoviesPage.module.css';
import {lazy, useEffect, useState} from 'react';
import {useSearchParams} from 'react-router-dom';
import Loader from '../../components/Loader/Loader.jsx';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage.jsx';
import SearchForm from '../../components/SearchForm/SearchForm.jsx';
import NotFoundPage from '../NotFoundPage/NotFoundPage.jsx';
import {fetchSearchMovie} from '../../api/movies.js';
import toast, {Toaster} from 'react-hot-toast';

const MovieList = lazy(() =>
  import('../../components/MovieList/MovieList.jsx')
);

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query');

  useEffect(() => {
    const fetchMoviesByQuery = async query => {
      try {
        setIsLoading(true);
        setError(false);
        const results = await fetchSearchMovie(query);
        setMovies(results);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (query && query.length > 1) {
      fetchMoviesByQuery(query);
    }
  }, [query]);

  const handleSearch = searchQuery => {
    setSearchParams({query: searchQuery});
  };

  const noResultsFound = movies.length === 0 && !isLoading && !error && query;

  return (
    <>
      <Toaster position="top-right" />
      <SearchForm onSubmit={handleSearch} />
      {isLoading && <Loader />}
      {error && !isLoading && <ErrorMessage />}
      {noResultsFound && <NotFoundPage />}
      <MovieList movies={movies} />
    </>
  );
};

export default MoviesPage;
