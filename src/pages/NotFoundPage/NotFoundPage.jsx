import css from './NotFoundPage.module.css';
import {Link} from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className={css.notFoundWrapper}>
      <h1>Unfortunately, we didn't find any movie with such title</h1>
      <Link to="/">Go back to Home</Link>
    </div>
  );
};

export default NotFoundPage;
