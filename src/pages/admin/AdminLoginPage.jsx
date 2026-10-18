import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLock, FiMail, FiArrowRight, FiShield, FiZap } from 'react-icons/fi';
import toast from 'react-hot-toast';
import useAuthStore from '../../store/authStore';
import styles from './AdminLoginPage.module.css';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter email and password');
      return;
    }

    setLoading(true);
    const res = await login({ email, password });
    setLoading(false);

    if (res.success) {
      toast.success('Access Granted // Welcome Admin');
      navigate('/admin/dashboard');
    } else {
      toast.error(res.message || 'Access Denied');
    }
  };

  // Demo bypass for easy previewing
  const handleDemoAccess = () => {
    localStorage.setItem('portfolio_token', 'demo_admin_token_active');
    useAuthStore.setState({
      isAuthenticated: true,
      token: 'demo_admin_token_active',
      user: { name: 'Nabil Hasan', role: 'Super Admin' },
    });
    toast.success('Demo Access Granted // Welcome to Nexus Command');
    navigate('/admin/dashboard');
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.gridOverlay} />

      <div className={styles.loginCard}>
        {/* Glowing Orb Badge */}
        <div className={styles.orbHeader}>
          <div className={styles.orbSphere}>
            <div className={styles.atomRing} />
            <FiShield className={styles.shieldIcon} />
          </div>
          <h1 className={styles.title}>
            ADMIN <span className={styles.lime}>PORTAL</span>
          </h1>
          <p className={styles.subtitle}>SECURE QUANTUM ACCESS // NABIL HASAN</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className={styles.form}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>ADMIN EMAIL</label>
            <div className={styles.inputWrap}>
              <FiMail className={styles.inputIcon} />
              <input
                type="email"
                placeholder="nabilbd@portfolio.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>SECURITY KEY</label>
            <div className={styles.inputWrap}>
              <FiLock className={styles.inputIcon} />
              <input
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
              />
            </div>
          </div>

          <button type="submit" disabled={loading} className={styles.submitBtn}>
            {loading ? 'AUTHENTICATING...' : 'AUTHORIZE ACCESS'}
            <FiArrowRight />
          </button>
        </form>

        <div className={styles.divider}>
          <span>OR QUICK PREVIEW</span>
        </div>

        {/* Quick Demo Access Button
        <button onClick={handleDemoAccess} className={styles.demoBtn}>
          <FiZap /> INSTANT DEMO ACCESS (ONE-CLICK)
        </button> */}

        <a href="/" className={styles.backHome}>
          ← RETURN TO PUBLIC PORTFOLIO
        </a>
      </div>
    </div>
  );
}
