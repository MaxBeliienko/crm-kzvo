import styles from './ViewGoods.module.css';

const ViewGoods = ({ product }) => {
  const {
    name,
    precode,
    code,
    idSection,
    idTemplate,
    barcodeCoding,
    description,
    before_validaty,
    type,
    price,
    image,
    weight,
    taraWeight,
    pcsGood,
  } = product;

  return (
    <div className={styles['view-goods-container']}>
      <div className={styles['div1']}>
        <img className={styles['view-goods-image']} src={image} alt={name} />
      </div>
      <div className={styles['div2']}>
        <h3>{name}</h3>
      </div>
      <div className={styles['div3']}>
        <p>Precode:</p>
        <p>{precode}</p>
      </div>
      <div className={styles['div4']}>
        <p>Code:</p>
        <p>{code}</p>
      </div>
      <div className={styles['div5']}>
        <p>Pcs Good: </p>
        <p>{pcsGood}</p>
      </div>
      <div className={styles['div6']}>
        <p>Price:</p>
        <p>{price}</p>
      </div>
      <div className={styles['div7']}>
        <p>{description}</p>
      </div>
      <div className={styles['div8']}>
        <p>Weight:</p>
        <p>{weight}</p>
      </div>
      <div className={styles['div9']}>
        <p>Tara weight: </p>
        <p>{taraWeight}</p>
      </div>
      <div className={styles['div10']}>
        <p>Barcode: </p>
        <p>{barcodeCoding}</p>
      </div>
      <div className={styles['div11']}>
        <p>Before validaty: </p>
        <p>{before_validaty}</p>
      </div>
      <div className={styles['div12']}>
        <p>Id section: </p>
        <p>{idSection}</p>
      </div>
      <div className={styles['div13']}>
        <p>Id template: </p>
        <p>{idTemplate}</p>
      </div>

      <div className={styles['div14']}>
        <p>Type: </p>
        <p>{type}</p>
      </div>
    </div>
  );
};

export default ViewGoods;
