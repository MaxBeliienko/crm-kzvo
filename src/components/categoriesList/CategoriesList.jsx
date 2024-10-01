import styles from './CategoriesList.module.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../redux/categories/operations';
import { selectCategories } from '../../redux/categories/selectors';
import { useTranslation } from 'react-i18next';
import CategoryCard from '../categoryCard/CategoryCard';
import { openModal } from '../../redux/modal/slice';

const CategoriesList = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const { t } = useTranslation();

  // Запит для отримання категорій
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Логіка пошуку
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCategories = categories.filter(stat =>
    stat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAction = actionType => {
    dispatch(openModal({ modalType: actionType, modalProps: null }));
  };

  return (
    <div className={styles['categories-list-container']}>
      <div className={styles['categories-list-info-wrapper']}>
        <h2>Categories list</h2>
        <input
          className={styles['categories-search-input']}
          type="text"
          placeholder={t('description.goodsTable.SearchPlaceholder')}
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <button onClick={() => handleAction('addCategory')}>
          Add category
        </button>
      </div>
      <ul className={styles['categories-list']}>
        {filteredCategories.map(category => {
          return (
            <li key={category.sectionId}>
              <CategoryCard category={category} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CategoriesList;
