import { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import styles from './HeroSection.module.css';

gsap.registerPlugin();

const TECH_STACK = [
  { name: 'MongoDB', icon: '🍃', color: '#00ED64', angle: 0 },
  { name: 'Express', icon: '⚡', color: '#ffffff', angle: 60 },
  { name: 'React', icon: '⚛️', color: '#61DAFB', angle: 120 },
  { name: 'Node.js', icon: '🟢', color: '#8CC84B', angle: 180 },
  { name: 'JavaScript', icon: '𝙅𝙎', color: '#F7DF1E', angle: 240 },
  { name: 'REST API', icon: '🔗', color: '#FF6B6B', angle: 300 },
];

const TYPED_WORDS = ['MERN Stack', 'Full Stack', 'React', 'Node.js'];

export default function HeroSection() {
  const containerRef = useRef(null);
  const nameRef = useRef(null);
  const subtitleRef = useRef(null);
  const descRef = useRef(null);
  const ctaRef = useRef(null);
  const orbRef = useRef(null);
  const badgesRef = useRef([]);
  const cursorRef = useRef(null);
  const gridRef = useRef(null);

  const [typedText, setTypedText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  // Typing animation
  useEffect(() => {
    const current = TYPED_WORDS[wordIndex];
    const speed = deleting ? 60 : 110;

    const timer = setTimeout(() => {
      if (!deleting && charIndex < current.length) {
        setTypedText(current.slice(0, charIndex + 1));
        setCharIndex((c) => c + 1);
      } else if (deleting && charIndex > 0) {
        setTypedText(current.slice(0, charIndex - 1));
        setCharIndex((c) => c - 1);
      } else if (!deleting && charIndex === current.length) {
        setTimeout(() => setDeleting(true), 1400);
      } else if (deleting && charIndex === 0) {
        setDeleting(false);
        setWordIndex((i) => (i + 1) % TYPED_WORDS.length);
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [charIndex, deleting, wordIndex]);

  // GSAP entrance animations
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Grid fade in
    tl.fromTo(gridRef.current, { opacity: 0 }, { opacity: 1, duration: 1.5 });

    // Name letters stagger
    const letters = nameRef.current?.querySelectorAll('.letter');
    if (letters?.length) {
      tl.fromTo(
        letters,
        { y: 120, opacity: 0, rotateX: -90 },
        { y: 0, opacity: 1, rotateX: 0, stagger: 0.04, duration: 0.9 },
        '-=1'
      );
    }

    // Subtitle
    tl.fromTo(
      subtitleRef.current,
      { x: -40, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.7 },
      '-=0.4'
    );

    // Description
    tl.fromTo(
      descRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 },
      '-=0.3'
    );

    // CTA buttons
    tl.fromTo(
      ctaRef.current?.children,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.12, duration: 0.6 },
      '-=0.3'
    );

    // Orb + badges entrance
    tl.fromTo(
      orbRef.current,
      { scale: 0.4, opacity: 0, rotation: -30 },
      { scale: 1, opacity: 1, rotation: 0, duration: 1.1, ease: 'back.out(1.7)' },
      '-=0.8'
    );

    badgesRef.current.forEach((el, i) => {
      if (!el) return;
      tl.fromTo(
        el,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2)' },
        `-=0.4`
      );
    });

    // Orb continuous float
    gsap.to(orbRef.current, {
      y: -18,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    // Badges orbit rotation
    gsap.to('.orb-ring', {
      rotation: 360,
      duration: 18,
      repeat: -1,
      ease: 'none',
      transformOrigin: 'center center',
    });
    gsap.to('.orb-ring-2', {
      rotation: -360,
      duration: 24,
      repeat: -1,
      ease: 'none',
      transformOrigin: 'center center',
    });
  }, []);

  // Custom cursor
  useEffect(() => {
    const move = (e) => {
      if (!cursorRef.current) return;
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: 'power2.out',
      });
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  // Split name into letter spans
  const name = 'YOUR NAME';
  const letterSpans = name.split('').map((ch, i) => (
    <span key={i} className={`letter ${ch === ' ' ? styles.space : ''}`}>
      {ch === ' ' ? '\u00A0' : ch}
    </span>
  ));

  return (
    <section className={styles.hero} ref={containerRef}>
      {/* Custom cursor */}
      <div className={styles.cursor} ref={cursorRef} />

      {/* Animated grid background */}
      <div className={styles.grid} ref={gridRef}>
        <div className={styles.gridInner} />
      </div>

      {/* Noise overlay */}
      <div className={styles.noise} />

      {/* Accent blobs */}
      <div className={styles.blob1} />
      <div className={styles.blob2} />

      {/* ── Content ── */}
      <div className={styles.content}>
        {/* Left Column */}
        <div className={styles.left}>
          {/* Label */}
          <div className={styles.label}>
            <span className={styles.dot} />
            Available for work · 2025
          </div>

          {/* Big Name */}
          <h1 className={styles.name} ref={nameRef}>
            {letterSpans}
          </h1>

          {/* Role with typing */}
          <div className={styles.roleRow} ref={subtitleRef}>
            <span className={styles.roleStatic}>I build with&nbsp;</span>
            <span className={styles.typed}>{typedText}</span>
            <span className={styles.cursor2}>|</span>
          </div>

          {/* Description */}
          <p className={styles.desc} ref={descRef}>
            Crafting full-stack web experiences with MongoDB, Express, React & Node.js.
            From pixel-perfect UIs to scalable REST APIs — I bring ideas to life.
          </p>

          {/* CTA */}
          <div className={styles.cta} ref={ctaRef}>
            <a href="#projects" className={styles.btnPrimary}>
              <span>View Projects</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a href="#contact" className={styles.btnSecondary}>
              Let's Talk
            </a>
          </div>

          {/* Stats */}
          <div className={styles.stats}>
            {[
              { num: '20+', label: 'Projects Built' },
              { num: '2+', label: 'Years Coding' },
              { num: '100%', label: 'Passion' },
            ].map((s) => (
              <div key={s.label} className={styles.stat}>
                <span className={styles.statNum}>{s.num}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column — Orb visual */}
        <div className={styles.right}>
          <div className={styles.orbWrapper} ref={orbRef}>
            {/* Outer ring */}
            <div className={`${styles.ring} orb-ring`}>
              {TECH_STACK.slice(0, 3).map((tech, i) => (
                <div
                  key={tech.name}
                  className={styles.techBadge}
                  ref={(el) => (badgesRef.current[i] = el)}
                  style={{ '--color': tech.color, '--angle': `${tech.angle}deg` }}
                >
                  <span className={styles.techIcon}>{tech.icon}</span>
                  <span className={styles.techName}>{tech.name}</span>
                </div>
              ))}
            </div>

            {/* Inner ring */}
            <div className={`${styles.ring} ${styles.ring2} orb-ring-2`}>
              {TECH_STACK.slice(3).map((tech, i) => (
                <div
                  key={tech.name}
                  className={styles.techBadge}
                  ref={(el) => (badgesRef.current[i + 3] = el)}
                  style={{ '--color': tech.color, '--angle': `${tech.angle}deg` }}
                >
                  <span className={styles.techIcon}>{tech.icon}</span>
                  <span className={styles.techName}>{tech.name}</span>
                </div>
              ))}
            </div>

            {/* Center orb */}
            <div className={styles.orb}>
              <div className={styles.orbInner}>
                <span className={styles.orbText}>MERN</span>
                <span className={styles.orbSub}>Full Stack</span>
              </div>
              <div className={styles.orbGlow} />
            </div>
          </div>

          {/* Floating code snippet */}
          <div className={styles.codeCard}>
            <div className={styles.codeCardDots}>
              <span /><span /><span />
            </div>
            <pre className={styles.code}>{`const dev = {
  name: "Your Name",
  stack: ["M","E","R","N"],
  status: "🟢 Open to work"
};`}</pre>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={styles.scrollIndicator}>
        <div className={styles.scrollLine} />
        <span>Scroll to explore</span>
      </div>
    </section>
  );
}
