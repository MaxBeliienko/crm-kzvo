import styles from './GoodsTable.module.css';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGoods } from '../../redux/goods/operations';
import {
  selectGoods,
  selectGoodsLoading,
  selectGoodsError,
} from '../../redux/goods/selectors';

const GoodsTable = () => {
  const dispatch = useDispatch();
  const goods = useSelector(selectGoods);
  const loading = useSelector(selectGoodsLoading);
  const error = useSelector(selectGoodsError);
  const menuRef = useRef(null);

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

  const handleAction = (action, product) => {
    console.log(`${action} action for product:`, product);
    setMenuOpen(null);
    // Надалі тут буде логіка длі View, Edit...
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
            <td>Name</td>
            <td>Code</td>
            <td>Image</td>
            <td>Price</td>
            <td>Weight</td>
            <td>Tara weight</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {sortedProducts.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.precode}</td>
              <td>
                <img
                  src={base64ToImageUrl(product.image)}
                  alt={product.name}
                  style={{ width: '50px', height: '50px' }}
                />
              </td>
              <td>{product.price}</td>
              <td>{product.weight}</td>
              <td>{product.taraWeight}</td>
              <td>
                <button onClick={() => handleMenuToggle(product.id)}>
                  ...
                </button>
                {menuOpen === product.id && (
                  <div ref={menuRef} className={styles['dropdown-menu']}>
                    <ul>
                      <li onClick={() => handleAction('View', product)}>
                        View
                      </li>
                      <li onClick={() => handleAction('Edit', product)}>
                        Edit
                      </li>
                      <li onClick={() => handleAction('Remove', product)}>
                        Remove
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
          <h2 className={styles['goods-table-title']}>All goods</h2>
        </div>
        <div>
          <input
            className={styles['goods-table-search-input']}
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <select
            className={styles['goods-table-select']}
            onChange={e => setSortKey(e.target.value)}
          >
            <option value="name">Name</option>
            <option value="precode">Code</option>
            <option value="price">Price</option>
            <option value="weight">Weight</option>
          </select>
        </div>
      </div>
      {content}
    </div>
  );
};

export default GoodsTable;
