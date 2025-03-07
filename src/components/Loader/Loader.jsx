import css from './Loader.module.css';
import {PuffLoader} from 'react-spinners';

const Loader = () => {
  return (
    <div className={css.loader}>
      <PuffLoader color="#36d7b7" size={60} />
    </div>
  );
};

export default Loader;
