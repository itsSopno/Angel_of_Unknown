import { Outlet } from 'react-router-dom';
import OrbNavbar from './OrbNavbar';

const PublicLayout = () => {
  return (
    <div className="public-layout">
      <OrbNavbar />
      <main>
        <Outlet />
      </main>
      {/* Footer এখানে আসবে */}
    </div>
  );
};

export default PublicLayout;
