import { useSelector, useDispatch } from 'react-redux';
import Modal from './modal/Modal';
import AddProduct from './addProduct/AddProduct';
import EditGoods from './editGoods/EditGoods';
import RemoveGoods from './removeGoods/RemoveGoods';
import ViewGoods from './viewGoods/ViewGoods';
import AddCategory from './addCategory/AddCategory';
import EditCategory from './editCategory/EditCategory';
import RemoveCategory from './removeCategory/RemoveCategory';
import { closeModal } from '../redux/modal/slice';
import AddDevice from './addDevice/AddDevice';
import EditDevice from './editDevice/EditDevice';
import RemoveDevice from './removeDevice/RemoveDevice';

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
    case 'addCategory':
      return (
        <Modal onClose={handleClose}>
          <AddCategory onClose={handleClose} {...modalProps} />
        </Modal>
      );
    case 'editCategory':
      return (
        <Modal onClose={handleClose}>
          <EditCategory onClose={handleClose} {...modalProps} />
        </Modal>
      );
    case 'removeCategory':
      return (
        <Modal onClose={handleClose}>
          <RemoveCategory onClose={handleClose} {...modalProps} />
        </Modal>
      );
    case 'addDevice':
      return (
        <Modal onClose={handleClose}>
          <AddDevice onClose={handleClose} {...modalProps} />
        </Modal>
      );
    case 'editDevice':
      return (
        <Modal onClose={handleClose}>
          <EditDevice onClose={handleClose} {...modalProps} />
        </Modal>
      );
    case 'removeDevice':
      return (
        <Modal onClose={handleClose}>
          <RemoveDevice onClose={handleClose} {...modalProps} />
        </Modal>
      );

    default:
      return null;
  }
};

export default ModalManager;
