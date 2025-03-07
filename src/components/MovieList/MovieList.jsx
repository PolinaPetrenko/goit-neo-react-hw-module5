import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import styles from "./MovieList.module.css";

function MovieList({ movies }) {
  const location = useLocation();

  return (
    <div className={styles.list}>
      {movies.length > 0 ? (
        movies.map(({ id, title, poster_path, release_date, vote_average }) => (
          <div key={id} className={styles.card}>
            <Link
              to={`/movies/${id}`}
              state={{ from: location }}
              className={styles.cardLink}
            >
              <img
                src={
                  poster_path
                    ? `https://image.tmdb.org/t/p/w500${poster_path}`
                    : "https://dummyimage.com/500x750/000/fff&text=No+Image"
                }
                alt={title || "Movie poster"}
                className={styles.cardImage}
              />
            </Link>
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>
                <Link
                  to={`/movies/${id}`}
                  state={{ from: location }}
                  className={styles.cardLink}
                >
                  {title}
                </Link>
              </h3>
              <p className={styles.cardReleaseDate}>
                Release: {release_date || "Unknown"}
              </p>
              <p className={styles.cardRating}>
                Rating: {vote_average !== undefined ? vote_average : "N/A"}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p>No movies available.</p>
      )}
    </div>
  );
}

MovieList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      poster_path: PropTypes.string,
      release_date: PropTypes.string,
      vote_average: PropTypes.number,
    })
  ).isRequired,
};

export default MovieList;
