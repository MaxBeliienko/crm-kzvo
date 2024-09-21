import styles from './DropdownMenu.module.css';
import { useDispatch } from 'react-redux';
import { openModal, closeModal } from '../../redux/modal/slice';

const DropdownMenu = ({ menuRef, closeMenu }) => {
  const dispatch = useDispatch();

  const handleAction = (actionType, product) => {
    dispatch(openModal({ modalType: actionType, modalProps: { product } }));
    closeMenu();
  };

  return (
    <div ref={menuRef} className={styles['dropdown-menu']}>
      <ul>
        <li>
          <button onClick={() => handleAction('addProduct', null)}>
            Add product
          </button>
        </li>
        <li>Second table</li>
        <li>Third table</li>
      </ul>
    </div>
  );
};

export default DropdownMenu;
