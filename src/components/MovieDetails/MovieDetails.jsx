import css from './MovieDetails.module.css';

const MovieDetails = ({movie}) => {
  const genres = movie.genres.map(genre => genre.name).join(', ');
  const userScore = Math.floor((Number(movie.vote_average) ?? 0) * 10);
  const releaseYear = movie.release_date.slice(0, 4);

  return (
    <>
      <div className={css.movieWrapper}>
        <img
          className={css.poster}
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={`${movie.title} poster`}
        />
        <div className={css.movieInfo}>
          <h2>{`${movie.title} - (${releaseYear})`}</h2>
          <p>User Score: {userScore}%</p>
          <h3>Overview</h3>
          <p>{movie.overview}</p>
          <h3>Genres</h3>
          <p>{genres}</p>
        </div>
      </div>
    </>
  );
};

export default MovieDetails;
