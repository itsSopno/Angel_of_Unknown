import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '../../store/authStore';

const ProtectedRoute = () => {
  const { isAuthenticated, token } = useAuthStore();
  const hasToken = isAuthenticated && (token || localStorage.getItem('portfolio_token'));

  return hasToken ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default ProtectedRoute;
