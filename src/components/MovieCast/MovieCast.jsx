import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCast } from "../../api/tmdbApi";
import styles from "./MovieCast.module.css";

function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const getCast = async () => {
      try {
        const data = await fetchMovieCast(movieId);
        if (data) setCast(data);
      } catch (error) {
        console.error("Error fetching movie cast:", error);
      }
    };

    getCast();
  }, [movieId]);

  return (
    <div className={styles.container}>
      <h3>Cast</h3>
      {cast.length > 0 ? (
        <ul className={styles.list}>
          {cast.map(({ id, name, profile_path }) => (
            <li key={id} className={styles.item}>
              <img
                src={
                  profile_path
                    ? `https://image.tmdb.org/t/p/w200${profile_path}`
                    : "https://via.placeholder.com/200x300?text=No+Image"
                }
                alt={name}
                className={styles.image}
              />
              <p>{name}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No cast information available.</p>
      )}
    </div>
  );
}

export default MovieCast;
