import css from './SearchForm.module.css';
import {Formik, Form, Field} from 'formik';
import {toast} from 'react-hot-toast';
import {CiSearch} from 'react-icons/ci';

const SearchForm = ({onSubmit}) => {
  return (
    <header className={css.header}>
      <Formik
        initialValues={{query: ''}}
        onSubmit={(values, actions) => {
          if (!values.query.trim()) {
            toast.error('Please enter a movie name');
            return;
          }
          onSubmit(values.query.trim());
          actions.resetForm();
        }}
      >
        <Form className={css.form}>
          <div className={css.searchWrapper}>
            <button className={css.searchButton} type="submit">
              <CiSearch className={css.SearchIcon} />
            </button>
            <Field
              className={css.searchInput}
              type="text"
              name="query"
              autoComplete="off"
              autoFocus
              placeholder="Search movies"
            />
          </div>
        </Form>
      </Formik>
    </header>
  );
};

export default SearchForm;
