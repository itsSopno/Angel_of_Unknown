import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiExternalLink, FiGithub, FiSearch, FiLayers } from 'react-icons/fi';
import { getAllProjects } from '../../services/portfolioService';
import styles from './AllProjectsPage.module.css';

const PROJECT_TYPES = ['all', 'Frontend', 'Backend-API', 'MERN', 'Full-Stack', 'MCP', 'Other'];

export default function AllProjectsPage() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterType, setFilterType] = useState('all');
    const [search, setSearch] = useState('');

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

    return (
        <section className={styles.page}>
            {/* Hero */}
            <div className={styles.hero}>
                <p className={styles.heroBadge}>// COMPLETE ARCHIVE</p>
                <h1 className={styles.heroTitle}>
                    ALL <span className={styles.heroAccent}>PROJECTS</span>
                </h1>
                <p className={styles.heroSub}>
                    Every project I have built — with full technical breakdown, challenges & solutions.
                </p>
            </div>

            {/* Controls */}
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
                </div>

                <div className={styles.filterRow}>
                    {PROJECT_TYPES.map((t) => (
                        <button
                            key={t}
                            onClick={() => setFilterType(t)}
                            className={`${styles.filterBtn} ${filterType === t ? styles.activeFilter : ''}`}
                        >
                            {t.toUpperCase()}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content */}
            {loading ? (
                <div className={styles.loadingState}>
                    <div className={styles.spinner} />
                    <p>Loading projects...</p>
                </div>
            ) : projects.length === 0 ? (
                <div className={styles.emptyState}>
                    <FiLayers style={{ fontSize: '3rem', color: '#cdff00', marginBottom: 16 }} />
                    <h3>No Projects Found</h3>
                    <p>Try a different filter or search term.</p>
                </div>
            ) : (
                <div className={styles.grid}>
                    {projects.map((proj) => (
                        <article key={proj._id} className={styles.card}>
                            {proj.image && (
                                <div className={styles.cardImg}>
                                    <img src={proj.image} alt={proj.title} />
                                    <div className={styles.imgOverlay} />
                                </div>
                            )}

                            <div className={styles.cardBody}>
                                <div className={styles.cardMeta}>
                                    <span className={styles.typeTag}>{proj.type}</span>
                                    <span className={styles.year}>{new Date(proj.createdAt).getFullYear()}</span>
                                </div>

                                <h2 className={styles.cardTitle}>{proj.title}</h2>
                                <p className={styles.cardDetail}>{proj.detail}</p>

                                {proj.tech && proj.tech.length > 0 && (
                                    <div className={styles.techRow}>
                                        {proj.tech.map((t, i) => (
                                            <span key={i} className={styles.techChip}>{t}</span>
                                        ))}
                                    </div>
                                )}

                                {(proj.errorFaced || proj.solutionYouFound) && (
                                    <div className={styles.insightBlock}>
                                        {proj.errorFaced && (
                                            <div className={styles.insightItem}>
                                                <span className={styles.insightLabel}>⚠ Challenge</span>
                                                <p>{proj.errorFaced}</p>
                                            </div>
                                        )}
                                        {proj.solutionYouFound && (
                                            <div className={styles.insightItem}>
                                                <span className={styles.insightLabel}>✓ Solution</span>
                                                <p>{proj.solutionYouFound}</p>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {proj.speciality && (
                                    <div className={styles.specialityRow}>
                                        <span className={styles.specialityLabel}>★ Speciality</span>
                                        <span>{proj.speciality}</span>
                                    </div>
                                )}

                                <div className={styles.cardFooter}>
                                    <div className={styles.cardLinks}>
                                        {proj.liveUrl && (
                                            <a href={proj.liveUrl} target="_blank" rel="noreferrer" className={styles.linkBtn}>
                                                <FiExternalLink /> Live
                                            </a>
                                        )}
                                        {proj.githubUrl && (
                                            <a href={proj.githubUrl} target="_blank" rel="noreferrer" className={styles.linkBtnGhost}>
                                                <FiGithub /> Code
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </section>
    );
}
