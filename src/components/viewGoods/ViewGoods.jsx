const ViewGoods = ({ product }) => {
  const { name, precode, price, image, weight, taraWeight } = product;

  return (
    <div>
      <h3>{name}</h3>
      <p>{precode}</p>
      <img src={image} alt={name} />
      <p>Price: {price}</p>
      <p>Weight: {weight}</p>
      <p>Tara weight: {taraWeight}</p>
    </div>
  );
};

export default ViewGoods;
