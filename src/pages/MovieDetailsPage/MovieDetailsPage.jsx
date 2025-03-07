import { useParams, Link, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMovieDetails } from "../../api/tmdbApi";
import styles from "./MovieDetailsPage.module.css";

function MovieDetailsPage() {
  const { movieId } = useParams();
  const location = useLocation();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const backLink = location.state?.from || "/movies";

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        setLoading(true);
        const data = await fetchMovieDetails(movieId);
        setMovie(data);
        setError(null);
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setError("Failed to load movie details.");
      } finally {
        setLoading(false);
      }
    };

    getMovieDetails();
  }, [movieId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!movie) return <div>No movie details found.</div>;

  return (
    <div className={styles.container}>
      <Link to={backLink} className={styles.goBack}>
        &larr; Go Back
      </Link>
      <h1>{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <p>{movie.overview}</p>

      <div className={styles.links}>
        <Link to="cast" state={{ from: backLink }}>
          Cast
        </Link>
        <Link to="reviews" state={{ from: backLink }}>
          Reviews
        </Link>
      </div>

      <Outlet />
    </div>
  );
}

export default MovieDetailsPage;
