import { Outlet } from 'react-router-dom';
import OrbNavbar from './OrbNavbar';
import Footer from './Footer';

const PublicLayout = () => {
  return (
    <div className="public-layout">
      <OrbNavbar />
      <main>
        <Outlet />
      </main>
      {/* Footer এখানে আসবে */}
      <Footer></Footer>
    </div>
  );
};

export default PublicLayout;
