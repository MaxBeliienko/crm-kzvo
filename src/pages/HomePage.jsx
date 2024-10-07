import styles from '../App.module.css';
import HomeTemporary from '../components/homeTemporary/HomeTemporary';

const HomePage = () => {
  return (
    <div className={styles['page-container']}>
      <HomeTemporary />
    </div>
  );
};

export default HomePage;
