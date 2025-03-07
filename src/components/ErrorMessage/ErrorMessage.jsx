import css from './ErrorMessage.module.css';

const ErrorMessage = ({message}) => {
    return (
      <p className={css.errorMessage}>
        {message || 'Something went wrong. Please try again.'}
      </p>
    );
  };
  
  export default ErrorMessage;