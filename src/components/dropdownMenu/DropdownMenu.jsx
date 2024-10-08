import styles from './DropdownMenu.module.css';
import { useDispatch } from 'react-redux';
import { openModal } from '../../redux/modal/slice';
import { useTranslation } from 'react-i18next';

const DropdownMenu = ({ menuRef, closeMenu }) => {
  const dispatch = useDispatch();

  const handleAction = (actionType, product) => {
    dispatch(openModal({ modalType: actionType, modalProps: { product } }));
    closeMenu();
  };

  const { t } = useTranslation();

  return (
    <div ref={menuRef} className={styles['dropdown-menu']}>
      <ul>
        <li>
          <button onClick={() => handleAction('addProduct', null)}>
            {t('description.dropdown.Product')}
          </button>
        </li>
        <li>
          <button onClick={() => handleAction('addCategory', null)}>
            {t('description.dropdown.Category')}
          </button>
        </li>
        <li>
          <button onClick={() => handleAction('addDevice', null)}>
            {t('description.dropdown.Device')}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default DropdownMenu;
