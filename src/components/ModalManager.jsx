import { useSelector, useDispatch } from 'react-redux';
import Modal from './modal/Modal';
import AddProduct from './addProduct/AddProduct';
import EditGoods from './editGoods/EditGoods';
import RemoveGoods from './removeGoods/RemoveGoods';
import ViewGoods from './viewGoods/ViewGoods';
import { closeModal } from '../redux/modal/slice';

const ModalManager = () => {
  const dispatch = useDispatch();
  const { modalType, modalProps } = useSelector(state => state.modal);

  const handleClose = () => {
    dispatch(closeModal());
  };

  switch (modalType) {
    case 'addProduct':
      return (
        <Modal onClose={handleClose}>
          <AddProduct onClose={handleClose} {...modalProps} />
        </Modal>
      );
    case 'editProduct':
      return (
        <Modal onClose={handleClose}>
          <EditGoods onClose={handleClose} {...modalProps} />
        </Modal>
      );
    case 'viewProduct':
      return (
        <Modal onClose={handleClose}>
          <ViewGoods {...modalProps} />
        </Modal>
      );
    case 'removeProduct':
      return (
        <Modal onClose={handleClose}>
          <RemoveGoods onClose={handleClose} {...modalProps} />
        </Modal>
      );

    default:
      return null;
  }
};

export default ModalManager;
