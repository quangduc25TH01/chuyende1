import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import PageTitle from './components/PageTitle';
import Login from './pages/Authentication/Login';
import Register from './pages/Authentication/Register';
import ECommerce from './pages/Dashboard/ECommerce';
import Profile from './pages/Profile';

import MainLayout from './layout/MainLayout';
import RequireAuth from 'components/router/RequireAuth';
import AuthLayout from './layout/AuthLayout';
import Categories from './pages/Categories';
import Products from './pages/Products';
import { AuthProvider } from './context/AuthContext';
import ReviewProduct from './pages/ReviewProduct';
import Order from './pages/Order';
import Notification from './pages/Notification';
import NotificationDetail from './pages/Notification/NotificationDetail';
import Articles from './pages/Articles';
import Uploads from './pages/Uploads';

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const ProtectedLayout = (
    <RequireAuth>
      <MainLayout />
    </RequireAuth>
  );

  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={ProtectedLayout}>
          <Route index element={<ECommerce />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/products" element={<Products />} />
          <Route path="/order" element={<Order />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/article" element={<Articles />} />
          <Route path="/uploads" element={<Uploads />} />
          <Route path="/manager/notification" element={<Notification />} />
          <Route
            path="/manager/notification/:id"
            element={<NotificationDetail />}
          />

          <Route path="/manager/review-products" element={<ReviewProduct />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route
            path="/login"
            element={
              <>
                <PageTitle title="Đăng nhập" />
                <Login />
              </>
            }
          />
          <Route
            path="/register"
            element={
              <>
                <PageTitle title="Thêm mới nhân viên" />
                <Register />
              </>
            }
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
