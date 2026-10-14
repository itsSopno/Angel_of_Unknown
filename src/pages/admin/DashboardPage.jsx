import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiFolder, 
  FiCpu, 
  FiMail, 
  FiGlobe, 
  FiActivity, 
  FiPlay, 
  FiPause, 
  FiGrid, 
  FiCompass,
  FiArrowRight
} from 'react-icons/fi';
import styles from './DashboardPage.module.css';

const ADMIN_ROUTES = [
  {
    id: 'projects',
    title: 'MANAGE PROJECTS',
    subtitle: 'Create, update & feature live projects',
    badge: 'PORTFOLIO',
    path: '/admin/projects',
    icon: FiFolder,
    accent: '#cdff00',
  },
  {
    id: 'skills',
    title: 'MANAGE SKILLS',
    subtitle: 'Configure MERN & technical stack',
    badge: 'TECH RADAR',
    path: '/admin/skills',
    icon: FiCpu,
    accent: '#00f0ff',
  },
  {
    id: 'messages',
    title: 'CLIENT INBOX',
    subtitle: 'View inquiries, client leads & emails',
    badge: 'LIVE INBOX',
    path: '/admin/messages',
    icon: FiMail,
    accent: '#ff0055',
  },
  {
    id: 'portfolio',
    title: 'LIVE PORTFOLIO',
    subtitle: 'Open public client portfolio view',
    badge: 'PUBLIC LINK',
    path: '/',
    icon: FiGlobe,
    accent: '#a855f7',
  },
  {
    id: 'health',
    title: 'SYSTEM METRICS',
    subtitle: 'Node.js & MongoDB Server Health 99.9%',
    badge: 'ONLINE',
    path: '#metrics',
    icon: FiActivity,
    accent: '#10b981',
  },
];

export default function DashboardPage() {
  const navigate = useNavigate();
  const [isPaused, setIsPaused] = useState(false);
  const [viewMode, setViewMode] = useState('orbit'); // 'orbit' | 'grid'
  const [hoveredNode, setHoveredNode] = useState(null);
  const [systemTime, setSystemTime] = useState('');

  // Live clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setSystemTime(now.toLocaleTimeString('en-US', { hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleRouteClick = (route) => {
    if (route.path === '#metrics') {
      return;
    }
    if (route.path === '/') {
      window.open('/', '_blank');
    } else {
      navigate(route.path);
    }
  };

  // Radius for orbital arrangement
  const radius = 290;
  const total = ADMIN_ROUTES.length;

  return (
    <div className={styles.commandCenter}>
      {/* ── TOP HUD HEADER ─────────────────────────────────────── */}
      <header className={styles.topHud}>
        <div className={styles.hudLeft}>
          <div className={styles.hudTitleRow}>
            <h1 className={styles.hudTitle}>
              ORBITAL <span className={styles.hudTitleHighlight}>COMMAND</span> NEXUS
            </h1>
            <div className={styles.statusPill}>
              <span className={styles.pulseDot} />
              SYSTEM ONLINE // {systemTime}
            </div>
          </div>
          <p className={styles.hudSubtitle}>
            Interactive orbital management console for MERN Portfolio
          </p>
        </div>

        {/* HUD Controls */}
        <div className={styles.hudControls}>
          <button
            className={`${styles.controlBtn} ${viewMode === 'orbit' ? styles.active : ''}`}
            onClick={() => setViewMode('orbit')}
            title="Switch to Orbital View"
          >
            <FiCompass />
            ORBIT VIEW
          </button>

          <button
            className={`${styles.controlBtn} ${viewMode === 'grid' ? styles.active : ''}`}
            onClick={() => setViewMode('grid')}
            title="Switch to Grid View"
          >
            <FiGrid />
            GRID VIEW
          </button>

          {viewMode === 'orbit' && (
            <button
              className={styles.controlBtn}
              onClick={() => setIsPaused(!isPaused)}
              title={isPaused ? 'Resume Orbit' : 'Pause Orbit'}
            >
              {isPaused ? <FiPlay /> : <FiPause />}
              {isPaused ? 'RESUME' : 'PAUSE'}
            </button>
          )}
        </div>
      </header>

      {/* ── VIEW 1: 3D ORBITAL COMMAND ARENA ───────────────────── */}
      {viewMode === 'orbit' ? (
        <div className={styles.orbitArena}>
          
          {/* Radar background circles & crosshairs */}
          <div className={styles.radarGrid}>
            <div className={styles.radarCircle1} />
            <div className={styles.radarCircle2} />
            <div className={styles.radarCircle3} />
            <div className={styles.axisX} />
            <div className={styles.axisY} />
          </div>

          {/* ── CENTRAL MAIN ORB (MATCHING USER'S IMAGE) ─────────── */}
          <div 
            className={styles.orbStage}
            onClick={() => setIsPaused(!isPaused)}
            title="Central Quantum Core - Click to Toggle Orbit"
          >
            {/* Glowing Lime Radial Radiation */}
            <div className={styles.orbAuraGlow} />

            {/* Tilted Dashed Elliptical Ring (From User Image) */}
            <div className={styles.tiltedDashedRing} />

            {/* Dark Outer Eclipse Ring (From User Image) */}
            <div className={styles.darkEclipseRing} />

            {/* Lime Main Sphere */}
            <div className={styles.limeSphere}>
              {/* Inner Black Pupil with Atomic Dual Orbit Rings */}
              <div className={styles.innerPupil}>
                <div className={styles.atomRing1} />
                <div className={styles.atomRing2} />
              </div>
            </div>

            {/* Badge under center orb */}
            <div className={styles.orbLabelPill}>
              <span>ADMIN CORE</span>
            </div>
          </div>

          {/* ── ORBITING SATELLITE SYSTEM ───────────────────────── */}
          <div className={styles.orbitSystem}>
            <div className={styles.orbitTrackLine} />

            {/* Continuous Rotor */}
            <div className={`${styles.orbitingRotor} ${isPaused || hoveredNode ? styles.paused : ''}`}>
              {ADMIN_ROUTES.map((route, index) => {
                const angle = (360 / total) * index;
                const rad = (angle * Math.PI) / 180;
                // Position relative to center
                const x = Math.round(50 + (radius / 580) * 100 * Math.cos(rad));
                const y = Math.round(50 + (radius / 580) * 100 * Math.sin(rad));
                const Icon = route.icon;

                return (
                  <button
                    key={route.id}
                    className={`${styles.satelliteNode} ${isPaused || hoveredNode ? styles.paused : ''}`}
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                    }}
                    onMouseEnter={() => setHoveredNode(route.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                    onClick={() => handleRouteClick(route)}
                    title={`Click to open ${route.title}`}
                  >
                    <div className={styles.satelliteCard}>
                      <div className={styles.cardHead}>
                        <div 
                          className={styles.iconWrap}
                          style={{ borderColor: route.accent, color: route.accent }}
                        >
                          <Icon />
                        </div>
                        <span className={styles.badgePill}>{route.badge}</span>
                      </div>

                      <h3 className={styles.cardTitle}>
                        {route.title}
                      </h3>

                      <p className={styles.cardSubtitle}>
                        {route.subtitle}
                      </p>

                      <div className={styles.cardCta}>
                        OPEN ROUTE <FiArrowRight className={styles.arrowRight} />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Corner Tech Marks (Matches bottom right in user image) */}
          <div className={styles.cornerTechMark}>
            <div className={styles.hatchLine} />
            <div className={styles.hatchLine} />
            <div className={styles.hatchLine} />
            <span className={styles.cornerText}>SYS.SEC // MERN</span>
          </div>

        </div>
      ) : (
        /* ── VIEW 2: STANDARD GRID CARDS VIEW ─────────────────── */
        <div className={styles.gridView}>
          {ADMIN_ROUTES.map((route) => {
            const Icon = route.icon;
            return (
              <div
                key={route.id}
                className={styles.gridCard}
                onClick={() => handleRouteClick(route)}
                role="button"
                tabIndex={0}
              >
                <div className={styles.cardHead}>
                  <div 
                    className={styles.iconWrap}
                    style={{ borderColor: route.accent, color: route.accent }}
                  >
                    <Icon />
                  </div>
                  <span className={styles.badgePill}>{route.badge}</span>
                </div>

                <h3 className={styles.cardTitle}>{route.title}</h3>
                <p className={styles.cardSubtitle}>{route.subtitle}</p>

                <div className={styles.cardCta}>
                  OPEN ROUTE <FiArrowRight className={styles.arrowRight} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
