import { Outlet } from 'react-router-dom';

const PublicLayout = () => {
  return (
    <div className="public-layout">
      {/* Navbar এখানে আসবে */}
      <main>
        <Outlet />
      </main>
      {/* Footer এখানে আসবে */}
    </div>
  );
};

export default PublicLayout;
