import styles from '../App.module.css';
import GoodsTable from '../components/goodsTable/GoodsTable';

const ProductsDescription = () => {
  return (
    <div className={styles['page-container']}>
      <GoodsTable />
    </div>
  );
};

export default ProductsDescription;
