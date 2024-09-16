import styles from './App.module.css';
import Sidebar from './components/sidebar/Sidebar';
import Header from './components/header/Header';
import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';

const HomePage = lazy(() => import('./pages/HomePage'));
const SalesAnalytics = lazy(() => import('./pages/SalesAnalytics'));
const NotFound = lazy(() => import('./components/notFound/NotFound'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className={styles['app-container']}>
        <Sidebar />
        <div className={styles['main-content']}>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/sales-analytics" element={<SalesAnalytics />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Suspense>
  );
}

export default App;
