import styles from '../App.module.css';
import CategoriesList from '../components/categoriesList/CategoriesList';

const Categories = () => {
  return (
    <div className={styles['page-container']}>
      <CategoriesList />
    </div>
  );
};

export default Categories;
