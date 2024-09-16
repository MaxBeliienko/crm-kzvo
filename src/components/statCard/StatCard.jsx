import styles from './StatCard.module.css';

const StatCard = ({ title, value, percentage, icon, trend, description }) => {
  return (
    <div className={styles['stat-card']}>
      <div className={styles['stat-header']}>
        <span>{title}</span>
        <span className={styles['icon']}>{icon}</span>
      </div>
      <div className={styles['stat-value']}>{value}</div>
      <div className={styles['stat-footer']}>
        <span
          className={`${styles['stat-percentage']} ${
            trend === 'up' ? styles['positive'] : styles['negative']
          }`}
        >
          {trend === 'up' ? `↑ ${percentage}%` : `↓ ${percentage}%`}
        </span>
        <span>{description}</span>
      </div>
    </div>
  );
};

export default StatCard;
