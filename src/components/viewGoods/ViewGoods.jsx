import styles from './ViewGoods.module.css';
import { useTranslation } from 'react-i18next';

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

  const { t } = useTranslation();

  return (
    <div className={styles['view-goods-container']}>
      <div className={styles['div1']}>
        <img className={styles['view-goods-image']} src={image} alt={name} />
      </div>
      <div className={styles['div2']}>
        <h3>{name}</h3>
      </div>
      <div className={styles['div3']}>
        <p>{t('description.product.Precode')}:</p>
        <p>{precode}</p>
      </div>
      <div className={styles['div4']}>
        <p>{t('description.product.Code')}:</p>
        <p>{code}</p>
      </div>
      <div className={styles['div5']}>
        <p>{t('description.product.PcsGood')}: </p>
        <p>
          {pcsGood
            ? t('description.product.ByPiece')
            : t('description.product.Weighted')}
        </p>
      </div>
      <div className={styles['div6']}>
        <p>{t('description.product.Price')}:</p>
        <p>{price}</p>
      </div>
      <div className={styles['div7']}>
        <p>{description}</p>
      </div>
      <div className={styles['div8']}>
        <p>{t('description.product.Weight')}:</p>
        <p>{weight}</p>
      </div>
      <div className={styles['div9']}>
        <p>{t('description.product.TaraWeight')}: </p>
        <p>{taraWeight}</p>
      </div>
      <div className={styles['div10']}>
        <p>{t('description.product.Barcode')}: </p>
        <p>{barcodeCoding}</p>
      </div>
      <div className={styles['div11']}>
        <p>{t('description.product.BeforeValidity')}: </p>
        <p>{before_validaty}</p>
      </div>
      <div className={styles['div12']}>
        <p>{t('description.product.IdSection')}: </p>
        <p>{idSection}</p>
      </div>
      <div className={styles['div13']}>
        <p>{t('description.product.IdTemplate')}: </p>
        <p>{idTemplate}</p>
      </div>

      <div className={styles['div14']}>
        <p>{t('description.product.Type')}: </p>
        <p>{type}</p>
      </div>
    </div>
  );
};

export default ViewGoods;
