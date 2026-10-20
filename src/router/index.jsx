import { createBrowserRouter } from 'react-router-dom';

// Layouts
import PublicLayout from '../components/layout/PublicLayout';
import AdminLayout from '../components/layout/AdminLayout';

// Guards
import ProtectedRoute from '../components/common/ProtectedRoute';

// Public Pages
import HomePage from '../pages/public/HomePage';
import NotFoundPage from '../pages/public/NotFoundPage';
import ProjectDetailPage from '../pages/public/ProjectDetailPage';
import AllProjectsPage from '../pages/public/AllProjectsPage';
import AllProjectDetailPage from '../pages/public/AllProjectDetailPage';

// Admin Pages
import AdminLoginPage from '../pages/admin/AdminLoginPage';
import DashboardPage from '../pages/admin/DashboardPage';
import ManageProjectsPage from '../pages/admin/ManageProjectsPage';
import ManageSkillsPage from '../pages/admin/ManageSkillsPage';
import MessagesPage from '../pages/admin/MessagesPage';
import ManageAllProjectsPage from '../pages/admin/ManageAllProjectsPage';

const router = createBrowserRouter([
  // ── Public Routes ───────────────────────────────
  {
    element: <PublicLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/projects/:slug', element: <ProjectDetailPage /> },
      { path: '/all-projects', element: <AllProjectsPage /> },
      { path: '/all-projects/:id', element: <AllProjectDetailPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },

  // ── Admin Login (Public) ────────────────────────
  { path: '/admin/login', element: <AdminLoginPage /> },

  // ── Admin Protected Routes ──────────────────────
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { path: '/admin/dashboard', element: <DashboardPage /> },
          { path: '/admin/projects', element: <ManageProjectsPage /> },
          { path: '/admin/all-projects', element: <ManageAllProjectsPage /> },
          { path: '/admin/skills', element: <ManageSkillsPage /> },
          { path: '/admin/messages', element: <MessagesPage /> },
        ],
      },
    ],
  },
]);

export default router;
