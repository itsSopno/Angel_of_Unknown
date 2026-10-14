import { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import styles from './HeroSection.module.css';

const ROLES = ['MERN STACK DEVELOPER', 'FRONTEND DEVELOPER', 'REACT DEVELOPER', 'NODE.JS ENGINEER'];

export default function HeroSection() {
  const heroRef    = useRef(null);
  const nameRef    = useRef(null);
  const tagRef     = useRef(null);
  const subRef     = useRef(null);
  const descRef    = useRef(null);
  const ctaRef     = useRef(null);
  const watermarkRef = useRef(null);

  const [roleIndex, setRoleIndex] = useState(0);

  /* ── Role cycling ───────────────────────────────── */
  useEffect(() => {
    const t = setInterval(() => setRoleIndex(i => (i + 1) % ROLES.length), 2800);
    return () => clearInterval(t);
  }, []);

  /* ── GSAP entrance ──────────────────────────────── */
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    tl.fromTo(tagRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 }
    )
    .fromTo(nameRef.current,
      { y: 80, opacity: 0, skewY: 4 },
      { y: 0, opacity: 1, skewY: 0, duration: 1, ease: 'expo.out' },
      '-=0.2'
    )
    .fromTo(subRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 },
      '-=0.5'
    )
    .fromTo(descRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 },
      '-=0.4'
    )
    .fromTo(ctaRef.current?.children,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.5 },
      '-=0.3'
    )
    .fromTo(watermarkRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' },
      '-=1'
    );
  }, []);

  return (
    <section className={styles.hero} ref={heroRef} id="home">

      {/* ── Top bar ── */}
      <div className={styles.topBar}>
        <div className={styles.availBadge}>
          <span className={styles.greenDot} />
          <span>AVAILABLE FOR HIRE</span>
        </div>
        <a
          href="https://github.com/itsSopno"
          target="_blank"
          rel="noreferrer"
          className={styles.playBtn}
          aria-label="GitHub"
        >
          <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor">
            <path d="M0 0L14 8L0 16V0Z" />
          </svg>
        </a>
      </div>

      {/* ── Center content ── */}
      <div className={styles.center}>

        {/* Portfolio badge */}
        <div className={styles.portfolioBadge} ref={tagRef}>PORTFOLIO</div>

        {/* Name */}
        <h1 className={styles.name} ref={nameRef}>
          NABIL<br />HASAN
        </h1>

        {/* Role */}
        <div className={styles.role} ref={subRef}>
          <span className={styles.roleText} key={roleIndex}>
            {ROLES[roleIndex]}
          </span>
        </div>

        {/* Description */}
        <p className={styles.desc} ref={descRef}>
          I build <strong>production-ready</strong> applications with React, Tailwind, and Node.js.
          My focus is on writing <strong>clean, reusable code</strong> and implementing{' '}
          <strong>secure authentication</strong> to create seamless user experiences.
        </p>

        {/* CTA buttons */}
        <div className={styles.cta} ref={ctaRef}>
          <a href="#projects" className={styles.btnOutline}>VIEW PROJECT</a>
          <a href="/cv.pdf" download className={styles.btnOutline}>DOWNLOAD RESUME</a>
          <a href="#contact" className={styles.btnOutline}>CONTACT</a>
        </div>

        {/* Scroll */}
        <div className={styles.scrollText}>
          {'SCROLL'.split('').map((ch, i) => (
            <span key={i} className={styles.scrollChar} style={{ '--i': i }}>{ch}</span>
          ))}
        </div>
      </div>

      {/* ── Watermark name ── */}
      <div className={styles.watermark} ref={watermarkRef} aria-hidden="true">
        NABIL
      </div>
    </section>
  );
}
