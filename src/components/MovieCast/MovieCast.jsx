import css from './MovieCast.module.css';
import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {fetchMovieCast} from '../../api/movies';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const MovieCast = () => {
  const {movieId} = useParams();

  const [movieCast, setMovieCast] = useState(null);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setIsLoading(true);
      setError(false);
      try {
        const cast = await fetchMovieCast(movieId);
        setMovieCast(cast.filter(actor => actor.profile_path !== null));
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovieDetails();
  }, [movieId]);

  return (
    <div>
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {movieCast && (
        <ul className={css.movieCastWrapper}>
          {movieCast.map(actor => (
            <li key={actor.id} className={css.movieCastItem}>
              <img
                src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                alt={actor.name}
                width="160"
                className={css.movieCastItemImage}
              />
              <div className={css.movieCastItemInfo}>
                <p>{actor.name}</p>
                <p>Character: {actor.character}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieCast;
