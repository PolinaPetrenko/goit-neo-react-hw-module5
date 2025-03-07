import css from './MovieReviews.module.css';
import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {fetchMovieReviews} from '../../api/movies';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const MovieReviews = () => {
  const {movieId} = useParams();

  const [movieReview, setMovieReview] = useState(null);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setIsLoading(true);
      setError(false);
      try {
        const review = await fetchMovieReviews(movieId);
        setMovieReview(review);
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
      {movieReview && movieReview.length > 0 ? (
        <ul className={css.movieReviewsWrapper}>
          {movieReview.map(review => (
            <li className={css.movieReviewsItem} key={review.id}>
              <h3>{review.author}</h3>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>We don&apos;t have any review for this movie</p>
      )}
    </div>
  );
};

export default MovieReviews;
