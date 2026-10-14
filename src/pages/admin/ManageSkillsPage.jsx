import { useState, useEffect } from 'react';
import { FiCpu, FiPlus, FiTrash2, FiX } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { getSkills, createSkill, deleteSkill } from '../../services/portfolioService';
import styles from './ManageSkillsPage.module.css';

const INITIAL_SKILL = {
  name: '',
  category: 'frontend',
  proficiency: 85,
  icon: '',
  order: 0,
};

export default function ManageSkillsPage() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(INITIAL_SKILL);
  const [submitting, setSubmitting] = useState(false);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const res = await getSkills();
      if (res.data?.success) {
        setSkills(res.data.data.skills || []);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch skills');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name) {
      toast.error('Skill name is required');
      return;
    }

    setSubmitting(true);
    try {
      await createSkill(formData);
      toast.success('Skill added successfully');
      setIsModalOpen(false);
      setFormData(INITIAL_SKILL);
      fetchSkills();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add skill');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete skill "${name}"?`)) return;
    try {
      await deleteSkill(id);
      toast.success('Skill removed');
      setSkills((prev) => prev.filter((s) => s._id !== id));
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete skill');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <div className={styles.titleArea}>
          <h1>
            <FiCpu className={styles.accent} />
            TECHNICAL <span className={styles.accent}>SKILLS</span>
          </h1>
          <p className={styles.subtitle}>
            Manage your frontend, backend, database and DevOps technical stack competencies.
          </p>
        </div>

        <button onClick={() => setIsModalOpen(true)} className={styles.createBtn}>
          <FiPlus /> ADD NEW SKILL
        </button>
      </div>

      {loading ? (
        <div className={styles.loadingState}>Loading skills...</div>
      ) : skills.length === 0 ? (
        <div className={styles.emptyState}>
          <FiCpu style={{ fontSize: '3rem', color: '#00f0ff', marginBottom: 16 }} />
          <h3>No Skills Listed</h3>
          <p>Add your first technical skill using the button above.</p>
        </div>
      ) : (
        <div className={styles.skillsGrid}>
          {skills.map((skill) => (
            <div key={skill._id} className={styles.skillCard}>
              <div className={styles.cardTop}>
                <span className={styles.skillName}>{skill.name}</span>
                <span className={styles.skillCategory}>{skill.category}</span>
              </div>

              <div className={styles.barTrack}>
                <div
                  className={styles.barFill}
                  style={{ width: `${skill.proficiency || 80}%` }}
                />
              </div>

              <div className={styles.cardFooter}>
                <span className={styles.proficiencyText}>
                  {skill.proficiency || 80}% Mastery
                </span>
                <button
                  onClick={() => handleDelete(skill._id, skill.name)}
                  className={styles.deleteBtn}
                  title="Delete"
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>ADD TECHNICAL SKILL</h2>
              <button onClick={() => setIsModalOpen(false)} className={styles.closeBtn}>
                <FiX />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label>Skill Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Next.js, Node.js, MongoDB"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className={styles.select}
                >
                  <option value="frontend">Frontend</option>
                  <option value="backend">Backend</option>
                  <option value="database">Database</option>
                  <option value="devops">DevOps / Cloud</option>
                  <option value="tools">Tools & Architecture</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label>Proficiency ({formData.proficiency}%)</label>
                <input
                  type="range"
                  min="30"
                  max="100"
                  value={formData.proficiency}
                  onChange={(e) =>
                    setFormData({ ...formData, proficiency: Number(e.target.value) })
                  }
                  style={{ accentColor: '#00f0ff', cursor: 'pointer' }}
                />
              </div>

              <div className={styles.formActions}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className={styles.cancelBtn}
                >
                  CANCEL
                </button>
                <button type="submit" disabled={submitting} className={styles.saveBtn}>
                  {submitting ? 'SAVING...' : 'SAVE SKILL'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
