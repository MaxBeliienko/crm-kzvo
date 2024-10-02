import styles from './DevicesTable.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectDevices } from '../../redux/devices/selectors';
import { useEffect, useState, useRef } from 'react';
import { fetchAllDatabase } from '../../redux/devices/operations';
import { openModal } from '../../redux/modal/slice';

const DevicesTable = () => {
  const dispatch = useDispatch();
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
      <div>
        <h2>All devices</h2>
        <button onClick={() => handleAction('addDevice', null)}>
          Add device
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Model</th>
            <th>Database name</th>
            <th>IP</th>
            <th>Actions</th>
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
                          Редагувати
                        </li>
                        <li
                          onClick={() => handleAction('removeDevice', device)}
                        >
                          Видалити
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
