import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.css";
import logo from "/4chan-color.svg";

function Navigation() {
  return (
    <header>
      <nav className={styles.nav}>
        <NavLink to="/" className={styles.logoLink}>
          <img src={logo} alt="Logo" className={styles.logo} />
        </NavLink>

        {/* Інші посилання */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/movies"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
        >
          Movies
        </NavLink>
      </nav>
    </header>
  );
}

export default Navigation;
