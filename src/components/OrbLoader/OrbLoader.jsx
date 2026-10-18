import { useEffect, useState } from 'react';
import styles from './OrbLoader.module.css';

export default function OrbLoader({ onDone }) {
    const [phase, setPhase] = useState('enter'); // enter → hold → exit

    useEffect(() => {
        // After 1.8s start exit animation
        const holdTimer = setTimeout(() => setPhase('exit'), 1800);
        // After exit animation (0.7s) call onDone
        const doneTimer = setTimeout(() => onDone?.(), 2500);
        return () => {
            clearTimeout(holdTimer);
            clearTimeout(doneTimer);
        };
    }, [onDone]);

    return (
        <div className={`${styles.overlay} ${phase === 'exit' ? styles.fadeOut : ''}`}>

            {/* Background grid */}
            <div className={styles.grid} />

            {/* Floating particles */}
            {[...Array(14)].map((_, i) => (
                <span key={i} className={styles.particle} style={{ '--i': i }} />
            ))}

            {/* Orb stage */}
            <div className={styles.orbStage}>

                {/* Outer pulse rings */}
                <div className={`${styles.ring} ${styles.ring1}`} />
                <div className={`${styles.ring} ${styles.ring2}`} />
                <div className={`${styles.ring} ${styles.ring3}`} />

                {/* Core orb */}
                <div className={styles.orb}>
                    <div className={styles.orbInner} />
                    <div className={styles.orbGlare} />
                </div>

                {/* Orbiting dot */}
                <div className={styles.orbit}>
                    <span className={styles.orbitDot} />
                </div>
            </div>

            {/* Label */}
            <p className={styles.label}>
                <span className={styles.labelChar}>N</span>
                <span className={styles.labelChar}>A</span>
                <span className={styles.labelChar}>B</span>
                <span className={styles.labelChar}>I</span>
                <span className={styles.labelChar}>L</span>
                <span className={styles.labelDot}>.</span>
            </p>
        </div>
    );
}
