import { useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import router from './router/index.jsx';
import OrbLoader from './components/OrbLoader/OrbLoader.jsx';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <OrbLoader onDone={() => setLoading(false)} />}
      <RouterProvider router={router} />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#1e293b',
            color: '#f8fafc',
            borderRadius: '10px',
            border: '1px solid #334155',
          },
        }}
      />
    </>
  );
}

export default App;
