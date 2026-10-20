import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiLayers, FiArrowRight, FiExternalLink, FiGithub } from 'react-icons/fi';
import { getAllProjects } from '../../services/portfolioService';
import styles from './AllProjectsPage.module.css';

const PROJECT_TYPES = ['all', 'Frontend', 'Backend-API', 'MERN', 'Full-Stack', 'MCP', 'Other'];

export default function AllProjectsPage() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterType, setFilterType] = useState('all');
    const [search, setSearch] = useState('');
    const [visibleCards, setVisibleCards] = useState(new Set());
    const cardRefs = useRef([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setLoading(true);
                const params = {};
                if (filterType !== 'all') params.type = filterType;
                if (search) params.search = search;
                const res = await getAllProjects(params);
                if (res.data?.success) {
                    setProjects(res.data.data.projects || []);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        const debounce = setTimeout(fetchProjects, 300);
        return () => clearTimeout(debounce);
    }, [filterType, search]);

    // Intersection observer for staggered card entrances
    useEffect(() => {
        if (loading) return;
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const idx = Number(entry.target.dataset.idx);
                        setVisibleCards((prev) => new Set([...prev, idx]));
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
        );
        cardRefs.current.forEach((el) => { if (el) observer.observe(el); });
        return () => observer.disconnect();
    }, [loading, projects]);

    const handleCardClick = (id) => navigate(`/all-projects/${id}`);

    return (
        <div className={styles.page}>
            {/* ── Ambient BG ── */}
            <div className={styles.ambientOrb1} />
            <div className={styles.ambientOrb2} />

            {/* ── Hero ── */}
            <header className={styles.hero}>
                <div className={styles.heroBadgeRow}>
                    <span className={styles.heroBadgeDot} />
                    <span className={styles.heroBadgeText}>// COMPLETE ARCHIVE</span>
                </div>

                <h1 className={styles.heroTitle}>
                    ALL
                    <span className={styles.heroAccent}> PROJECTS</span>
                </h1>

                <p className={styles.heroSub}>
                    Every system I've engineered — with full technical breakdown, real challenges &amp; battle-tested solutions.
                </p>

                <div className={styles.heroStats}>
                    <div className={styles.statItem}>
                        <span className={styles.statNum}>{loading ? '—' : projects.length}</span>
                        <span className={styles.statLabel}>Projects</span>
                    </div>
                    <div className={styles.statDivider} />
                    <div className={styles.statItem}>
                        <span className={styles.statNum}>{PROJECT_TYPES.length - 1}</span>
                        <span className={styles.statLabel}>Categories</span>
                    </div>
                    <div className={styles.statDivider} />
                    <div className={styles.statItem}>
                        <span className={styles.statNum}>MERN</span>
                        <span className={styles.statLabel}>Primary Stack</span>
                    </div>
                </div>
            </header>

            {/* ── Controls ── */}
            <div className={styles.controls}>
                <div className={styles.searchWrap}>
                    <FiSearch className={styles.searchIcon} />
                    <input
                        type="text"
                        placeholder="Search projects..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className={styles.searchInput}
                    />
                    {search && (
                        <button className={styles.clearBtn} onClick={() => setSearch('')}>×</button>
                    )}
                </div>

                <div className={styles.filterRow}>
                    {PROJECT_TYPES.map((t) => (
                        <button
                            key={t}
                            onClick={() => setFilterType(t)}
                            className={`${styles.filterBtn} ${filterType === t ? styles.activeFilter : ''}`}
                        >
                            {t === 'all' ? 'ALL' : t.toUpperCase()}
                        </button>
                    ))}
                </div>
            </div>

            {/* ── Content ── */}
            <div className={styles.content}>
                {loading ? (
                    <div className={styles.loadingState}>
                        <div className={styles.orbLoader}>
                            <div className={styles.orbRing} />
                            <div className={styles.orbRing2} />
                            <div className={styles.orbCore} />
                        </div>
                        <p className={styles.loadingText}>Loading projects...</p>
                    </div>
                ) : projects.length === 0 ? (
                    <div className={styles.emptyState}>
                        <div className={styles.emptyIconWrap}>
                            <FiLayers className={styles.emptyIcon} />
                        </div>
                        <h3 className={styles.emptyTitle}>No Projects Found</h3>
                        <p className={styles.emptySub}>Try a different filter or search term.</p>
                        <button className={styles.resetBtn} onClick={() => { setSearch(''); setFilterType('all'); }}>
                            Reset Filters
                        </button>
                    </div>
                ) : (
                    <div className={styles.projectList}>
                        {projects.map((proj, index) => (
                            <article
                                key={proj._id}
                                ref={(el) => (cardRefs.current[index] = el)}
                                data-idx={index}
                                className={`${styles.card} ${visibleCards.has(index) ? styles.cardVisible : ''}`}
                                style={{ '--delay': `${index * 0.07}s` }}
                                onClick={() => handleCardClick(proj._id)}
                            >
                                {/* Left: Index + Type */}
                                <div className={styles.cardLeft}>
                                    <span className={styles.cardIndex}>
                                        {String(index + 1).padStart(2, '0')}
                                    </span>
                                    <span className={styles.typeTag}>{proj.type}</span>
                                </div>

                                {/* Center: Image (if any) */}
                                {proj.image && (
                                    <div className={styles.cardThumb}>
                                        <img src={proj.image} alt={proj.title} />
                                        <div className={styles.thumbOverlay} />
                                    </div>
                                )}

                                {/* Main Content */}
                                <div className={styles.cardMain}>
                                    <div className={styles.cardHeader}>
                                        <h2 className={styles.cardTitle}>{proj.title}</h2>
                                        <span className={styles.cardYear}>
                                            {new Date(proj.createdAt).getFullYear()}
                                        </span>
                                    </div>

                                    <p className={styles.cardDetail}>{proj.detail}</p>

                                    {proj.tech && proj.tech.length > 0 && (
                                        <div className={styles.techRow}>
                                            {proj.tech.slice(0, 5).map((t, i) => (
                                                <span key={i} className={styles.techChip}>{t}</span>
                                            ))}
                                            {proj.tech.length > 5 && (
                                                <span className={styles.techMore}>+{proj.tech.length - 5}</span>
                                            )}
                                        </div>
                                    )}

                                    {(proj.errorFaced || proj.solutionYouFound) && (
                                        <div className={styles.insightRow}>
                                            {proj.errorFaced && (
                                                <span className={styles.insightPill}>
                                                    <span className={styles.insightDot} style={{ background: '#f59e0b' }} />
                                                    Challenge
                                                </span>
                                            )}
                                            {proj.solutionYouFound && (
                                                <span className={styles.insightPill}>
                                                    <span className={styles.insightDot} style={{ background: '#cdff00' }} />
                                                    Solution
                                                </span>
                                            )}
                                            {proj.speciality && (
                                                <span className={styles.insightPill}>
                                                    <span className={styles.insightDot} style={{ background: '#818cf8' }} />
                                                    {proj.speciality.substring(0, 18)}{proj.speciality.length > 18 ? '...' : ''}
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Right: Actions */}
                                <div className={styles.cardRight}>
                                    {proj.liveUrl && (
                                        <a
                                            href={proj.liveUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className={styles.quickLink}
                                            onClick={(e) => e.stopPropagation()}
                                            title="Live Demo"
                                        >
                                            <FiExternalLink />
                                        </a>
                                    )}
                                    {proj.githubUrl && (
                                        <a
                                            href={proj.githubUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className={styles.quickLink}
                                            onClick={(e) => e.stopPropagation()}
                                            title="GitHub"
                                        >
                                            <FiGithub />
                                        </a>
                                    )}
                                    <button
                                        className={styles.viewBtn}
                                        onClick={(e) => { e.stopPropagation(); handleCardClick(proj._id); }}
                                    >
                                        View <FiArrowRight className={styles.viewArrow} />
                                    </button>
                                </div>

                                {/* Hover accent line */}
                                <div className={styles.cardAccentLine} />
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
