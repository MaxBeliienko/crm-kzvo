import StatList from '../components/statList/StatList';
import VideoCont from '../components/videoCont/VideoCont';
import styles from '../App.module.css';

const HomePage = () => {
  return (
    <div className={styles['page-container']}>
      <StatList />
      <VideoCont />
    </div>
  );
};

export default HomePage;
