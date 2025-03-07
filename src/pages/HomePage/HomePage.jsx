import css from './HomePage.module.css';
import {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {fetchTrendingMovies} from '../../api/movies';
import Loader from '../../components/Loader/Loader.jsx';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage.jsx';
import MovieList from '../../components/MovieList/MovieList.jsx';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const getTrendingMovies = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const movies = await fetchTrendingMovies(); 
        setMovies(movies); 
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (location.pathname === '/') {
      getTrendingMovies();
    }
  }, [location]);

  return (
    <div>
      <h1>Trending today</h1>
      {isLoading && <Loader />} 
      {!isLoading && movies.length === 0 && !error && <p>No movies found!</p>} 
      {error && !isLoading && <ErrorMessage />}
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
