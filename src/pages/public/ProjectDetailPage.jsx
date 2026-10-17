import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiExternalLink, FiGithub, FiCalendar, FiTag, FiAlertCircle, FiCheckCircle, FiZap } from 'react-icons/fi';
import { getProjectBySlug } from '../../services/portfolioService';
import styles from './ProjectDetailPage.module.css';

// DEMO fallback matching ProjectSection DEMO_PROJECTS
const DEMO_PROJECTS = [
    {
        _id: 'demo-1',
        slug: 'demo-1',
        title: 'Nexus Realtime Chat & Video MERN',
        category: 'fullstack',
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
        tags: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
        tech: ['React 19', 'Express', 'Socket.io', 'WebRTC', 'Tailwind'],
        date: '2026 // Q1',
        description: 'A full-featured real-time chat and video calling application built with the MERN stack and WebRTC.',
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
        slug: 'demo-2',
        title: 'Hyperion E-Commerce Engine',
        category: 'fullstack',
        image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
        tags: ['MERN', 'Stripe', 'Redux', 'JWT'],
        tech: ['React', 'Redux Toolkit', 'Node.js', 'MongoDB', 'Stripe API'],
        date: '2026 // Q1',
        description: 'A high-performance e-commerce platform with atomic inventory handling during flash sales.',
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
        slug: 'demo-3',
        title: 'Orbital Cloud Microservices Hub',
        category: 'backend',
        image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
        tags: ['Node.js', 'Express', 'JWT', 'REST'],
        tech: ['Node.js', 'Express.js', 'Docker', 'MongoDB Atlas', 'JWT'],
        date: '2025 // Q4',
        description: 'Modular microservices architecture with strict JWT authentication and rate limiting.',
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
        slug: 'demo-4',
        title: 'Aetheria Interactive 3D Canvas',
        category: 'frontend',
        image: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1200&q=80',
        tags: ['React', 'Three.js', 'GSAP', 'WebGL'],
        tech: ['React', 'Three.js', 'GSAP ScrollTrigger', 'Tailwind'],
        date: '2025 // Q4',
        description: 'A WebGL-powered 3D interactive canvas experience with custom shaders and GSAP animations.',
        problems: 'Complex 3D scenes stuttering below 30 FPS on low-power mobile devices.',
        solutions: 'Engineered custom WebGL shaders, frustum culling, and responsive texture compression.',
        challenges: 'Memory management and garbage collection during rapid canvas re-renders.',
        liveUrl: 'https://github.com/itsSopno',
        githubClient: 'https://github.com/itsSopno',
        githubServer: 'https://github.com/itsSopno',
        featured: false,
    },
];

export default function ProjectDetailPage() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            window.scrollTo({ top: 0, behavior: 'instant' });

            // Step 1: Try matching demo fallback immediately (works fully offline)
            const demoMatch = DEMO_PROJECTS.find(
                (p) => p.slug === slug || p._id === slug
            );

            // Step 2: Try fetching from live API
            try {
                const res = await getProjectBySlug(slug);
                const data = res.data?.data;
                if (data && (data._id || data.title)) {
                    setProject(data);
                    setLoading(false);
                    return;
                }
            } catch {
                // API failed — fall through to demo
            }

            // Step 3: Use demo fallback if live API had no data
            if (demoMatch) {
                setProject(demoMatch);
            } else {
                setProject(null);
            }
            setLoading(false);
        };
        load();
    }, [slug]);


    if (loading) {
        return (
            <div className={styles.loadingScreen}>
                <div className={styles.spinner} />
                <p>Loading project details…</p>
            </div>
        );
    }

    if (!loading && !project) {
        return (
            <div className={styles.notFound}>
                <h2>Project not found</h2>
                <button className={styles.backBtn} onClick={() => navigate(-1)}>
                    <FiArrowLeft /> Go Back
                </button>
            </div>
        );
    }

    return (
        <div className={styles.page}>
            {/* ── Grid background ── */}
            <div className={styles.gridBg} />

            {/* ── Hero Banner ── */}
            <div className={styles.heroBanner}>
                {project.image && (
                    <img src={project.image} alt={project.title} className={styles.heroImage} />
                )}
                <div className={styles.heroOverlay} />

                <div className={styles.heroContent}>
                    <button className={styles.backBtn} onClick={() => navigate('/')}>
                        <FiArrowLeft /> Back to Projects
                    </button>

                    <div className={styles.heroBadgeRow}>
                        <span className={styles.categoryBadge}>{project.category}</span>
                        {project.featured && <span className={styles.featuredBadge}>FEATURED</span>}
                    </div>

                    <h1 className={styles.heroTitle}>{project.title}</h1>

                    <div className={styles.heroMeta}>
                        <span className={styles.metaItem}><FiCalendar /> {project.date ? (project.date.includes('T') ? new Date(project.date).getFullYear() : project.date) : '2026'}</span>
                        <span className={styles.metaDivider}>·</span>
                        <span className={styles.metaItem}><FiTag /> {(project.tags || []).slice(0, 3).join(', ')}</span>
                    </div>
                </div>
            </div>

            {/* ── Main Content ── */}
            <div className={styles.container}>

                {/* Tech Stack */}
                <div className={styles.techSection}>
                    <span className={styles.sectionLabel}>TECH STACK</span>
                    <div className={styles.techPills}>
                        {(project.tech || project.tags || []).map((t, i) => (
                            <span key={i} className={styles.techPill}>{t}</span>
                        ))}
                    </div>
                </div>

                {/* Description */}
                {project.description && (
                    <div className={styles.descSection}>
                        <p className={styles.description}>{project.description}</p>
                    </div>
                )}

                {/* Problem / Solution / Challenge Grid */}
                <div className={styles.infoGrid}>
                    {project.problems && (
                        <div className={styles.infoCard}>
                            <div className={styles.cardIconRow}>
                                <FiAlertCircle className={styles.iconProblem} />
                                <span className={styles.cardLabel}>PROBLEM STATEMENT</span>
                            </div>
                            <p className={styles.cardText}>{project.problems}</p>
                        </div>
                    )}
                    {project.solutions && (
                        <div className={styles.infoCard}>
                            <div className={styles.cardIconRow}>
                                <FiCheckCircle className={styles.iconSolution} />
                                <span className={styles.cardLabel}>TECHNICAL SOLUTION</span>
                            </div>
                            <p className={styles.cardText}>{project.solutions}</p>
                        </div>
                    )}
                    {project.challenges && (
                        <div className={styles.infoCard}>
                            <div className={styles.cardIconRow}>
                                <FiZap className={styles.iconChallenge} />
                                <span className={styles.cardLabel}>KEY CHALLENGES</span>
                            </div>
                            <p className={styles.cardText}>{project.challenges}</p>
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                <div className={styles.actions}>
                    {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noreferrer" className={styles.liveBtn}>
                            LIVE DEMO <FiExternalLink />
                        </a>
                    )}
                    {project.githubClient && (
                        <a href={project.githubClient} target="_blank" rel="noreferrer" className={styles.githubBtn}>
                            <FiGithub /> CLIENT CODE
                        </a>
                    )}
                    {project.githubServer && (
                        <a href={project.githubServer} target="_blank" rel="noreferrer" className={styles.githubBtn}>
                            <FiGithub /> SERVER CODE
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}
