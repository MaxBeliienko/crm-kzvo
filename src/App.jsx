import styles from './App.module.css';
import Sidebar from './components/sidebar/Sidebar';
import Header from './components/header/Header';
import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import ModalManager from './components/ModalManager';

const HomePage = lazy(() => import('./pages/HomePage'));
const SalesAnalytics = lazy(() => import('./pages/SalesAnalytics'));
const NotFound = lazy(() => import('./components/notFound/NotFound'));
const ProductsDescription = lazy(() => import('./pages/ProductsDescription'));
const GoodsDescription = lazy(() => import('./pages/GoodsDescription'));

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
            <Route
              path="/products-description"
              element={<ProductsDescription />}
            />
            <Route path="/goods-description" element={<GoodsDescription />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ModalManager />
        </div>
      </div>
    </Suspense>
  );
}

export default App;
