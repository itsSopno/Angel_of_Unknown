import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiHome, FiUser, FiBriefcase, FiMail, FiShield, FiX, FiLayers } from 'react-icons/fi';
import styles from './OrbNavbar.module.css';

const NAV_ITEMS = [
  { id: 'home', label: 'HOME', icon: FiHome, path: '/#home', isSection: true },
  { id: 'about', label: 'ABOUT', icon: FiUser, path: '/#about', isSection: true },
  { id: 'projects', label: 'PROJECTS', icon: FiBriefcase, path: '/#projects', isSection: true },
  { id: 'contact', label: 'CONTACT', icon: FiMail, path: '/#contact', isSection: true },
  { id: 'all-projects', label: 'ALL PROJECTS', icon: FiLayers, path: '/all-projects', isSection: false },
];

export default function OrbNavbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [isOpenMobile, setIsOpenMobile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOrbHovered, setIsOrbHovered] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const isPublicPage = !location.pathname.startsWith('/admin');

  /* ── Track Scroll & Active Section ────────────────────────── */
  useEffect(() => {
    if (!isPublicPage) return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);

      // Scroll spy for sections
      const sections = ['home', 'about', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 250;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isPublicPage, location.pathname]);

  /* ── Sync active state with route ──────────────────────────── */
  useEffect(() => {
    if (location.pathname === '/all-projects') {
      setActiveSection('all-projects');
    }
  }, [location.pathname]);

  /* ── Smooth Navigation ────────────────────────────────────── */
  const handleNavClick = (item) => {
    setIsOpenMobile(false);

    if (item.path.startsWith('/#')) {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const target = document.getElementById(item.id);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        }, 150);
      } else {
        const target = document.getElementById(item.id);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.location.hash = item.id;
        }
      }
      setActiveSection(item.id);
    } else {
      navigate(item.path);
      setActiveSection(item.id);
    }
  };

  return (
    <nav className={`${styles.navContainer} ${isScrolled ? styles.scrolled : ''}`}>
      {/* ── DESKTOP ORB DOCK ──────────────────────────────────── */}
      <div className={styles.dockWrapper}>
        <div className={styles.dockBar}>

          {/* Left Wing Nav Items */}
          <div className={styles.dockWing}>
            {NAV_ITEMS.slice(0, 2).map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  className={`${styles.navBtn} ${isActive ? styles.active : ''}`}
                  title={item.label}
                  aria-label={item.label}
                >
                  <Icon className={styles.navIcon} />
                  <span className={styles.navLabel}>{item.label}</span>
                  {isActive && <span className={styles.activeDot} />}
                </button>
              );
            })}
          </div>

          {/* ── CENTRAL 3D ROTATING ORB CORE ───────────────────── */}
          <div
            className={styles.orbCoreWrapper}
            onMouseEnter={() => setIsOrbHovered(true)}
            onMouseLeave={() => setIsOrbHovered(false)}
            onClick={() => handleNavClick(NAV_ITEMS[0])}
            role="button"
            tabIndex={0}
            title="Quantum Core - Click for Home"
          >
            {/* Ambient Energy Aura */}
            <div className={`${styles.energyAura} ${isOrbHovered ? styles.auraHover : ''}`} />

            {/* 3D Gyroscopic Rings */}
            <div className={styles.gyroscope}>
              <div className={`${styles.ring} ${styles.ring1}`} />
              <div className={`${styles.ring} ${styles.ring2}`} />
              <div className={`${styles.ring} ${styles.ring3}`} />

              {/* Core Nucleus */}
              <div className={styles.nucleus}>
                <div className={styles.nucleusInner} />
                <div className={styles.quantumSpark} />
              </div>

              {/* Orbiting Tech Beacon */}
              <div className={styles.satelliteTracker}>
                <div className={styles.satelliteBeacon} />
              </div>
            </div>

            <div className={styles.coreBadge}>
              <span>MERN</span>
            </div>
          </div>

          {/* Right Wing Nav Items */}
          <div className={styles.dockWing}>
            {NAV_ITEMS.slice(2).map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  className={`${styles.navBtn} ${isActive ? styles.active : ''}`}
                  title={item.label}
                  aria-label={item.label}
                >
                  <Icon className={styles.navIcon} />
                  <span className={styles.navLabel}>{item.label}</span>
                  {isActive && <span className={styles.activeDot} />}
                </button>
              );
            })}

            {/* Admin Portal Gateway Trigger */}
            <button
              onClick={() => navigate('/admin/login')}
              className={`${styles.navBtn} ${styles.adminBtn}`}
              title="Admin Portal"
              aria-label="Admin Portal"
            >
              <FiShield className={styles.navIcon} />
              <span className={styles.navLabel}>ORB</span>
            </button>
          </div>

        </div>
      </div>

      {/* ── MOBILE RADIAL ORB NAV ─────────────────────────────── */}
      <div className={styles.mobileOrbContainer}>
        {/* Backdrop overlay when open */}
        {isOpenMobile && (
          <div
            className={styles.mobileBackdrop}
            onClick={() => setIsOpenMobile(false)}
          />
        )}

        {/* Orbiting Radial Menu Items */}
        <div className={`${styles.radialMenu} ${isOpenMobile ? styles.radialOpen : ''}`}>
          {NAV_ITEMS.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            // Angle spread for a fan-out arc above the mobile orb
            const total = NAV_ITEMS.length + 1;
            const angle = (180 / (total - 1)) * index; // 0 to 180 deg
            const rad = (angle * Math.PI) / 180;
            const distance = 105; // radius in px
            const x = Math.round(-Math.cos(rad) * distance);
            const y = Math.round(-Math.sin(rad) * distance);

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className={`${styles.radialItem} ${isActive ? styles.radialActive : ''}`}
                style={{
                  '--tx': `${x}px`,
                  '--ty': `${y}px`,
                  '--delay': `${index * 0.05}s`,
                }}
                title={item.label}
              >
                <Icon className={styles.radialIcon} />
                <span className={styles.radialTooltip}>{item.label}</span>
              </button>
            );
          })}

          {/* Admin link in radial */}
          <button
            onClick={() => { setIsOpenMobile(false); navigate('/admin/login'); }}
            className={`${styles.radialItem} ${styles.radialAdmin}`}
            style={{
              '--tx': '0px',
              '--ty': '-150px',
              '--delay': `${NAV_ITEMS.length * 0.05}s`,
            }}
            title="Admin Login"
          >
            <FiShield className={styles.radialIcon} />
            <span className={styles.radialTooltip}>ADMIN</span>
          </button>
        </div>

        {/* Mobile Glowing Orb Trigger Button */}
        <button
          className={`${styles.mobileOrbTrigger} ${isOpenMobile ? styles.triggerActive : ''}`}
          onClick={() => setIsOpenMobile(!isOpenMobile)}
          aria-label="Toggle navigation menu"
        >
          <div className={styles.mobileOrbGlow} />

          <div className={styles.mobileOrbSphere}>
            {isOpenMobile ? (
              <FiX className={styles.closeIcon} />
            ) : (
              <div className={styles.miniGyro}>
                <div className={styles.miniRing1} />
                <div className={styles.miniRing2} />
                <div className={styles.miniCore} />
              </div>
            )}
          </div>

          <span className={styles.mobileOrbRingPulse} />
        </button>
      </div>
    </nav>
  );
}
