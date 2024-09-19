const RemoveGoods = ({ product, onConfirm, onCancel }) => {
  return (
    <div>
      <p>Do you really want to delete the product {product.name}?</p>
      <button onClick={onConfirm}>Delete</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default RemoveGoods;
