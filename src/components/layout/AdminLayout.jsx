import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { FiGrid, FiFolder, FiCpu, FiMail, FiExternalLink, FiLogOut } from 'react-icons/fi';
import useAuthStore from '../../store/authStore';
import styles from './AdminLayout.module.css';

const AdminLayout = () => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className={styles.adminWrapper}>
      {/* ── Top Sci-Fi Header ─────────────────────────────────── */}
      <header className={styles.adminHeader}>
        <NavLink to="/admin/dashboard" className={styles.brandLink}>
          <div className={styles.miniOrb} />
          <span className={styles.brandText}>
             <span className={styles.brandHighlight}>ORB</span>
          </span>
        </NavLink>

        <nav className={styles.navRow}>
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
          >
            <FiGrid /> Command Orbit
          </NavLink>
          <NavLink
            to="/admin/projects"
            className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
          >
            <FiFolder /> Projects
          </NavLink>
          <NavLink
            to="/admin/skills"
            className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
          >
            <FiCpu /> Skills
          </NavLink>
          <NavLink
            to="/admin/messages"
            className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
          >
            <FiMail /> Messages
          </NavLink>
        </nav>

        <div className={styles.headerActions}>
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className={styles.publicLink}
            title="Preview Live Site"
          >
            Live Site <FiExternalLink />
          </a>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            <FiLogOut /> Logout
          </button>
        </div>
      </header>

      {/* ── Main Routed Page ─────────────────────────────────── */}
      <main className={styles.adminMain}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
