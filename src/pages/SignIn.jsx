import styles from '../App.module.css';
import SignInForm from '../components/signInForm/SignInForm';

const SignIn = () => {
  return (
    <div className={styles['page-container']}>
      <SignInForm />
    </div>
  );
};

export default SignIn;
