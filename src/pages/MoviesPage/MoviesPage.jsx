import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../../api/tmdbApi";
import SearchMovies from "../../components/SearchMovies/SearchMovies";
import MovieList from "../../components/MovieList/MovieList";
import styles from "./MoviesPage.module.css";

function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("query") || "";

  useEffect(() => {
    if (!query) return;

    const fetchMovies = async () => {
      setLoading(true);
      try {
        const data = await searchMovies(query);
        if (data.length === 0) {
          setError("No movies found.");
          setMovies([]);
        } else {
          setMovies(data);
          setError(null);
        }
      } catch (err) {
        setError("Error searching movies");
        console.error("Error searching movies:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [query]);

  const handleSearch = (newQuery) => {
    if (newQuery.trim() === "") {
      setSearchParams({});
      setMovies([]);
      setError(null);
      return;
    }
    setSearchParams({ query: newQuery });
  };

  return (
    <div className={styles.moviesPageContainer}>
      <div className={styles.mainContent}>
        <h1>Search Movies</h1>
      </div>

      <div className={styles.searchForm}>
        <SearchMovies onSearch={handleSearch} />
      </div>

      {loading && <p>Загрузка...</p>}

      {error && <p className={styles.error}>{error}</p>}

      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
}

export default MoviesPage;
