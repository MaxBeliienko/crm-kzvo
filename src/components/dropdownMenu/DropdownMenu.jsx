import styles from './DropdownMenu.module.css';

const DropdownMenu = ({ menuRef }) => {
  return (
    <div ref={menuRef} className={styles['dropdown-menu']}>
      <ul>
        <li>First table</li>
        <li>Second table</li>
        <li>Third table</li>
      </ul>
    </div>
  );
};

export default DropdownMenu;
