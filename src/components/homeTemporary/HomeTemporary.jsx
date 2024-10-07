import styles from './HomeTemporary.module.css';

const HomeTemporary = () => {
  return (
    <div className={styles.homeTemp}>
      <h1>Ласкаво просимо до нашого додатку!</h1>
      <p>
        Тепер Вам не потрібно витрачати багато часу на
        онвлення/додавання/редагування. Три кліки і все готово!
      </p>

      <div className={styles['contact-info']}>
        <h2>Контакти для зв'язку:</h2>
        <a href="mailto:it.kzvo@gmail.com">it.kzvo@gmail.com</a>
        <a href="tel:+380687446321">+38068 744-63-21</a>
      </div>
      <div className={styles.scale}></div>
    </div>
  );
};

export default HomeTemporary;
