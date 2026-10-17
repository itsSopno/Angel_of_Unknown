import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiExternalLink, FiGithub, FiChevronLeft, FiChevronRight, FiCheck } from 'react-icons/fi';
import { getProjectBySlug } from '../../services/portfolioService';
import styles from './ProjectDetailPage.module.css';

const DEMO_PROJECTS = [
    {
        _id: 'demo-1',
        slug: 'demo-1',
        title: 'NEXUS CHAT',
        subtitle: 'realtime chat & video mern platform',
        category: 'fullstack',
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
        tags: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
        tech: ['React 19', 'Express', 'Socket.io', 'WebRTC', 'Tailwind'],
        date: '2026',
        description: 'A full-featured real-time chat and video calling application built with the MERN stack and WebRTC. Supports group chats, file sharing, and encrypted peer-to-peer video calls.',
        problems: 'Traditional HTTP polling creates high server latency and delays in real-time collaboration tools.',
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
        title: 'HYPERION',
        subtitle: 'high-performance e-commerce engine',
        category: 'fullstack',
        image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
        tags: ['MERN', 'Stripe', 'Redux', 'JWT'],
        tech: ['React', 'Redux Toolkit', 'Node.js', 'MongoDB', 'Stripe API'],
        date: '2026',
        description: 'A high-performance e-commerce platform with atomic inventory handling during flash sales. Handles thousands of concurrent orders without race conditions.',
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
        title: 'ORBITAL',
        subtitle: 'cloud microservices hub',
        category: 'backend',
        image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
        tags: ['Node.js', 'Express', 'JWT', 'REST'],
        tech: ['Node.js', 'Express.js', 'Docker', 'MongoDB Atlas', 'JWT'],
        date: '2025',
        description: 'Modular microservices architecture with strict JWT authentication and rate limiting. Designed for horizontal scaling across distributed cloud infrastructure.',
        problems: 'High monolithic server load and tightly coupled database queries causing bottlenecks.',
        solutions: 'Architected modular RESTful services with strict JWT middleware and rate limiting.',
        challenges: 'Token revocation strategies and cross-origin authentication headers with credentials.',
        liveUrl: 'https://github.com/itsSopno',
        githubClient: 'https://github.com/itsSopno',
        githubServer: null,
        featured: false,
    },
    {
        _id: 'demo-4',
        slug: 'demo-4',
        title: 'AETHERIA',
        subtitle: 'interactive 3d webgl canvas',
        category: 'frontend',
        image: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1200&q=80',
        tags: ['React', 'Three.js', 'GSAP', 'WebGL'],
        tech: ['React', 'Three.js', 'GSAP ScrollTrigger', 'WebGL'],
        date: '2025',
        description: 'A WebGL-powered 3D interactive canvas experience with custom shaders and GSAP animations. Optimized for 60fps on both desktop and mobile devices.',
        problems: 'Complex 3D scenes stuttering below 30 FPS on low-power mobile devices.',
        solutions: 'Engineered custom WebGL shaders, frustum culling, and responsive texture compression.',
        challenges: 'Memory management and garbage collection during rapid canvas re-renders.',
        liveUrl: 'https://github.com/itsSopno',
        githubClient: 'https://github.com/itsSopno',
        githubServer: null,
        featured: false,
    },
];

export default function ProjectDetailPage() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [allProjects, setAllProjects] = useState(DEMO_PROJECTS);

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            window.scrollTo({ top: 0, behavior: 'instant' });

            const demoMatch = DEMO_PROJECTS.find(
                (p) => p.slug === slug || p._id === slug
            );

            try {
                const res = await getProjectBySlug(slug);
                const data = res.data?.data;
                if (data && (data._id || data.title)) {
                    setProject(data);
                    setLoading(false);
                    return;
                }
            } catch {
                // fall through to demo
            }

            setProject(demoMatch || null);
            setLoading(false);
        };
        load();
    }, [slug]);

    // Navigate to prev/next demo project
    const currentIndex = allProjects.findIndex(
        (p) => p.slug === slug || p._id === slug
    );
    const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
    const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

    const formatDate = (d) => {
        if (!d) return '2026';
        if (d.includes('T')) return new Date(d).getFullYear().toString();
        return d;
    };

    if (loading) {
        return (
            <div className={styles.loadingScreen}>
                <div className={styles.spinner} />
                <p>Loading project…</p>
            </div>
        );
    }

    if (!project) {
        return (
            <div className={styles.notFound}>
                <h2>Project not found</h2>
                <button className={styles.backLink} onClick={() => navigate('/')}>
                    <FiArrowLeft /> Back to Home
                </button>
            </div>
        );
    }

    const bulletPoints = [
        project.problems && `Problem: ${project.problems.substring(0, 60)}…`,
        project.solutions && `Solution: ${project.solutions.substring(0, 60)}…`,
        project.challenges && `Challenge: ${project.challenges.substring(0, 60)}…`,
    ].filter(Boolean);

    return (
        <div className={styles.page}>

            {/* ── Top Nav ── */}
            <nav className={styles.topNav}>
                <button className={styles.backLink} onClick={() => navigate('/')}>
                    <FiArrowLeft /> Back to Home
                </button>

                <div className={styles.navLinks}>
                    {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noreferrer" className={styles.navExtLink}>
                            Live <FiExternalLink size={12} />
                        </a>
                    )}
                    {project.githubClient && (
                        <a href={project.githubClient} target="_blank" rel="noreferrer" className={styles.navExtLink}>
                            GitHub <FiGithub size={12} />
                        </a>
                    )}
                </div>
            </nav>

            {/* ── Main Layout ── */}
            <div className={styles.layout}>

                {/* Left Sidebar */}
                <aside className={styles.sidebar}>
                    <div className={styles.sideItem}>
                        <span className={styles.sideLabel}>YEAR</span>
                        <span className={styles.sideValue}>{formatDate(project.date)}</span>
                    </div>

                    {project.liveUrl && (
                        <div className={styles.sideItem}>
                            <span className={styles.sideLabel}>LIVE DEMO</span>
                            <a href={project.liveUrl} target="_blank" rel="noreferrer" className={styles.sideLink}>
                                Project Link <FiExternalLink size={10} />
                            </a>
                        </div>
                    )}

                    {project.githubClient && (
                        <div className={styles.sideItem}>
                            <span className={styles.sideLabel}>CLIENT REPO</span>
                            <a href={project.githubClient} target="_blank" rel="noreferrer" className={styles.sideLink}>
                                GitHub ↗
                            </a>
                        </div>
                    )}

                    {project.githubServer && project.githubServer !== project.githubClient && (
                        <div className={styles.sideItem}>
                            <span className={styles.sideLabel}>SERVER REPO</span>
                            <a href={project.githubServer} target="_blank" rel="noreferrer" className={styles.sideLink}>
                                GitHub ↗
                            </a>
                        </div>
                    )}

                    <div className={styles.sideItem}>
                        <span className={styles.sideLabel}>CATEGORY</span>
                        <span className={styles.sideValue}>{project.category}</span>
                    </div>
                </aside>

                {/* Main Content */}
                <main className={styles.main}>
                    {/* Title Block */}
                    <div className={styles.titleBlock}>
                        <h1 className={styles.bigTitle}>
                            {(project.title || '').toUpperCase()}
                        </h1>
                        <p className={styles.subtitle}>
                            {project.subtitle || project.description?.substring(0, 60) || project.category}
                        </p>
                    </div>

                    {/* Description */}
                    <p className={styles.description}>{project.description}</p>

                    {/* Showcase Box */}
                    <div className={styles.showcase}>
                        {project.image && (
                            <div className={styles.showcaseImageWrap}>
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className={styles.showcaseImage}
                                />
                            </div>
                        )}

                        {/* Showcase Bottom */}
                        <div className={styles.showcaseBottom}>
                            {/* Bullet Features */}
                            {bulletPoints.length > 0 && (
                                <ul className={styles.featureList}>
                                    {bulletPoints.map((b, i) => (
                                        <li key={i} className={styles.featureItem}>
                                            <FiCheck className={styles.checkIcon} />
                                            <span>{b}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {/* Tech Stack */}
                            <div className={styles.techBlock}>
                                <span className={styles.techLabel}>Tech Stack:</span>
                                <div className={styles.techPills}>
                                    {(project.tech || project.tags || []).map((t, i) => (
                                        <span key={i} className={styles.techPill}>{t}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Strategy + Stack Footer */}
                    <div className={styles.bottomRow}>
                        <div className={styles.strategyBlock}>
                            <span className={styles.bottomLabel}>STRATEGY</span>
                            <p className={styles.strategyText}>
                                {project.solutions || project.description}
                            </p>
                        </div>
                        <div className={styles.stackBlock}>
                            <span className={styles.bottomLabel}>STACK</span>
                            <div className={styles.stackPills}>
                                {(project.tags || project.tech || []).map((t, i) => (
                                    <span key={i} className={styles.stackPill}>{t}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* ── Side Arrows ── */}
            {prevProject && (
                <button
                    className={`${styles.sideArrow} ${styles.sideArrowLeft}`}
                    onClick={() => navigate(`/projects/${prevProject.slug || prevProject._id}`)}
                    title={prevProject.title}
                >
                    <FiChevronLeft />
                </button>
            )}
            {nextProject && (
                <button
                    className={`${styles.sideArrow} ${styles.sideArrowRight}`}
                    onClick={() => navigate(`/projects/${nextProject.slug || nextProject._id}`)}
                    title={nextProject.title}
                >
                    <FiChevronRight />
                </button>
            )}
        </div>
    );
}
