import styles from './App.module.css';
import 'react-toastify/dist/ReactToastify.css';

import Sidebar from './components/sidebar/Sidebar';
import Header from './components/header/Header';
import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import ModalManager from './components/ModalManager';
import { ToastContainer } from 'react-toastify';

const HomePage = lazy(() => import('./pages/HomePage'));
const SalesAnalytics = lazy(() => import('./pages/SalesAnalytics'));
const NotFound = lazy(() => import('./components/notFound/NotFound'));
const GoodsDescription = lazy(() => import('./pages/GoodsDescription'));
const Categories = lazy(() => import('./pages/Categories/'));

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
            <Route path="/goods-description" element={<GoodsDescription />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/categories" element={<Categories />} />
          </Routes>
          <ModalManager />
          <ToastContainer position="bottom-right" autoClose={3000} />
        </div>
      </div>
    </Suspense>
  );
}

export default App;
