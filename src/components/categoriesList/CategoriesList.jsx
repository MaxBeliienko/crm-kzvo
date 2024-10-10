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
    dispatch(fetchCategories({ databaseId: 9 }));
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
        <h2>{t('description.categories.Title')}</h2>
        <input
          className={styles['categories-search-input']}
          type="text"
          placeholder={t('description.goodsTable.SearchPlaceholder')}
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <button
          className={styles['add-cat-button']}
          onClick={() => handleAction('addCategory')}
        >
          {t('description.categories.AddButton')}
        </button>
      </div>
      <ul className={styles['categories-list']}>
        {filteredCategories.map(category => {
          return (
            <li key={category.id}>
              <CategoryCard category={category} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CategoriesList;
