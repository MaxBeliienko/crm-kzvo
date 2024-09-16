import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './NotFound.module.css';

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 5000);
    return () => clearTimeout(timer);
  }, [navigate]);

  const { t } = useTranslation();

  return (
    <div className={styles.notFoundContainer}>
      <h1 className={styles.notFoundTitle}>404</h1>
      <p className={styles.notFoundMessage}>
        {t('description.notFound.NotFoundMessage')}
      </p>
      <p className={styles.redirectMessage}>
        {t('description.notFound.RedirectMessage')}
      </p>
    </div>
  );
};

export default NotFound;
