import styles from './CategoryCard.module.css';
import ukr from '../../images/ukraine.png';

const CategoryCard = ({ category }) => {
  const { name, sectionId } = category;

  const handleCategoryClick = () => {
    return console.log('Work');
  };
  return (
    <button className={styles['category-button']} onClick={handleCategoryClick}>
      <img src={ukr} alt="" width={100} />
      {name}
    </button>
  );
};

export default CategoryCard;
