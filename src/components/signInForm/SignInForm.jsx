import styles from './SignInForm.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState, useId } from 'react';
import * as Yup from 'yup';
import { NavLink } from 'react-router-dom';
import { FaRegEye } from 'react-icons/fa';
import { FaRegEyeSlash } from 'react-icons/fa';

const initialValues = {
  email: '',
  password: '',
};

const RegistrationSchema = Yup.object().shape({
  email: Yup.string().email('Введіть валідний email').required('Required'),
  password: Yup.string()
    .min(7, 'Пароль має містити не менше 7 символів')
    .required('Required'),
});

const SignInForm = () => {
  const emailId = useId();
  const passwordId = useId();

  // Стан для відображення паролю
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = () => {
    console.log('SignUp work');
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={RegistrationSchema}
        onSubmit={handleSubmit}
      >
        <Form className={styles.form}>
          <div>
            <label htmlFor={emailId}>Email</label>
            <Field type="email" name="email" id={emailId} />
            <ErrorMessage name="email" component="span" />
          </div>
          <div>
            <label htmlFor={passwordId}>Password</label>
            <Field
              type={showPassword ? 'text' : 'password'}
              name="password"
              id={passwordId}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className={styles['password-eye']}
            >
              {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </span>
            <ErrorMessage name="password" component="span" />
          </div>
          <button type="submit">Registration</button>
        </Form>
      </Formik>
      <NavLink to="/signup" className={styles['sign-nav']}>
        SignUp
      </NavLink>
    </div>
  );
};

export default SignInForm;
