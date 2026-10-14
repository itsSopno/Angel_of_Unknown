import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './AboutSection.module.css';

gsap.registerPlugin(ScrollTrigger);

const SKILLS = [
  'React', 'Node.js', 'Express', 'MongoDB', 'Mongoose',
  'JavaScript', 'REST API', 'JWT', 'Tailwind CSS', 'Git & GitHub',
  'HTML5', 'CSS3',
];

const LINKS = [
  { label: 'Email',    href: 'mailto:nabil@example.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
  { label: 'GitHub',   href: 'https://github.com/itsSopno' },
];

export default function AboutSection() {
  const sectionRef  = useRef(null);
  const introRef    = useRef(null);
  const leftRef     = useRef(null);
  const rightRef    = useRef(null);
  const skillsRef   = useRef(null);

  useGSAP(() => {
    // "INTRO" heading
    gsap.fromTo(introRef.current,
      { x: -60, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
      }
    );

    // Left content lines
    gsap.fromTo(leftRef.current?.querySelectorAll('p, .link-row, .skills-section'),
      { y: 28, opacity: 0 },
      {
        y: 0, opacity: 1, stagger: 0.1, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
      }
    );

    // Right image
    gsap.fromTo(rightRef.current,
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1, scale: 1, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' }
      }
    );

    // Skills stagger
    gsap.fromTo(skillsRef.current?.children,
      { y: 14, opacity: 0 },
      {
        y: 0, opacity: 1, stagger: 0.05, duration: 0.5, ease: 'power2.out',
        scrollTrigger: { trigger: skillsRef.current, start: 'top 85%' }
      }
    );
  }, []);

  return (
    <section className={styles.about} ref={sectionRef} id="about">

      {/* INTRO heading */}
      <div className={styles.introHead} ref={introRef}>
        <h2 className={styles.introTitle}>INTRO</h2>
      </div>

      {/* Divider */}
      <div className={styles.divider} />

      {/* Content grid */}
      <div className={styles.grid}>

        {/* ── LEFT ── */}
        <div className={styles.left} ref={leftRef}>

          <p className={styles.greeting}>Hi, I'm Nabil Hasan</p>

          <p className={styles.bio}>
            I'm a{' '}
            <strong className={styles.highlight}>MERN Stack Developer (Junior)</strong>{' '}
            performance-driven web applications with clean architecture and intuitive
            user experiences.
          </p>

          <p className={styles.bio}>
            I work across the full stack — crafting responsive front-end interfaces with
            React &amp; Tailwind CSS, and building secure, efficient backend systems using
            Node.js, Express, and MongoDB.
          </p>

          <p className={styles.bio}>
            I enjoy solving real-world problems and turning complex ideas into reliable,
            maintainable digital products.
          </p>

          {/* Links */}
          <div className={`link-row ${styles.linkRow}`}>
            {LINKS.map(l => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className={styles.link}
              >
                {l.label} <span className={styles.arrow}>↗</span>
              </a>
            ))}
          </div>

          {/* Skills */}
          <div id="skills" className={`skills-section ${styles.skillsSection}`}>
            <p className={styles.skillsTitle}>SKILLS I HAVE</p>
            <div className={styles.skillsGrid} ref={skillsRef}>
              {SKILLS.map(s => (
                <span key={s} className={styles.skillTag}>{s}</span>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT — Photo ── */}
        <div className={styles.right} ref={rightRef}>
          <div className={styles.photoWrap}>
            <div className={styles.photoPlaceholder}>
              <span className={styles.photoInitials}>NH</span>
            </div>
            {/* Corner accents */}
            <div className={styles.cornerTL} />
            <div className={styles.cornerBR} />
          </div>
        </div>

      </div>
    </section>
  );
}
