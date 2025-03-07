import css from './MovieList.module.css';
import {Link, useLocation} from 'react-router-dom';

const MovieList = ({movies}) => {
  const location = useLocation();
  const prefix = location.pathname === '/' ? 'movies/' : '';

  return (
    <ul>
      {movies.map(movie => {
        return (
          <li key={movie.id}>
            <Link to={prefix + movie.id} state={location}>
              <h3>{movie.title}</h3>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default MovieList;
