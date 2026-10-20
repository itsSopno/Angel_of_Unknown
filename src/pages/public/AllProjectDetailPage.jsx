// import { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { FiArrowLeft, FiArrowUpRight } from 'react-icons/fi';
// import { getAllProjectById } from '../../services/portfolioService';
// import styles from './AllProjectDetailPage.module.css';

// export default function AllProjectDetailPage() {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [project, setProject] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [notFound, setNotFound] = useState(false);
//     const [imgLoaded, setImgLoaded] = useState(false);
//     const [tab, setTab] = useState(0);

//     useEffect(() => {
//         const load = async () => {
//             setLoading(true);
//             setImgLoaded(false);
//             setTab(0);
//             window.scrollTo({ top: 0, behavior: 'instant' });
//             try {
//                 const res = await getAllProjectById(id);
//                 const data = res.data?.data;
//                 if (data && data._id) {
//                     setProject(data);
//                     setNotFound(false);
//                 } else {
//                     setNotFound(true);
//                 }
//             } catch {
//                 setNotFound(true);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         load();
//     }, [id]);

//     if (loading) {
//         return (
//             <div className={styles.state}>
//                 <span className={styles.pulse} />
//                 <p>Loading project</p>
//             </div>
//         );
//     }

//     if (notFound || !project) {
//         return (
//             <div className={styles.state}>
//                 <h2 className={styles.stateTitle}>Project not found</h2>
//                 <p>It may have been removed, or the link is wrong.</p>
//                 <button className={styles.textBtn} onClick={() => navigate('/all-projects')}>
//                     <FiArrowLeft /> Back to all projects
//                 </button>
//             </div>
//         );
//     }

//     const year = project.createdAt ? new Date(project.createdAt).getFullYear() : null;
//     const title = (project.title || '').toUpperCase();
//     const words = title.split(' ');
//     // Scale the headline so the whole title fits the viewport width
//     const titleSize = `clamp(3.2rem, ${Math.min(22, 92 / (Math.max(title.length, 4) * 0.5))}vw, 24rem)`;
//     let charIndex = 0;

//     const story = [
//         project.errorFaced && { label: 'What went wrong', text: project.errorFaced },
//         project.solutionYouFound && { label: 'How it got fixed', text: project.solutionYouFound },
//     ].filter(Boolean);
//     const activeStory = story[Math.min(tab, story.length - 1)];

//     const primary = project.liveUrl
//         ? { href: project.liveUrl, text: 'Open the live project' }
//         : project.githubUrl
//             ? { href: project.githubUrl, text: 'Read the source code' }
//             : null;

//     return (
//         <div className={styles.page}>
//             {/* ── Hero ── */}
//             <header className={styles.hero}>
//                 {project.image && (
//                     <div className={styles.heroMedia}>
//                         <img
//                             src={project.image}
//                             alt=""
//                             className={`${styles.heroImg} ${imgLoaded ? styles.imgLoaded : ''}`}
//                             onLoad={() => setImgLoaded(true)}
//                         />
//                     </div>
//                 )}

//                 <nav className={styles.nav}>
//                     <button className={styles.textBtn} onClick={() => navigate('/all-projects')}>
//                         <FiArrowLeft /> All projects
//                     </button>
//                     <span className={styles.navMeta}>
//                         {project.type}{year ? `, ${year}` : ''}
//                     </span>
//                     <div className={styles.navLinks}>
//                         {project.liveUrl && (
//                             <a href={project.liveUrl} target="_blank" rel="noreferrer">Live</a>
//                         )}
//                         {project.githubUrl && (
//                             <a href={project.githubUrl} target="_blank" rel="noreferrer">Code</a>
//                         )}
//                     </div>
//                 </nav>

//                 <h1 className={styles.title} style={{ fontSize: titleSize }} aria-label={project.title}>
//                     {words.map((w, wi) => (
//                         <span key={wi} className={styles.word} aria-hidden="true">
//                             {[...w].map((c, ci) => (
//                                 <span key={ci} className={styles.mask}>
//                                     <span className={styles.ch} style={{ '--i': charIndex++ }}>{c}</span>
//                                 </span>
//                             ))}
//                         </span>
//                     ))}
//                 </h1>
//             </header>

//             <main className={styles.content}>
//                 {/* ── Intro: facts + description ── */}
//                 <section className={styles.row}>
//                     <dl className={styles.facts}>
//                         {year && (<div><dt>Year</dt><dd>{year}</dd></div>)}
//                         <div><dt>Type</dt><dd>{project.type}</dd></div>
//                         {project.liveUrl && (
//                             <div><dt>Live</dt><dd><a href={project.liveUrl} target="_blank" rel="noreferrer">Visit the site</a></dd></div>
//                         )}
//                         {project.githubUrl && (
//                             <div><dt>Code</dt><dd><a href={project.githubUrl} target="_blank" rel="noreferrer">GitHub repository</a></dd></div>
//                         )}
//                     </dl>
//                     {project.detail && <p className={styles.lede}>{project.detail}</p>}
//                 </section>

//                 {/* ── Problem / fix ── */}
//                 {activeStory && (
//                     <section className={styles.row}>
//                         <div className={styles.tabs} role="tablist" aria-label="Project story">
//                             {story.map((s, i) => (
//                                 <button
//                                     key={s.label}
//                                     role="tab"
//                                     aria-selected={tab === i}
//                                     className={styles.tab}
//                                     onClick={() => setTab(i)}
//                                 >
//                                     {s.label}
//                                 </button>
//                             ))}
//                         </div>
//                         <p key={activeStory.label} role="tabpanel" className={`${styles.lede} ${styles.panel}`}>
//                             {activeStory.text}
//                         </p>
//                     </section>
//                 )}

//                 {/* ── Speciality ── */}
//                 {project.speciality && (
//                     <section className={styles.row}>
//                         <h2 className={styles.rowLabel}>What makes it different</h2>
//                         <p className={styles.statement}>{project.speciality}</p>
//                     </section>
//                 )}

//                 {/* ── Stack ── */}
//                 {project.tech && project.tech.length > 0 && (
//                     <section className={styles.row}>
//                         <h2 className={styles.rowLabel}>Built with</h2>
//                         <p className={styles.stack}>
//                             {project.tech.map((t, i) => (
//                                 <span key={i}>
//                                     {t}
//                                     {i < project.tech.length - 1 && <i aria-hidden="true"> / </i>}
//                                 </span>
//                             ))}
//                         </p>
//                     </section>
//                 )}
//             </main>

//             {/* ── Footer CTA ── */}
//             <footer className={styles.cta}>
//                 {primary && (
//                     <a href={primary.href} target="_blank" rel="noreferrer" className={styles.ctaMain}>
//                         {primary.text} <FiArrowUpRight />
//                     </a>
//                 )}
//                 <div className={styles.ctaSub}>
//                     <button className={styles.textBtn} onClick={() => navigate('/all-projects')}>
//                         <FiArrowLeft /> Back to all projects
//                     </button>
//                     {project.liveUrl && project.githubUrl && (
//                         <a href={project.githubUrl} target="_blank" rel="noreferrer">Source code</a>
//                     )}
//                 </div>
//             </footer>
//         </div>
//     );
// }
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiArrowUpRight } from 'react-icons/fi';
import { getAllProjectById } from '../../services/portfolioService';
import styles from './AllProjectDetailPage.module.css';

export default function AllProjectDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const [imgLoaded, setImgLoaded] = useState(false);
    const [tab, setTab] = useState(0);

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            setImgLoaded(false);
            setTab(0);
            window.scrollTo({ top: 0, behavior: 'instant' });
            try {
                const res = await getAllProjectById(id);
                const data = res.data?.data;
                if (data && data._id) {
                    setProject(data);
                    setNotFound(false);
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
            <div className={styles.state}>
                <span className={styles.pulse} />
                <p>Loading project</p>
            </div>
        );
    }

    if (notFound || !project) {
        return (
            <div className={styles.state}>
                <h2 className={styles.stateTitle}>Project not found</h2>
                <p>It may have been removed, or the link is wrong.</p>
                <button className={styles.textBtn} onClick={() => navigate('/all-projects')}>
                    <FiArrowLeft /> Back to all projects
                </button>
            </div>
        );
    }

    const year = project.createdAt ? new Date(project.createdAt).getFullYear() : null;
    const title = (project.title || '').toUpperCase();
    const words = title.split(' ');
    // Scale the headline so the whole title fits the viewport width
    const titleSize = `clamp(3.2rem, ${Math.min(22, 92 / (Math.max(title.length, 4) * 0.5))}vw, 24rem)`;
    let charIndex = 0;

    const story = [
        project.errorFaced && { label: 'What went wrong', text: project.errorFaced },
        project.solutionYouFound && { label: 'How it got fixed', text: project.solutionYouFound },
    ].filter(Boolean);
    const activeStory = story[Math.min(tab, story.length - 1)];

    const primary = project.liveUrl
        ? { href: project.liveUrl, text: 'Open the live project' }
        : project.githubUrl
            ? { href: project.githubUrl, text: 'Read the source code' }
            : null;

    return (
        <div className={styles.page}>
            {/* ── Hero ── */}
            <header className={styles.hero}>
                {project.image && (
                    <div className={styles.heroMedia}>
                        <img
                            src={project.image}
                            alt=""
                            className={`${styles.heroImg} ${imgLoaded ? styles.imgLoaded : ''}`}
                            onLoad={() => setImgLoaded(true)}
                        />
                    </div>
                )}

                <nav className={styles.nav}>
                    <button className={styles.textBtn} onClick={() => navigate('/all-projects')}>
                        <FiArrowLeft /> All projects
                    </button>
                    <span className={styles.navMeta}>
                        {project.type}{year ? `, ${year}` : ''}
                    </span>
                    <div className={styles.navLinks}>
                        {project.liveUrl && (
                            <a href={project.liveUrl} target="_blank" rel="noreferrer">Live</a>
                        )}
                        {project.githubUrl && (
                            <a href={project.githubUrl} target="_blank" rel="noreferrer">Code</a>
                        )}
                    </div>
                </nav>

                <h1 className={styles.title} style={{ fontSize: titleSize }} aria-label={project.title}>
                    {words.map((w, wi) => (
                        <span key={wi} className={styles.word} aria-hidden="true">
                            {[...w].map((c, ci) => (
                                <span key={ci} className={styles.mask}>
                                    <span className={styles.ch} style={{ '--i': charIndex++ }}>{c}</span>
                                </span>
                            ))}
                        </span>
                    ))}
                </h1>
            </header>

            <main className={styles.content}>
                {/* ── Intro: facts + description ── */}
                <section className={styles.row}>
                    <dl className={styles.facts}>
                        {year && (<div><dt>Year</dt><dd>{year}</dd></div>)}
                        <div><dt>Type</dt><dd>{project.type}</dd></div>
                        {project.liveUrl && (
                            <div><dt>Live</dt><dd><a href={project.liveUrl} target="_blank" rel="noreferrer">Visit the site</a></dd></div>
                        )}
                        {project.githubUrl && (
                            <div><dt>Code</dt><dd><a href={project.githubUrl} target="_blank" rel="noreferrer">GitHub repository</a></dd></div>
                        )}
                    </dl>
                    {project.detail && <p className={styles.lede}>{project.detail}</p>}
                </section>

                {/* ── Problem / fix ── */}
                {activeStory && (
                    <section className={styles.row}>
                        <div className={styles.tabs} role="tablist" aria-label="Project story">
                            {story.map((s, i) => (
                                <button
                                    key={s.label}
                                    role="tab"
                                    aria-selected={tab === i}
                                    className={styles.tab}
                                    onClick={() => setTab(i)}
                                >
                                    {s.label}
                                </button>
                            ))}
                        </div>
                        <p key={activeStory.label} role="tabpanel" className={`${styles.lede} ${styles.panel}`}>
                            {activeStory.text}
                        </p>
                    </section>
                )}

                {/* ── Speciality ── */}
                {project.speciality && (
                    <section className={styles.row}>
                        <h2 className={styles.rowLabel}>What makes it different</h2>
                        <p className={styles.statement}>{project.speciality}</p>
                    </section>
                )}

                {/* ── Stack ── */}
                {project.tech && project.tech.length > 0 && (
                    <section className={styles.row}>
                        <h2 className={styles.rowLabel}>Built with</h2>
                        <p className={styles.stack}>
                            {project.tech.map((t, i) => (
                                <span key={i}>
                                    {t}
                                    {i < project.tech.length - 1 && <i aria-hidden="true"> / </i>}
                                </span>
                            ))}
                        </p>
                    </section>
                )}
            </main>

            {/* ── Footer CTA ── */}
            <footer className={styles.cta}>
                {primary && (
                    <a href={primary.href} target="_blank" rel="noreferrer" className={styles.ctaMain}>
                        {primary.text} <FiArrowUpRight />
                    </a>
                )}
                <div className={styles.ctaSub}>
                    <button className={styles.textBtn} onClick={() => navigate('/all-projects')}>
                        <FiArrowLeft /> Back to all projects
                    </button>
                    {project.liveUrl && project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noreferrer">Source code</a>
                    )}
                </div>
            </footer>
        </div>
    );
}