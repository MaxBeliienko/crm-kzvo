import { useDispatch } from 'react-redux';
import { deleteGoods } from '../../redux/goods/operations';

const RemoveGoods = ({ product, onClose }) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(deleteGoods({ databaseId: 1, goodsId: product.id }));
    onClose();
  };

  return (
    <div>
      <p>Do you really want to delete the product {product.name}?</p>
      <button onClick={handleRemove}>Delete</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default RemoveGoods;
