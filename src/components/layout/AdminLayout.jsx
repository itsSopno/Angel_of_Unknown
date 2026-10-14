import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';

const AdminLayout = () => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="admin-layout">
      {/* Sidebar এখানে আসবে */}
      <aside>
        <nav>
          <NavLink to="/admin/dashboard">Dashboard</NavLink>
          <NavLink to="/admin/projects">Projects</NavLink>
          <NavLink to="/admin/skills">Skills</NavLink>
          <NavLink to="/admin/messages">Messages</NavLink>
        </nav>
        <button onClick={handleLogout}>Logout</button>
      </aside>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
