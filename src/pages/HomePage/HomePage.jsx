import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../../api/tmdbApi";
import MovieList from "../../components/MovieList/MovieList";
import styles from "./HomePage.module.css";

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchTrendingMovies()
      .then(setMovies)
      .catch((err) => {
        setError("Failed to load trading movies.");
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className={styles.homePageContainer}>
      <div className={styles.mainContent}>
        <h1>Trending Movies</h1>
      </div>
      {loading && <p>Загрузка...</p>}
      {error && <p className={styles.error}>{error}</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
}

export default HomePage;
