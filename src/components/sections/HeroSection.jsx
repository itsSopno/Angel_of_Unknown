import { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import styles from './HeroSection.module.css';

const ROLES = [
  'MERN STACK & FRONTEND DEVELOPER',
  'REACT DEVELOPER',
  'NODE.JS ENGINEER',
  'FULL STACK DEVELOPER',
];

export default function HeroSection() {
  const heroRef    = useRef(null);
  const nameRef    = useRef(null);
  const tagRef     = useRef(null);
  const subRef     = useRef(null);
  const descRef    = useRef(null);
  const ctaRef     = useRef(null);
  const scrollRef  = useRef(null);
  const waterRef   = useRef(null);

  const [roleIndex, setRoleIndex] = useState(0);

  /* ── Role cycling ───────────────────────── */
  useEffect(() => {
    const t = setInterval(() => setRoleIndex(i => (i + 1) % ROLES.length), 3000);
    return () => clearInterval(t);
  }, []);

  /* ── GSAP entrance ──────────────────────── */
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
    tl.fromTo(tagRef.current,   { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 })
      .fromTo(nameRef.current,  { y: 60,  opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'expo.out' }, '-=0.2')
      .fromTo(subRef.current,   { y: 20,  opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.5')
      .fromTo(descRef.current,  { y: 20,  opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, '-=0.4')
      .fromTo(ctaRef.current?.children, { y: 16, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 0.45 }, '-=0.3')
      .fromTo(scrollRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 }, '-=0.2')
      .fromTo(waterRef.current,  { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }, '-=1.2');
  }, []);

  return (
    <section className={styles.hero} ref={heroRef} id="home">

      {/* Top bar */}
      <div className={styles.topBar}>
        <div className={styles.availBadge}>
          <span className={styles.greenDot} />
          AVAILABLE FOR HIRE
        </div>
        <a href="https://github.com/itsSopno" target="_blank" rel="noreferrer" className={styles.playBtn}>
          <svg width="12" height="14" viewBox="0 0 12 14" fill="currentColor">
            <path d="M0 0L12 7L0 14V0Z"/>
          </svg>
        </a>
      </div>

      {/* Center content */}
      <div className={styles.center}>

        {/* Portfolio badge */}
        <div className={styles.badge} ref={tagRef}>PORTFOLIO</div>

        {/* Name — ONE line */}
        <h1 className={styles.name} ref={nameRef}>NABIL HASAN</h1>

        {/* Role */}
        <div className={styles.role} ref={subRef}>
          <span className={styles.roleText} key={roleIndex}>
            {ROLES[roleIndex]}
          </span>
        </div>

        {/* Desc */}
        <p className={styles.desc} ref={descRef}>
          I build <strong>production-ready</strong> applications with React, Tailwind, and Node.js.
          My focus is on writing <strong>clean, reusable code</strong> and implementing{' '}
          <strong>secure authentication</strong> to create seamless user experiences.
        </p>

        {/* CTA */}
        <div className={styles.cta} ref={ctaRef}>
          <a href="#projects" className={styles.btn}>VIEW PROJECT</a>
          <a href="/cv.pdf" download className={styles.btn}>DOWNLOAD RESUME</a>
          <a href="#contact" className={styles.btn}>CONTACT</a>
        </div>

        {/* Scroll */}
        <div className={styles.scroll} ref={scrollRef}>
          {'SCROLL'.split('').map((ch, i) => (
            <span
              key={i}
              className={styles.scrollChar}
              /* ← inline animationDelay: CSS variable doesn't work in Modules */
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {ch}
            </span>
          ))}
        </div>
      </div>

      {/* Watermark — stays inside hero, clipped by overflow:hidden */}
      <div className={styles.watermark} ref={waterRef} aria-hidden="true">
        NABIL
      </div>
    </section>
  );
}
