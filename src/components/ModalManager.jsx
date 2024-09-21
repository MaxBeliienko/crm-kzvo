import { useSelector, useDispatch } from 'react-redux';
import Modal from './modal/Modal';
import AddProduct from './addProduct/AddProduct';
import EditGoods from './editGoods/EditGoods';
import RemoveGoods from './removeGoods/RemoveGoods';
import ViewGoods from './viewGoods/ViewGoods';

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
          <AddProduct {...modalProps} />
        </Modal>
      );
    case 'editProduct':
      return (
        <Modal onClose={handleClose}>
          <EditGoods {...modalProps} />
        </Modal>
      );

    default:
      return null;
  }
};

export default ModalManager;
