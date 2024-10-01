import { useDispatch } from 'react-redux';
import { deleteCategory } from '../../redux/categories/operations';
import { useTranslation } from 'react-i18next';
import styles from './RemoveCategory.module.css';

const RemoveCategory = ({ category, onClose }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleRemove = () => {
    dispatch(deleteCategory({ categoryId: category.id }));
    onClose();
  };

  return (
    <div className={styles['remove-modal-container']}>
      <p>
        {t('description.remove.QuestionText')} {category.name}?
      </p>
      <div>
        <button onClick={handleRemove}>{t('description.remove.Delete')}</button>
        <button onClick={onClose}>{t('description.remove.Cancel')}</button>
      </div>
    </div>
  );
};

export default RemoveCategory;
