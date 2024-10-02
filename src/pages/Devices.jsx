import styles from '../App.module.css';
import DevicesTable from '../components/devicesTable/DevicesTable';

const Devices = () => {
  return (
    <div className={styles['page-container']}>
      <DevicesTable />
    </div>
  );
};

export default Devices;
