import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiExternalLink,
  FiGithub,
  FiX,
  FiLayers,
  FiMaximize2,
  FiCode,
  FiArrowRight
} from 'react-icons/fi';
import { getProjects } from '../../services/portfolioService';
import styles from './ProjectSection.module.css';

// Fallback initial developer projects if database is empty initially
const DEMO_PROJECTS = [
  {
    _id: 'demo-1',
    title: 'Nexus Realtime Chat & Video MERN',
    category: 'fullstack',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    tags: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
    tech: ['React 19', 'Express', 'Socket.io', 'WebRTC', 'Tailwind'],
    date: '2026 // Q1',
    problems: 'Traditional HTTP polling creates high server latency and delays in real-time collaboration.',
    solutions: 'Built bidirectional WebSocket architecture using Socket.io with Redis pub/sub caching layer.',
    challenges: 'Handling packet loss over flaky cellular networks and WebRTC peer connection handshakes.',
    liveUrl: 'https://github.com/itsSopno',
    githubClient: 'https://github.com/itsSopno',
    githubServer: 'https://github.com/itsSopno',
    featured: true,
  },
  {
    _id: 'demo-2',
    title: 'Hyperion E-Commerce Engine',
    category: 'fullstack',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
    tags: ['MERN', 'Stripe', 'Redux', 'JWT'],
    tech: ['React', 'Redux Toolkit', 'Node.js', 'MongoDB', 'Stripe API'],
    date: '2026 // Q1',
    problems: 'Synchronizing stock reservations during flash sales without duplicate order submissions.',
    solutions: 'Implemented atomic MongoDB transactions with pessimistic locking and Stripe webhooks.',
    challenges: 'Preventing race conditions during checkout and webhook idempotency guarantee.',
    liveUrl: 'https://github.com/itsSopno',
    githubClient: 'https://github.com/itsSopno',
    githubServer: 'https://github.com/itsSopno',
    featured: true,
  },
  {
    _id: 'demo-3',
    title: 'Orbital Cloud Microservices Hub',
    category: 'backend',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    tags: ['Node.js', 'Express', 'JWT', 'REST'],
    tech: ['Node.js', 'Express.js', 'Docker', 'MongoDB Atlas', 'JWT'],
    date: '2025 // Q4',
    problems: 'High monolithic server load and tightly coupled database queries.',
    solutions: 'Architected modular RESTful services with strict JWT middleware and rate limiting.',
    challenges: 'Token revocation strategies and cross-origin authentication headers with credentials.',
    liveUrl: 'https://github.com/itsSopno',
    githubClient: 'https://github.com/itsSopno',
    githubServer: 'https://github.com/itsSopno',
    featured: false,
  },
  {
    _id: 'demo-4',
    title: 'Aetheria Interactive 3D Canvas',
    category: 'frontend',
    image: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=800&q=80',
    tags: ['React', 'Three.js', 'GSAP', 'WebGL'],
    tech: ['React', 'Three.js', 'GSAP ScrollTrigger', 'Tailwind'],
    date: '2025 // Q4',
    problems: 'Complex 3D scenes stuttering below 30 FPS on low-power mobile devices.',
    solutions: 'Engineered custom WebGL shaders, frustum culling, and responsive texture compression.',
    challenges: 'Memory management and garbage collection during rapid canvas re-renders.',
    liveUrl: 'https://github.com/itsSopno',
    githubClient: 'https://github.com/itsSopno',
    githubServer: 'https://github.com/itsSopno',
    featured: false,
  },
];

export default function ProjectSection() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [activeModalProject, setActiveModalProject] = useState(null);

  // Fetch real projects from Live Render API
  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        const res = await getProjects();
        if (res.data?.success && res.data.data.projects?.length > 0) {
          setProjects(res.data.data.projects);
        } else {
          // If database has 0 projects, show default demo developer projects until user adds some
          setProjects(DEMO_PROJECTS);
        }
      } catch (err) {
        console.warn('Using fallback projects while offline:', err.message);
        setProjects(DEMO_PROJECTS);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  const filteredProjects = projects.filter((p) => {
    if (filter === 'all') return true;
    return p.category?.toLowerCase() === filter.toLowerCase();
  });

  return (
    <section className={styles.projectSection} id="projects">
      <div className={styles.gridBackground} />
      <div className={styles.laserLine} />

      <div className={styles.container}>
        {/* ── Top Header Matching Reference Image ─────────────── */}
        <div className={styles.headerWrapper}>
          <div className={styles.topAccentRow}>
            <div className={styles.dot} />
            <div className={styles.accentBar} />
          </div>

          <div className={styles.titleArea}>
            <h2 className={styles.mainTitle}>
              DEVELOPER PROJECTS
              <span className={styles.volBadgeWrap}>
                <span className={styles.volText}>VOL -</span>
                <span className={styles.volPill}>01</span>
                {/* Retro Pointer Cursor Icon */}
                <svg
                  className={styles.cursorIcon}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z"
                    fill="#3b82f6"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </h2>

            {/* Handwriting cursive overlay */}
            <span className={styles.scriptOverlay}>Fullstack & Code</span>
          </div>

          {/* Filter Pills */}
          <div className={styles.filterRow}>
            {['all', 'fullstack', 'frontend', 'backend'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`${styles.filterBtn} ${filter === cat ? styles.active : ''}`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* ── Projects Grid with Hover Modal ─────────────────── */}
        {loading ? (
          <div className={styles.loadingBox}>
            <div className={styles.spinner} />
            <p>Loading projects from live database...</p>
          </div>
        ) : (
          <div className={styles.projectsGrid}>
            {filteredProjects.map((proj) => (
              <div
                key={proj._id}
                className={styles.projectCard}
                onClick={() => setActiveModalProject(proj)}
              >
                {/* Card Thumbnail / Artwork */}
                <div className={styles.cardImageWrap}>
                  {proj.image ? (
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className={styles.cardImage}
                      loading="lazy"
                    />
                  ) : (
                    <div className={styles.codeFallback}>
                      <div className={styles.fallbackHeader}>
                        <span className={styles.categoryBadge}>{proj.category}</span>
                        {proj.featured && (
                          <span className={styles.featuredPill}>FEATURED</span>
                        )}
                      </div>
                      <div className={styles.fallbackBody}>
                        <h4 className={styles.cardTitle}>{proj.title}</h4>
                        <div className={styles.techPills}>
                          {(proj.tech || ['React', 'Node.js']).slice(0, 3).map((t, idx) => (
                            <span key={idx} className={styles.techTag}>
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Gradient overlay for cards with images */}
                  {proj.image && (
                    <div className={styles.cardOverlay}>
                      <span className={styles.overlayCategory}>{proj.category}</span>
                      <h4 className={styles.overlayTitle}>{proj.title}</h4>
                    </div>
                  )}
                </div>

                {/* ══════════════════════════════════════════════════════
                    HOVER MODAL POPUP (The requested hover modal)
                    ══════════════════════════════════════════════════════ */}
                <div className={styles.hoverModal}>
                  <div>
                    <div className={styles.modalHeaderRow}>
                      <span className={styles.modalCategory}>{proj.category}</span>
                      <span className={styles.modalDate}>{proj.date || '2026'}</span>
                    </div>

                    <h3 className={styles.modalTitle}>{proj.title}</h3>

                    <div className={styles.modalInfoBlock}>
                      {proj.problems && (
                        <div className={styles.infoItem}>
                          <span className={styles.infoLabel}>Problem Solved:</span>
                          <p className={styles.infoText}>{proj.problems}</p>
                        </div>
                      )}
                      {proj.solutions && (
                        <div className={styles.infoItem}>
                          <span className={styles.infoLabel}>Solution:</span>
                          <p className={styles.infoText}>{proj.solutions}</p>
                        </div>
                      )}
                      {proj.challenges && (
                        <div className={styles.infoItem}>
                          <span className={styles.infoLabel}>Key Challenge:</span>
                          <p className={styles.infoText}>{proj.challenges}</p>
                        </div>
                      )}
                    </div>

                    {/* Tech Pills */}
                    <div className={styles.modalTechPills}>
                      {(proj.tech || proj.tags || []).slice(0, 4).map((tech, idx) => (
                        <span key={idx} className={styles.modalTechTag}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Modal Action Buttons */}
                  <div className={styles.modalActions}>
                    <button
                      className={styles.actionBtn}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/projects/${proj.slug || proj._id}`);
                      }}
                    >
                      DETAIL <FiArrowRight />
                    </button>
                    {proj.githubClient && (
                      <a
                        href={proj.githubClient}
                        target="_blank"
                        rel="noreferrer"
                        className={styles.githubBtn}
                        onClick={(e) => e.stopPropagation()}
                        title="View Source Code"
                      >
                        <FiGithub />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Comprehensive Dossier Modal on Click ─────────────── */}
      {activeModalProject && (
        <div
          className={styles.fullModalOverlay}
          onClick={() => setActiveModalProject(null)}
        >
          <div
            className={styles.fullModalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.closeFullModal}
              onClick={() => setActiveModalProject(null)}
            >
              <FiX />
            </button>

            <span className={styles.fullModalCategory}>
              {activeModalProject.category} // {activeModalProject.date || '2026'}
            </span>
            <h2 className={styles.fullModalTitle}>{activeModalProject.title}</h2>
            <p className={styles.fullModalDesc}>{activeModalProject.description}</p>

            <div className={styles.dossierGrid}>
              {activeModalProject.problems && (
                <div className={styles.dossierItem}>
                  <span className={styles.dossierLabel}>Core Problem Statement</span>
                  <p className={styles.dossierText}>{activeModalProject.problems}</p>
                </div>
              )}

              {activeModalProject.solutions && (
                <div className={styles.dossierItem}>
                  <span className={styles.dossierLabel}>Technical Architecture & Solution</span>
                  <p className={styles.dossierText}>{activeModalProject.solutions}</p>
                </div>
              )}

              {activeModalProject.challenges && (
                <div className={styles.dossierItem}>
                  <span className={styles.dossierLabel}>Technical Challenges Overcome</span>
                  <p className={styles.dossierText}>{activeModalProject.challenges}</p>
                </div>
              )}
            </div>

            <div className={styles.fullModalActions}>
              <button
                className={styles.actionBtn}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/projects/${activeModalProject.slug || activeModalProject._id}`);
                }}
              >
                DETAIL <FiArrowRight />
              </button>
              {activeModalProject.githubClient && (
                <a
                  href={activeModalProject.githubClient}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.githubBtn}
                >
                  <FiGithub /> CLIENT GITHUB
                </a>
              )}
              {activeModalProject.githubServer && (
                <a
                  href={activeModalProject.githubServer}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.githubBtn}
                >
                  <FiGithub /> SERVER GITHUB
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
