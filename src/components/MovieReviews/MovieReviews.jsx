import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieReviews } from "../../api/tmdbApi";
import styles from "./MovieReviews.module.css";

function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getReviews = async () => {
      try {
        const data = await fetchMovieReviews(movieId);
        setReviews(data);
      } catch (error) {
        setError(error.message);
      }
    };

    getReviews();
  }, [movieId]);

  return (
    <div className={styles.container}>
      <h3>Reviews</h3>
      {error && <p className={styles.error}>{error}</p>}
      {reviews.length > 0 ? (
        <ul className={styles.list}>
          {reviews.map(({ id, author, content }) => (
            <li key={id} className={styles.item}>
              <h4>{author}</h4>
              <p>{content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews found.</p>
      )}
    </div>
  );
}

export default MovieReviews;
