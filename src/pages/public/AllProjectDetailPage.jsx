import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    FiArrowLeft, FiExternalLink, FiGithub,
    FiAlertTriangle, FiCheckCircle, FiStar,
    FiCalendar, FiTag, FiLayers
} from 'react-icons/fi';
import { getAllProjectById } from '../../services/portfolioService';
import styles from './AllProjectDetailPage.module.css';

export default function AllProjectDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const [imgLoaded, setImgLoaded] = useState(false);

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            setImgLoaded(false);
            window.scrollTo({ top: 0, behavior: 'instant' });
            try {
                const res = await getAllProjectById(id);
                const data = res.data?.data;
                if (data && data._id) {
                    setProject(data);
                } else {
                    setNotFound(true);
                }
            } catch {
                setNotFound(true);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [id]);

    if (loading) {
        return (
            <div className={styles.loadingScreen}>
                <div className={styles.loaderOrb}>
                    <div className={styles.loaderRing} />
                    <div className={styles.loaderRing2} />
                    <div className={styles.loaderCore} />
                </div>
                <p className={styles.loaderText}>Loading project...</p>
            </div>
        );
    }

    if (notFound || !project) {
        return (
            <div className={styles.notFoundScreen}>
                <FiLayers className={styles.notFoundIcon} />
                <h2 className={styles.notFoundTitle}>Project Not Found</h2>
                <p className={styles.notFoundSub}>This project may have been removed or the link is incorrect.</p>
                <button className={styles.backBtn} onClick={() => navigate('/all-projects')}>
                    <FiArrowLeft /> Back to All Projects
                </button>
            </div>
        );
    }

    const year = project.createdAt ? new Date(project.createdAt).getFullYear() : '—';

    return (
        <div className={styles.page}>
            {/* Ambient BG */}
            <div className={styles.bgOrb1} />
            <div className={styles.bgOrb2} />

            {/* ── Top Nav ── */}
            <nav className={styles.topNav}>
                <button className={styles.backLink} onClick={() => navigate('/all-projects')}>
                    <FiArrowLeft /> All Projects
                </button>

                <div className={styles.navPill}>
                    <span className={styles.navPillDot} />
                    {project.type}
                </div>

                <div className={styles.navActions}>
                    {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noreferrer" className={styles.navActionBtn}>
                            <FiExternalLink /> Live Demo
                        </a>
                    )}
                    {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noreferrer" className={`${styles.navActionBtn} ${styles.navActionGhost}`}>
                            <FiGithub /> Code
                        </a>
                    )}
                </div>
            </nav>

            {/* ── Main Layout ── */}
            <div className={styles.layout}>

                {/* ── Left Sidebar ── */}
                <aside className={styles.sidebar}>
                    <div className={styles.sideSection}>
                        <span className={styles.sideLabel}><FiCalendar size={10} /> YEAR</span>
                        <span className={styles.sideVal}>{year}</span>
                    </div>

                    <div className={styles.sideSection}>
                        <span className={styles.sideLabel}><FiTag size={10} /> TYPE</span>
                        <span className={styles.sideVal}>{project.type}</span>
                    </div>

                    {project.speciality && (
                        <div className={styles.sideSection}>
                            <span className={styles.sideLabel}><FiStar size={10} /> SPECIALITY</span>
                            <span className={styles.sideValSm}>{project.speciality}</span>
                        </div>
                    )}

                    {project.liveUrl && (
                        <div className={styles.sideSection}>
                            <span className={styles.sideLabel}><FiExternalLink size={10} /> LIVE</span>
                            <a href={project.liveUrl} target="_blank" rel="noreferrer" className={styles.sideLink}>
                                View Project ↗
                            </a>
                        </div>
                    )}

                    {project.githubUrl && (
                        <div className={styles.sideSection}>
                            <span className={styles.sideLabel}><FiGithub size={10} /> GITHUB</span>
                            <a href={project.githubUrl} target="_blank" rel="noreferrer" className={styles.sideLink}>
                                Repository ↗
                            </a>
                        </div>
                    )}

                    {project.tech && project.tech.length > 0 && (
                        <div className={styles.sideSection}>
                            <span className={styles.sideLabel}><FiLayers size={10} /> STACK</span>
                            <div className={styles.sideTechList}>
                                {project.tech.map((t, i) => (
                                    <span key={i} className={styles.sideTechItem}>{t}</span>
                                ))}
                            </div>
                        </div>
                    )}
                </aside>

                {/* ── Main Content ── */}
                <main className={styles.main}>

                    {/* Title Block */}
                    <div className={styles.titleBlock}>
                        <span className={styles.titleBadge}>// {project.type}</span>
                        <h1 className={styles.bigTitle}>{(project.title || '').toUpperCase()}</h1>
                        <div className={styles.titleDivider} />
                    </div>

                    {/* Detail Description */}
                    {project.detail && (
                        <p className={styles.detailText}>{project.detail}</p>
                    )}

                    {/* Image Showcase */}
                    {project.image && (
                        <div className={styles.imageWrap}>
                            <div className={styles.imageBadge}>
                                <span className={styles.imageBadgeDot} />
                                PREVIEW
                            </div>
                            <img
                                src={project.image}
                                alt={project.title}
                                className={`${styles.showcaseImg} ${imgLoaded ? styles.imgLoaded : ''}`}
                                onLoad={() => setImgLoaded(true)}
                            />
                            <div className={styles.imgGradient} />
                        </div>
                    )}

                    {/* Challenge / Solution / Speciality Panels */}
                    {(project.errorFaced || project.solutionYouFound) && (
                        <div className={styles.insightGrid}>
                            {project.errorFaced && (
                                <div className={`${styles.insightCard} ${styles.insightChallenge}`}>
                                    <div className={styles.insightCardHeader}>
                                        <FiAlertTriangle className={styles.insightIcon} />
                                        <span className={styles.insightCardLabel}>CHALLENGE</span>
                                    </div>
                                    <p className={styles.insightCardText}>{project.errorFaced}</p>
                                </div>
                            )}
                            {project.solutionYouFound && (
                                <div className={`${styles.insightCard} ${styles.insightSolution}`}>
                                    <div className={styles.insightCardHeader}>
                                        <FiCheckCircle className={styles.insightIcon} />
                                        <span className={styles.insightCardLabel}>SOLUTION</span>
                                    </div>
                                    <p className={styles.insightCardText}>{project.solutionYouFound}</p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Speciality Highlight */}
                    {project.speciality && (
                        <div className={styles.specialityBanner}>
                            <FiStar className={styles.specialityIcon} />
                            <div>
                                <span className={styles.specialityLabel}>UNIQUE FEATURE</span>
                                <p className={styles.specialityText}>{project.speciality}</p>
                            </div>
                        </div>
                    )}

                    {/* Tech Stack Full Display */}
                    {project.tech && project.tech.length > 0 && (
                        <div className={styles.techSection}>
                            <span className={styles.techSectionLabel}>TECH STACK</span>
                            <div className={styles.techPills}>
                                {project.tech.map((t, i) => (
                                    <span key={i} className={styles.techPill}
                                        style={{ '--i': i }}
                                    >{t}</span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* CTA Footer */}
                    <div className={styles.ctaFooter}>
                        <button className={styles.ctaBack} onClick={() => navigate('/all-projects')}>
                            <FiArrowLeft /> All Projects
                        </button>
                        <div className={styles.ctaLinks}>
                            {project.liveUrl && (
                                <a href={project.liveUrl} target="_blank" rel="noreferrer" className={styles.ctaLive}>
                                    <FiExternalLink /> Live Demo
                                </a>
                            )}
                            {project.githubUrl && (
                                <a href={project.githubUrl} target="_blank" rel="noreferrer" className={styles.ctaGhost}>
                                    <FiGithub /> Source Code
                                </a>
                            )}
                        </div>
                    </div>

                </main>
            </div>
        </div>
    );
}
