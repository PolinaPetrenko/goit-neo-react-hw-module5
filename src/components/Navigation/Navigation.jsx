import css from './Navigation.module.css';
import {NavLink} from 'react-router-dom';

const Navigation = () => {
  return (
    <header>
      <nav className={css.navigationWrapper}>
        <NavLink
          to="/"
          className={({isActive}) => (isActive ? css.active : '')}
        >
          Home
        </NavLink>
        <NavLink
          to="/movies"
          className={({isActive}) => (isActive ? css.active : '')}
        >
          Movies
        </NavLink>
      </nav>
    </header>
  );
};

export default Navigation;
