import styles from '../App.module.css';
import ProductsDescriptionTable from '../components/productsDescriptionTable/ProductsDescriptionTable';

const ProductsDescription = () => {
  return (
    <div className={styles['page-container']}>
      <span>Products description</span>
      <ProductsDescriptionTable />
    </div>
  );
};

export default ProductsDescription;
