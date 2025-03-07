import {NavLink, useParams} from 'react-router-dom';
import css from './AdditionalInformation.module.css';

const AdditionalInformation = () => {
  const {movieId} = useParams();

  return (
    <div className={css.additionalInformation}>
      <h3>Additional information</h3>
      <ul>
        <li>
          <NavLink 
            to={`/movies/${movieId}/cast`} 
            className={({ isActive }) => (isActive ? css.active : '')}
          >
            Cast
          </NavLink>
        </li>
        <li>
          <NavLink 
            to={`/movies/${movieId}/reviews`} 
            className={({ isActive }) => (isActive ? css.active : '')}
          >
            Reviews
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default AdditionalInformation;
