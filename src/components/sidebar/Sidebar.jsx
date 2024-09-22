import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './Sidebar.module.css';
import logo from '../../images/logo.png';

const Sidebar = () => {
  // Стан для керування розгорнутий/згорнутий Dashboard
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);

  const toggleDashboard = () => setIsDashboardOpen(!isDashboardOpen);
  const logoToggleDashboard = () => setIsDashboardOpen(true);

  const { t } = useTranslation();

  return (
    <div className={styles['sidebar-container']}>
      <NavLink
        onClick={logoToggleDashboard}
        to="/"
        className={styles['logo-wrap']}
      >
        <img src={logo} alt="logo" width={40} />
        <span>SERVICE</span>
      </NavLink>

      <nav className={styles['sidebar-nav-container']}>
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
              to="/goods-description"
              className={({ isActive }) =>
                `${isActive ? styles.activeLink : styles.inactiveLink} ${
                  styles['del-padding-left']
                }`
              }
            >
              {t('description.sidebar.Goods')}
            </NavLink>
          </li>
          <li></li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
