import { useNavigate } from 'react-router-dom';
import { FaGithub, FaLinkedinIn, FaFacebookF } from 'react-icons/fa';
import { FiArrowUp } from 'react-icons/fi';
import styles from './Footer.module.css';

const SECTIONS = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
];

export default function Footer() {
    const navigate = useNavigate();

    const scrollTo = (id) => {
        if (window.location.pathname !== '/') {
            navigate('/');
            setTimeout(() => {
                document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
            }, 150);
        } else {
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const backToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className={styles.footer}>
            <div className={styles.inner}>
                {/* ── Top ──────────────────────────────────────────── */}
                <div className={styles.topRow}>
                    {/* Brand */}
                    <div className={styles.brand}>
                        <h3 className={styles.brandName}>NABIL HASAN</h3>
                        <p className={styles.brandTag}>
                            MERN Stack Developer crafting clean, performance-driven web experiences.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className={styles.linksGroup}>
                        <div className={styles.linksCol}>
                            <span className={styles.linksHeading}>Navigate</span>
                            {SECTIONS.map((s) => (
                                <button
                                    key={s.id}
                                    className={styles.footerLink}
                                    onClick={() => scrollTo(s.id)}
                                >
                                    {s.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Social */}
                    <div className={styles.socialCol}>
                        <span className={styles.linksHeading}>Connect</span>
                        <div className={styles.socialRow}>
                            <a
                                href="https://github.com/nahid-thedev"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.socialIcon}
                                title="GitHub"
                            >
                                <FaGithub />
                            </a>
                            <a
                                href="https://linkedin.com/in/nahid-thedev"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.socialIcon}
                                title="LinkedIn"
                            >
                                <FaLinkedinIn />
                            </a>
                            <a
                                href="https://facebook.com/nahid.thedev"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.socialIcon}
                                title="Facebook"
                            >
                                <FaFacebookF />
                            </a>
                        </div>
                    </div>
                </div>

                <div className={styles.divider} />

                {/* ── Bottom ───────────────────────────────────────── */}
                <div className={styles.bottomRow}>
                    <p className={styles.copyright}>
                        © {new Date().getFullYear()} Angel of Unknown
                    </p>
                    <button className={styles.backToTop} onClick={backToTop}>
                        <FiArrowUp className={styles.topArrow} />
                        Back to Top
                    </button>
                </div>
            </div>
        </footer>
    );
}
