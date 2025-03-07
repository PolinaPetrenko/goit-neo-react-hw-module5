import css from './MovieDetailsPage.module.css';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import { lazy, Suspense, useEffect, useState, useRef } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { fetchMovieDetails } from '../../api/movies'; 

const MovieDetails = lazy(() => import('../../components/MovieDetails/MovieDetails'));
const AdditionalInformation = lazy(() => import('../../components/AdditionalInformation/AdditionalInformation'));

const MovieDetailsPage = () => {
  const location = useLocation();
  const backLink = useRef(location.state ?? '/movies');
  const { movieId } = useParams();

  const [movieDetails, setMovieDetails] = useState(null);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      setIsLoading(true);
      setError(false);
      try {
        const movie = await fetchMovieDetails(movieId); 
        setMovieDetails(movie); 
      } catch (err) {
        setError(true); 
      } finally {
        setIsLoading(false); 
      }
    };

    fetchDetails();
  }, [movieId]); 

  return (
    <div className={css.movieDetailsPage}>
      <Link className={css.backArrow} to={backLink.current}>
        <BiArrowBack size="18" /> Go Back
      </Link>
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {movieDetails && (
        <div>
          <MovieDetails movie={movieDetails} />
          <hr />
          <AdditionalInformation />
          <hr />
        </div>
      )}
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MovieDetailsPage;
