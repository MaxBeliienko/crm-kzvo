import styles from './StatList.module.css';
import StatCard from '../statCard/StatCard';
import { AiOutlineUser } from 'react-icons/ai';
import { FaDollarSign, FaChartLine } from 'react-icons/fa';

const StatList = () => {
  const statsData = [
    {
      title: 'Total Customers',
      value: '21,978',
      percentage: 15,
      trend: 'up',
      description: 'From the last month',
      icon: <AiOutlineUser />,
    },
    {
      title: 'Active Customers',
      value: '10,369',
      percentage: 9,
      trend: 'down',
      description: 'From the last month',
      icon: <AiOutlineUser />,
    },
    {
      title: 'Total Profit',
      value: '$64,981.97',
      percentage: 1.2,
      trend: 'up',
      description: 'From the last month',
      icon: <FaDollarSign />,
    },
    {
      title: 'Total Expense',
      value: '$18,158.21',
      percentage: 2,
      trend: 'down',
      description: 'From the last month',
      icon: <FaChartLine />,
    },
  ];
  return (
    <ul className={styles['stat-list-container']}>
      {statsData.map((stat, index) => (
        <li key={index}>
          <StatCard {...stat} />
        </li>
      ))}
    </ul>
  );
};

export default StatList;
