import styles from '../App.module.css';
import SignUpForm from '../components/signUpForm/SignUpForm';

const SignUp = () => {
  return (
    <div className={styles['page-container']}>
      <SignUpForm />
    </div>
  );
};

export default SignUp;
