import styles from './DevicesTable.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectDevices } from '../../redux/devices/selectors';
import { useEffect, useState, useRef } from 'react';
import { fetchAllDatabase } from '../../redux/devices/operations';
import { openModal } from '../../redux/modal/slice';
import { useTranslation } from 'react-i18next';

const DevicesTable = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const devices = useSelector(selectDevices);
  const menuRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(null);

  useEffect(() => {
    dispatch(fetchAllDatabase());
  }, [dispatch]);

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

  const handleMenuToggle = id => {
    setMenuOpen(menuOpen === id ? null : id);
  };

  const handleAction = (actionType, device) => {
    dispatch(openModal({ modalType: actionType, modalProps: { device } }));
    setMenuOpen(null);
  };

  return (
    <div className={styles['devices-table-wrapper']}>
      <div className={styles['devices-table-info']}>
        <h2>{t('description.devices.Title')}</h2>
        <button onClick={() => handleAction('addDevice', null)}>
          {t('description.devices.AddButton')}
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>{t('description.devices.Name')}</th>
            <th>{t('description.devices.Model')}</th>
            <th>{t('description.devices.DbName')}</th>
            <th>IP</th>
            <th>{t('description.devices.Actions')}</th>
          </tr>
        </thead>
        <tbody>
          {devices.map(device => {
            const { id, name, url } = device;
            const urlParts = url.split('/');
            const ip = url.split('//')[1].split('/')[0];
            const databaseName = urlParts[urlParts.length - 1];
            return (
              <tr key={id}>
                <td>{id}</td>
                <td>{name}</td>
                <td>GoodAurora</td>
                <td>{databaseName}</td>
                <td>{ip}</td>
                <td>
                  <button onClick={() => handleMenuToggle(id)}>...</button>
                  {menuOpen === id && (
                    <div ref={menuRef} className={styles['dropdown-menu']}>
                      <ul>
                        <li onClick={() => handleAction('editDevice', device)}>
                          {t('description.devices.EditDevice')}
                        </li>
                        <li
                          onClick={() => handleAction('removeDevice', device)}
                        >
                          {t('description.devices.RemoveDevice')}
                        </li>
                      </ul>
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DevicesTable;
