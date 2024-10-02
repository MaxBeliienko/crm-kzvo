import { useDispatch } from 'react-redux';
import { deleteDatabaseConnection } from '../../redux/devices/operations';
import styles from './RemoveDevice.module.css';
import { useTranslation } from 'react-i18next';

const RemoveDevice = ({ device, onClose }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleRemove = () => {
    dispatch(deleteDatabaseConnection({ databaseId: device.id }));
    onClose();
  };

  return (
    <div className={styles['remove-modal-container']}>
      <p>
        {t('description.remove.QuestionText')} {device.name}?
      </p>
      <div>
        <button onClick={handleRemove}>{t('description.remove.Delete')}</button>
        <button onClick={onClose}>{t('description.remove.Cancel')}</button>
      </div>
    </div>
  );
};

export default RemoveDevice;
