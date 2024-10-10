import styles from './GoodsTable.module.css';
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchGoods,
  fetchGoodsByCategory,
  uploadFile,
} from '../../redux/goods/operations';
import {
  selectGoods,
  selectGoodsLoading,
  selectGoodsError,
  selectTotalCountGoods,
} from '../../redux/goods/selectors';
import { openModal } from '../../redux/modal/slice';
import { FaArrowDown } from 'react-icons/fa';
import { FaArrowUp } from 'react-icons/fa';
import Pagination from '../pagination/Pagination';

const GoodsTable = () => {
  const { sectionId } = useParams();
  const dispatch = useDispatch();
  const loading = useSelector(selectGoodsLoading);
  const error = useSelector(selectGoodsError);
  const menuRef = useRef(null);
  const { t } = useTranslation();

  const [limit, setLimit] = useState(10);

  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = useSelector(selectTotalCountGoods);
  const totalPages = Math.ceil(totalItems / limit);

  const goods = useSelector(selectGoods);

  // В залежності від наявності sectionId відправляємо різні запити
  useEffect(() => {
    if (sectionId) {
      dispatch(fetchGoodsByCategory({ sectionId }));
    } else {
      dispatch(
        fetchGoods({ databaseId: 9, page: currentPage - 1, limit: limit })
      );
    }
  }, [dispatch, currentPage, limit, sectionId]);

  const handlePageChange = newPage => setCurrentPage(newPage);

  const handleLimitChange = event => {
    setLimit(Number(event.target.value));
    setCurrentPage(1);
  };

  // Логіка пошуку
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = goods.filter(stat =>
    stat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Логіка сортування
  const [sortKey, setSortKey] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  const toggleSortOrder = () => {
    setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (typeof a[sortKey] === 'string') {
      return sortOrder === 'asc'
        ? a[sortKey].localeCompare(b[sortKey])
        : b[sortKey].localeCompare(a[sortKey]);
    } else {
      return sortOrder === 'asc'
        ? a[sortKey] - b[sortKey]
        : b[sortKey] - a[sortKey];
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

  // Відкриття модального вікна View/Edit/Remove
  const handleAction = (actionType, product) => {
    dispatch(openModal({ modalType: actionType, modalProps: { product } }));
    setMenuOpen(null);
  };

  //Логіка завантаження файлу товарів
  const [file, setFile] = useState(null);
  const handleFileChange = event => {
    setFile(event.target.files[0]); // Зберігаємо вибраний файл
  };
  const handleFileUpload = async () => {
    if (file) {
      const result = await dispatch(uploadFile({ databaseId: 9, file }));
      if (!result.error) {
        window.location.reload();
      }
    }
    setFile(null);
  };

  // Таблиця
  let content;

  if (loading) {
    content = <p>Loading...</p>;
  } else if (!goods.length) {
    content = <p>{t('description.goodsTable.NoGoods')}</p>;
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
              <td>{product.price}</td>
              <td>{product.code}</td>
              <td>
                {product.pcsGood === false
                  ? t('description.goodsTable.Weighted')
                  : t('description.goodsTable.ByPiece')}
              </td>
              <td>{product.idSection}</td>
              <td>
                <button onClick={() => handleMenuToggle(product.id)}>
                  ...
                </button>
                {menuOpen === product.id && (
                  <div ref={menuRef} className={styles['dropdown-menu']}>
                    <ul>
                      <li onClick={() => handleAction('viewProduct', product)}>
                        {t('description.goodsTable.View')}
                      </li>
                      <li onClick={() => handleAction('editProduct', product)}>
                        {t('description.goodsTable.Edit')}
                      </li>
                      <li
                        onClick={() => handleAction('removeProduct', product)}
                      >
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
          <span>{t('description.goodsTable.SortBy')}</span>
          <select
            className={styles['goods-table-select']}
            onChange={e => setSortKey(e.target.value)}
          >
            <option value="name">{t('description.goodsTable.Name')}</option>
            <option value="precode">
              {t('description.goodsTable.Precode')}
            </option>
            <option value="price">{t('description.goodsTable.Price')}</option>
            <option value="code">{t('description.goodsTable.Code')}</option>
            <option value="pcsGood">
              {t('description.goodsTable.PcsGood')}
            </option>
            <option value="idSection">
              {t('description.goodsTable.IdSection')}
            </option>
          </select>
          <div className={styles['sort-order-toggle']}>
            <button onClick={toggleSortOrder}>
              {sortOrder === 'asc' ? <FaArrowDown /> : <FaArrowUp />}
            </button>
          </div>
          <select
            className={styles['goods-table-limit-select']}
            value={limit}
            onChange={handleLimitChange}
          >
            <option value={10}>10</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value={500}>500</option>
          </select>
        </div>
        <div className={styles['button-wrapper']}>
          <button
            onClick={() => handleAction('addProduct', null)}
            className={styles['add-product-button']}
          >
            {t('description.goodsTable.AddProduct')}
          </button>
          <input
            type="file"
            accept=".txt"
            onChange={handleFileChange}
            style={{ display: 'none' }}
            id="file-product-input"
          />
          <label
            htmlFor="file-product-input"
            className={
              file ? styles['label-file-done'] : styles['label-file-no']
            }
          >
            {file
              ? t('description.goodsTable.LabelOn')
              : t('description.goodsTable.LabelOff')}
          </label>
          {file && (
            <button onClick={handleFileUpload}>
              {t('description.goodsTable.AddGoodsFile')}
            </button>
          )}
        </div>
      </div>
      {content}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default GoodsTable;
