import { useDispatch } from 'react-redux';
import { deleteGoods } from '../../redux/goods/operations';
import { useTranslation } from 'react-i18next';
import styles from './RemoveGoods.module.css';

const RemoveGoods = ({ product, onClose }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleRemove = () => {
    dispatch(deleteGoods({ goodsId: product.id }));
    onClose();
  };

  return (
    <div className={styles['remove-modal-container']}>
      <p>
        {t('description.remove.QuestionText')} {product.name}?
      </p>
      <div>
        <button onClick={handleRemove}>{t('description.remove.Delete')}</button>
        <button onClick={onClose}>{t('description.remove.Cancel')}</button>
      </div>
    </div>
  );
};

export default RemoveGoods;
