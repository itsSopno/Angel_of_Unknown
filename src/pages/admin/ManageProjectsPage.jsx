import { useState, useEffect } from 'react';
import { 
  FiPlus, 
  FiEdit2, 
  FiTrash2, 
  FiExternalLink, 
  FiGithub, 
  FiX, 
  FiCheck,
  FiFolder
} from 'react-icons/fi';
import toast from 'react-hot-toast';
import { 
  getProjects, 
  createProject, 
  updateProject, 
  deleteProject 
} from '../../services/portfolioService';
import styles from './ManageProjectsPage.module.css';

const INITIAL_FORM = {
  title: '',
  description: '',
  category: 'fullstack',
  image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
  tags: '',
  tech: '',
  date: new Date().getFullYear().toString(),
  problems: '',
  solutions: '',
  challenges: '',
  liveUrl: '',
  githubClient: '',
  githubServer: '',
  featured: false,
};

export default function ManageProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);

  // Fetch all projects
  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await getProjects();
      if (res.data?.success) {
        setProjects(res.data.data.projects || []);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData(INITIAL_FORM);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (project) => {
    setEditingId(project._id);
    setFormData({
      title: project.title || '',
      description: project.description || '',
      category: project.category || 'fullstack',
      image: project.image || '',
      tags: Array.isArray(project.tags) ? project.tags.join(', ') : '',
      tech: Array.isArray(project.tech) ? project.tech.join(', ') : '',
      date: project.date || '',
      problems: project.problems || '',
      solutions: project.solutions || '',
      challenges: project.challenges || '',
      liveUrl: project.liveUrl || '',
      githubClient: project.githubClient || '',
      githubServer: project.githubServer || '',
      featured: Boolean(project.featured),
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData(INITIAL_FORM);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      toast.error('Title and description are required');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        ...formData,
        tags: formData.tags
          ? formData.tags.split(',').map((t) => t.trim()).filter(Boolean)
          : [],
        tech: formData.tech
          ? formData.tech.split(',').map((t) => t.trim()).filter(Boolean)
          : ['React', 'Node.js'],
      };

      if (editingId) {
        await updateProject(editingId, payload);
        toast.success('Project updated successfully');
      } else {
        await createProject(payload);
        toast.success('Project created successfully');
      }

      handleCloseModal();
      fetchProjects();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save project');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }

    try {
      await deleteProject(id);
      toast.success('Project deleted');
      setProjects((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete project');
    }
  };

  return (
    <div className={styles.container}>
      {/* ── Top Header ────────────────────────────────────────── */}
      <div className={styles.headerRow}>
        <div className={styles.titleArea}>
          <h1>
            <FiFolder className={styles.accent} />
            PROJECTS <span className={styles.accent}>VAULT</span>
          </h1>
          <p className={styles.subtitle}>
            Manage and deploy your portfolio showcase projects to the live database.
          </p>
        </div>

        <button onClick={handleOpenCreate} className={styles.createBtn}>
          <FiPlus /> ADD NEW PROJECT
        </button>
      </div>

      {/* ── Projects Display ──────────────────────────────────── */}
      {loading ? (
        <div className={styles.loadingState}>
          <div className={styles.loadingSpinner} />
          <p>Syncing projects with live database...</p>
        </div>
      ) : projects.length === 0 ? (
        <div className={styles.emptyState}>
          <FiFolder style={{ fontSize: '3rem', color: '#cdff00', marginBottom: 16 }} />
          <h3>No Projects Registered Yet</h3>
          <p>Click "Add New Project" above to create your first portfolio showcase.</p>
        </div>
      ) : (
        <div className={styles.projectsGrid}>
          {projects.map((proj) => (
            <div key={proj._id} className={styles.projectCard}>
              <div className={styles.cardImageWrap}>
                <img
                  src={proj.image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'}
                  alt={proj.title}
                  className={styles.cardImage}
                />
                {proj.featured && (
                  <span className={styles.featuredBadge}>FEATURED</span>
                )}
              </div>

              <div className={styles.cardBody}>
                <div className={styles.cardMeta}>
                  <span className={styles.categoryTag}>{proj.category}</span>
                  <span className={styles.dateTag}>{proj.date || '2026'}</span>
                </div>

                <h3 className={styles.projectTitle}>{proj.title}</h3>
                <p className={styles.projectDesc}>{proj.description}</p>

                {proj.tags && proj.tags.length > 0 && (
                  <div className={styles.tagPills}>
                    {proj.tags.map((tag, i) => (
                      <span key={i} className={styles.tagPill}>
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className={styles.cardFooter}>
                  <div className={styles.links}>
                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className={styles.linkIcon}
                        title="Live Preview"
                      >
                        <FiExternalLink />
                      </a>
                    )}
                    {proj.githubClient && (
                      <a
                        href={proj.githubClient}
                        target="_blank"
                        rel="noreferrer"
                        className={styles.linkIcon}
                        title="Client Code"
                      >
                        <FiGithub />
                      </a>
                    )}
                  </div>

                  <div className={styles.cardActions}>
                    <button
                      onClick={() => handleOpenEdit(proj)}
                      className={styles.editBtn}
                      title="Edit"
                    >
                      <FiEdit2 /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(proj._id, proj.title)}
                      className={styles.deleteBtn}
                      title="Delete"
                    >
                      <FiTrash2 /> Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Create / Edit Modal ───────────────────────────────── */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>{editingId ? 'EDIT PROJECT' : 'CREATE NEW PROJECT'}</h2>
              <button onClick={handleCloseModal} className={styles.closeBtn}>
                <FiX />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className={styles.formGrid}>
                {/* Title */}
                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label>Project Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className={styles.input}
                    placeholder="e.g. Nexus AI SaaS Dashboard"
                  />
                </div>

                {/* Category */}
                <div className={styles.formGroup}>
                  <label>Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className={styles.select}
                  >
                    <option value="fullstack">Fullstack</option>
                    <option value="frontend">Frontend</option>
                    <option value="backend">Backend</option>
                    <option value="mobile">Mobile</option>
                    <option value="ui-ux">UI / UX</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Year / Date */}
                <div className={styles.formGroup}>
                  <label>Timeline / Date *</label>
                  <input
                    type="text"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className={styles.input}
                    placeholder="e.g. 2026 // Q1"
                  />
                </div>

                {/* Description */}
                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label>Description *</label>
                  <textarea
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className={styles.textarea}
                    placeholder="Overview of the project..."
                  />
                </div>

                {/* Image URL */}
                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label>Banner Image URL</label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className={styles.input}
                    placeholder="https://..."
                  />
                </div>

                {/* Tags */}
                <div className={styles.formGroup}>
                  <label>Tags (Comma separated)</label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    className={styles.input}
                    placeholder="MERN, Tailwind, WebSockets"
                  />
                </div>

                {/* Tech Stack */}
                <div className={styles.formGroup}>
                  <label>Tech Stack (Comma separated) *</label>
                  <input
                    type="text"
                    required
                    value={formData.tech}
                    onChange={(e) => setFormData({ ...formData, tech: e.target.value })}
                    className={styles.input}
                    placeholder="React, Express, MongoDB, Node.js"
                  />
                </div>

                {/* Live URL */}
                <div className={styles.formGroup}>
                  <label>Live URL</label>
                  <input
                    type="url"
                    value={formData.liveUrl}
                    onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                    className={styles.input}
                    placeholder="https://myproject.com"
                  />
                </div>

                {/* GitHub Client */}
                <div className={styles.formGroup}>
                  <label>GitHub Client Repo</label>
                  <input
                    type="url"
                    value={formData.githubClient}
                    onChange={(e) => setFormData({ ...formData, githubClient: e.target.value })}
                    className={styles.input}
                    placeholder="https://github.com/..."
                  />
                </div>

                {/* Problems */}
                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label>Problem Statement *</label>
                  <textarea
                    required
                    value={formData.problems}
                    onChange={(e) => setFormData({ ...formData, problems: e.target.value })}
                    className={styles.textarea}
                    placeholder="What problem does this project solve?"
                  />
                </div>

                {/* Solutions */}
                <div className={styles.formGroup}>
                  <label>Solution Architecture *</label>
                  <textarea
                    required
                    value={formData.solutions}
                    onChange={(e) => setFormData({ ...formData, solutions: e.target.value })}
                    className={styles.textarea}
                    placeholder="How was it implemented?"
                  />
                </div>

                {/* Challenges */}
                <div className={styles.formGroup}>
                  <label>Key Challenges *</label>
                  <textarea
                    required
                    value={formData.challenges}
                    onChange={(e) => setFormData({ ...formData, challenges: e.target.value })}
                    className={styles.textarea}
                    placeholder="Technical obstacles encountered..."
                  />
                </div>

                {/* Featured Checkbox */}
                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label className={styles.checkboxGroup}>
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    />
                    <span>Feature this project on top of the portfolio</span>
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className={styles.formActions}>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className={styles.cancelBtn}
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className={styles.saveBtn}
                >
                  {submitting ? 'SAVING...' : editingId ? 'UPDATE PROJECT' : 'PUBLISH PROJECT'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
