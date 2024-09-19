import { useEffect } from 'react';
import styles from './Modal.module.css';
import { IoIosClose } from 'react-icons/io';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; // Якщо вікно не має бути відкрите, не рендеримо нічого

  // Закриття модалки по клавіші Esc
  useEffect(() => {
    const handleEscape = event => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  // Закриття при кліку по бекдропу
  const handleBackdropClick = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles['modal-overlay']} onClick={handleBackdropClick}>
      <div className={styles['modal-content']}>
        <button className={styles['close-button']} onClick={onClose}>
          <IoIosClose />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
