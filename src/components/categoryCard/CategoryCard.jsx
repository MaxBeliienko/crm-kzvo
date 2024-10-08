import styles from './CategoryCard.module.css';
import ukr from '../../images/ukraine.png';
import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { openModal } from '../../redux/modal/slice';
import { LuArrowDownWideNarrow } from 'react-icons/lu';
import { useTranslation } from 'react-i18next';

const CategoryCard = ({ category }) => {
  const { name, id } = category;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const menuRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useTranslation();

  const handleCategoryClick = () => {
    navigate(`/categories/${id}`);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleClickOutside = event => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleAction = actionType => {
    dispatch(openModal({ modalType: actionType, modalProps: { category } }));
  };

  return (
    <div className={styles['category-card-wrapper']}>
      <button
        className={styles['category-button']}
        onClick={handleCategoryClick}
      >
        <img src={ukr} alt="category-image" className={styles.div2} />
        <p className={styles.div3}>{name}</p>
        <p className={styles.div1}>{id}</p>
      </button>
      <div className={styles['menu-container']}>
        <button onClick={toggleMenu}>
          <LuArrowDownWideNarrow />
        </button>
        {menuOpen && (
          <div ref={menuRef}>
            <ul>
              <li onClick={() => handleAction('editCategory')}>
                {t('description.categories.EditCategory')}
              </li>
              <li onClick={() => handleAction('removeCategory')}>
                {t('description.categories.RemoveCategory')}
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryCard;
