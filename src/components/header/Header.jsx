import { useTranslation } from 'react-i18next';
import LocalizationSwitcher from '../localizationSwitcher/LocalizationSwitcher';
import DropdownMenu from '../dropdownMenu/DropdownMenu';
import styles from './Header.module.css';
import { GrAdd } from 'react-icons/gr';
import { useEffect, useRef, useState } from 'react';

const Header = () => {
  // Стан для відображення меню при кліці на GrAdd
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null); // Ref для меню

  // Функція для перемикання видимості меню
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Закриття меню при кліку за його межами
  useEffect(() => {
    const handleClickOutside = event => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    // Закриття меню при натисканні клавіші Esc
    const handleEscKey = event => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscKey);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, []);
  return (
    <header className={styles['header-container']}>
      <input
        className={styles['header-search-input']}
        type="text"
        name="search"
        placeholder="Search"
      />

      <div>
        <button onClick={toggleMenu}>
          <GrAdd />
        </button>
      </div>
      {isMenuOpen && <DropdownMenu closeMenu={toggleMenu} menuRef={menuRef} />}
      <LocalizationSwitcher />
    </header>
  );
};

export default Header;
