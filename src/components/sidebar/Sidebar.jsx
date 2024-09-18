import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  // Стан для керування розгорнутий/згорнутий Dashboard
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);

  const toggleDashboard = () => setIsDashboardOpen(!isDashboardOpen);

  const { t } = useTranslation();

  return (
    <nav className={styles['sidebar-container']}>
      <span className={styles['sidebar-span-title']}>
        {t('description.sidebar.Menu')}
      </span>
      <ul className={styles['sidebar-menu-list']}>
        <li className={styles['sidebar-menu-item']}>
          <span
            onClick={toggleDashboard}
            className={isDashboardOpen ? styles.activeItem : undefined}
          >
            {t('description.sidebar.Dashboard')}
          </span>

          {isDashboardOpen && (
            <ul className={styles['sidebar-dashboard-list']}>
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? styles.activeLink : styles.inactiveLink
                  }
                >
                  {t('description.sidebar.Homepage')}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/sales-analytics"
                  className={({ isActive }) =>
                    isActive ? styles.activeLink : styles.inactiveLink
                  }
                >
                  {t('description.sidebar.SalesAnalytics')}
                </NavLink>
              </li>
            </ul>
          )}
        </li>
      </ul>
      <span className={styles['sidebar-span-title']}>
        {t('description.sidebar.Products')}
      </span>
      <ul>
        <li>
          <NavLink
            to="/products-description"
            className={({ isActive }) =>
              `${isActive ? styles.activeLink : styles.inactiveLink} ${
                styles['del-padding-left']
              }`
            }
          >
            Product description
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/goods-description"
            className={({ isActive }) =>
              `${isActive ? styles.activeLink : styles.inactiveLink} ${
                styles['del-padding-left']
              }`
            }
          >
            Product description
          </NavLink>
        </li>
        <li></li>
      </ul>
    </nav>
  );
};

export default Sidebar;
