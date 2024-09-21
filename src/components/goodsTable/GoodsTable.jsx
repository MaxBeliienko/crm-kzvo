import styles from './GoodsTable.module.css';
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchGoods,
  updateGoods,
  deleteGoods,
  addGoods,
} from '../../redux/goods/operations';
import {
  selectGoods,
  selectGoodsLoading,
  selectGoodsError,
} from '../../redux/goods/selectors';
import Modal from '../modal/Modal';
import ViewGoods from '../viewGoods/ViewGoods';
import EditGoods from '../editGoods/EditGoods';
import RemoveGoods from '../removeGoods/RemoveGoods';
import AddProduct from '../addProduct/AddProduct';

const GoodsTable = () => {
  const dispatch = useDispatch();
  const goods = useSelector(selectGoods);
  const loading = useSelector(selectGoodsLoading);
  const error = useSelector(selectGoodsError);
  const menuRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    // Отримання товарів при завантаженні компонента
    dispatch(fetchGoods({ databaseId: 1, page: 0, limit: 10 }));
  }, [dispatch]);

  // Функція для перетворення Base64 в URL зображення
  const base64ToImageUrl = base64String => {
    return `data:image/jpeg;base64,${base64String}`;
  };

  // Логіка пошуку
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = goods.filter(stat =>
    stat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Логіка сортування
  const [sortKey, setSortKey] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (typeof a[sortKey] === 'string') {
      if (sortOrder === 'asc') {
        return a[sortKey].localeCompare(b[sortKey]);
      } else {
        return b[sortKey].localeCompare(a[sortKey]);
      }
    } else {
      if (sortOrder === 'asc') {
        return a[sortKey] - b[sortKey];
      } else {
        return b[sortKey] - a[sortKey];
      }
    }
  });

  // Логіка випадаючого меню у стовбці Action
  // Зберігаємо ID продукту для відкриття меню
  const [menuOpen, setMenuOpen] = useState(null);

  // Закриття меню при кліку за його межами
  useEffect(() => {
    const handleClickOutside = event => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(null); // Закриваємо меню, якщо клік поза ним
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Відкриття/закриття меню
  const handleMenuToggle = id => {
    setMenuOpen(menuOpen === id ? null : id);
  };

  // Логіка для рендерингу в залежності від обраного списку випадаючого меню
  const [selectedGoods, setSelectedGoods] = useState(null); // Для зберігання вибраного товару
  const [modalType, setModalType] = useState(null); // Для відстеження активної модалки

  const handleAction = (action, product) => {
    setSelectedGoods(product);
    setModalType(action);
    setMenuOpen(null);
  };

  // Dispatch для зберігання змін після редагування
  // const handleEditSave = updateProducts => {
  //   dispatch(
  //     updateGoods({
  //       databaseId: 1,
  //       goodsId: selectedGoods.id,
  //       goodsData: updateProducts,
  //     })
  //   );
  //   setModalType(null);
  // };

  const handleDeleteConfirm = () => {
    console.log(selectGoods);
    dispatch(deleteGoods({ databaseId: 1, goodsId: selectedGoods.id }));
    setModalType(null);
    console.log(selectGoods.id);
  };

  let content;

  if (loading) {
    content = <p>Loading...</p>;
  } else if (error) {
    content = <p>Error: {error.message || 'Something went wrong'}</p>;
  } else {
    content = (
      <table>
        <thead>
          <tr>
            <td>{t('description.goodsTable.Name')}</td>
            <td>{t('description.goodsTable.Precode')}</td>
            <td>{t('description.goodsTable.Price')}</td>
            <td>{t('description.goodsTable.Code')}</td>
            <td>{t('description.goodsTable.PcsGood')}</td>
            <td>{t('description.goodsTable.IdSection')}</td>
            <td>{t('description.goodsTable.Action')}</td>
          </tr>
        </thead>
        <tbody>
          {sortedProducts.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.precode}</td>
              {/* <td>
                <img
                  src={base64ToImageUrl(product.image)}
                  alt={product.name}
                  style={{ width: '50px', height: '50px' }}
                />
              </td> */}
              <td>{product.price}</td>
              <td>{product.code}</td>
              <td>{product.pcsGood}</td>
              <td>{product.idSection}</td>
              <td>
                <button onClick={() => handleMenuToggle(product.id)}>
                  ...
                </button>
                {menuOpen === product.id && (
                  <div ref={menuRef} className={styles['dropdown-menu']}>
                    <ul>
                      <li onClick={() => handleAction('View', product)}>
                        {t('description.goodsTable.View')}
                      </li>
                      <li onClick={() => handleAction('Edit', product)}>
                        {t('description.goodsTable.Edit')}
                      </li>
                      <li onClick={() => handleAction('Remove', product)}>
                        {t('description.goodsTable.Remove')}
                      </li>
                    </ul>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  return (
    <div className={styles['goods-table-wrapper']}>
      <div className={styles['goods-table-info-container']}>
        <div className={styles['goods-table-info-text']}>
          <h2 className={styles['goods-table-title']}>
            {t('description.goodsTable.Header')}
          </h2>
        </div>
        <div className={styles['goods-table-filter-wrap']}>
          <input
            className={styles['goods-table-search-input']}
            type="text"
            placeholder={t('description.goodsTable.SearchPlaceholder')}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <select
            className={styles['goods-table-select']}
            onChange={e => setSortKey(e.target.value)}
          >
            <option value="name">Name</option>
            <option value="precode">Precode</option>
            <option value="price">Price</option>
            <option value="code">Code</option>
            <option value="pcsGood">pcsGood</option>
            <option value="idSection">Id section</option>
          </select>
          <button
            onClick={() => setModalType('Add')}
            className={styles['add-product-button']}
          >
            Add product
          </button>
        </div>
      </div>
      {content}

      {/* Модальні вікна */}
      {modalType === 'View' && (
        <Modal isOpen={!!modalType} onClose={() => setModalType(null)}>
          <ViewGoods product={selectedGoods} />
        </Modal>
      )}
      {modalType === 'Edit' && (
        <Modal isOpen={!!modalType} onClose={() => setModalType(null)}>
          <EditGoods
            product={selectedGoods}
            onClose={() => setModalType(null)}
          />
        </Modal>
      )}
      {modalType === 'Remove' && (
        <Modal isOpen={!!modalType} onClose={() => setModalType(null)}>
          <RemoveGoods
            product={selectedGoods}
            onConfirm={handleDeleteConfirm}
            onCancel={() => setModalType(null)}
          />
        </Modal>
      )}
      {modalType === 'Add' && (
        <Modal isOpen={!!modalType} onClose={() => setModalType(null)}>
          <AddProduct onClose={() => setModalType(null)} />
        </Modal>
      )}
    </div>
  );
};

export default GoodsTable;
