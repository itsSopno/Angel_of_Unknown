import { useState } from 'react';
import { FiSend, FiCheck, FiMail, FiMapPin } from 'react-icons/fi';
import { FaGithub, FaLinkedinIn, FaFacebookF } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { sendMessage } from '../../services/portfolioService';
import styles from './ContactSection.module.css';

const INITIAL = { name: '', email: '', subject: '', message: '' };

export default function ContactSection() {
  const [form, setForm] = useState(INITIAL);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setSending(true);
    try {
      await sendMessage(form);
      setSent(true);
      toast.success('Message sent successfully!');
      setForm(INITIAL);
    } catch (err) {
      const msg = err.response?.data?.message || 'Something went wrong. Please try again.';
      toast.error(msg);
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className={styles.contact}>
      {/* ── Heading ─────────────────────────────────────────── */}
      <div className={styles.introHead}>
        <h2 className={styles.introTitle}>GET IN TOUCH</h2>
      </div>
      <div className={styles.divider} />

      {/* ── Grid ───────────────────────────────────────────── */}
      <div className={styles.grid}>
        {/* Left — Info */}
        <div className={styles.left}>
          <p className={styles.subtitle}>
            Got a project idea, a question, or just want to say hello?
            <br />
            I'd love to hear from you. Drop me a message and I'll get back
            to you <span className={styles.subtitleAccent}>as soon as possible</span>.
          </p>

          <div className={styles.infoList}>
            <div className={styles.infoItem}>
              <span className={styles.infoIcon}><FiMail /></span>
              nahidthedev@gmail.com
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoIcon}><FiMapPin /></span>
              Dhaka, Bangladesh
            </div>
          </div>

          <div className={styles.socialRow}>
            <a
              href="https://github.com/nahid-thedev"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              title="GitHub"
            >
              <FaGithub />
            </a>
            <a
              href="https://linkedin.com/in/nahid-thedev"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              title="LinkedIn"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="https://facebook.com/nahid.thedev"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              title="Facebook"
            >
              <FaFacebookF />
            </a>
          </div>
        </div>

        {/* Right — Form */}
        <div className={styles.formCard}>
          {sent ? (
            /* ── Success state ──────────────────────────────── */
            <div className={styles.successMsg}>
              <div className={styles.successIcon}><FiCheck /></div>
              <p className={styles.successText}>
                <span className={styles.successTextHighlight}>
                  Thank you for reaching out!
                </span>
                <br />
                Your message has been delivered. I'll respond shortly.
              </p>
              <button
                type="button"
                className={styles.resetBtn}
                onClick={() => setSent(false)}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            /* ── Contact form ───────────────────────────────── */
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formRow}>
                <div className={styles.fieldGroup}>
                  <label className={styles.label} htmlFor="c-name">
                    Name *
                  </label>
                  <input
                    id="c-name"
                    className={styles.input}
                    type="text"
                    name="name"
                    placeholder="Your name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={styles.fieldGroup}>
                  <label className={styles.label} htmlFor="c-email">
                    Email *
                  </label>
                  <input
                    id="c-email"
                    className={styles.input}
                    type="email"
                    name="email"
                    placeholder="you@email.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label} htmlFor="c-subject">
                  Subject
                </label>
                <input
                  id="c-subject"
                  className={styles.input}
                  type="text"
                  name="subject"
                  placeholder="What's this about?"
                  value={form.subject}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label} htmlFor="c-message">
                  Message *
                </label>
                <textarea
                  id="c-message"
                  className={styles.textarea}
                  name="message"
                  placeholder="Tell me about your project or idea..."
                  value={form.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className={styles.submitBtn}
                disabled={sending}
              >
                {sending ? (
                  <>
                    <span className={styles.spinner} />
                    SENDING…
                  </>
                ) : (
                  <>
                    SEND MESSAGE
                    <FiSend className={styles.btnIcon} />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
