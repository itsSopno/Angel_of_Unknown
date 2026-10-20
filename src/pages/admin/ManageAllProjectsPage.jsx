import { useState, useEffect } from 'react';
import {
    FiPlus,
    FiEdit2,
    FiTrash2,
    FiExternalLink,
    FiGithub,
    FiX,
    FiLayers,
} from 'react-icons/fi';
import toast from 'react-hot-toast';
import {
    getAllProjects,
    createAllProject,
    updateAllProject,
    deleteAllProject,
} from '../../services/portfolioService';
import styles from './ManageAllProjectsPage.module.css';

const INITIAL_FORM = {
    type: 'Web',
    title: '',
    detail: '',
    tech: '',
    speciality: '',
    errorFaced: '',
    solutionYouFound: '',
    image: '',
    liveUrl: '',
    githubUrl: '',
};

const PROJECT_TYPES = ['Web', 'Mobile', 'Desktop', 'API', 'AI/ML', 'Other'];

export default function ManageAllProjectsPage() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState(INITIAL_FORM);
    const [submitting, setSubmitting] = useState(false);
    const [filterType, setFilterType] = useState('all');

    const fetchProjects = async () => {
        try {
            setLoading(true);
            const params = filterType !== 'all' ? { type: filterType } : {};
            const res = await getAllProjects(params);
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
    }, [filterType]);

    const handleOpenCreate = () => {
        setEditingId(null);
        setFormData(INITIAL_FORM);
        setIsModalOpen(true);
    };

    const handleOpenEdit = (project) => {
        setEditingId(project._id);
        setFormData({
            type: project.type || 'Web',
            title: project.title || '',
            detail: project.detail || '',
            tech: Array.isArray(project.tech) ? project.tech.join(', ') : '',
            speciality: project.speciality || '',
            errorFaced: project.errorFaced || '',
            solutionYouFound: project.solutionYouFound || '',
            image: project.image || '',
            liveUrl: project.liveUrl || '',
            githubUrl: project.githubUrl || '',
        });
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingId(null);
        setFormData(INITIAL_FORM);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title || !formData.detail) {
            toast.error('Title and detail are required');
            return;
        }

        setSubmitting(true);
        try {
            const payload = {
                ...formData,
                tech: formData.tech
                    ? formData.tech.split(',').map((t) => t.trim()).filter(Boolean)
                    : [],
            };

            if (editingId) {
                await updateAllProject(editingId, payload);
                toast.success('Project updated!');
            } else {
                await createAllProject(payload);
                toast.success('Project created!');
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
        if (!window.confirm(`Delete "${title}"?`)) return;
        try {
            await deleteAllProject(id);
            toast.success('Project deleted');
            setProjects((prev) => prev.filter((p) => p._id !== id));
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to delete');
        }
    };

    return (
        <div className={styles.container}>
            {/* Header */}
            <div className={styles.headerRow}>
                <div className={styles.titleArea}>
                    <h1>
                        <FiLayers className={styles.accent} />
                        ALL <span className={styles.accent}>PROJECTS</span>
                    </h1>
                    <p className={styles.subtitle}>
                        Document every project you have built — detailed breakdown with tech, errors & solutions.
                    </p>
                </div>
                <button onClick={handleOpenCreate} className={styles.createBtn}>
                    <FiPlus /> ADD PROJECT
                </button>
            </div>

            {/* Filter Tabs */}
            <div className={styles.filterRow}>
                {['all', ...PROJECT_TYPES].map((t) => (
                    <button
                        key={t}
                        onClick={() => setFilterType(t)}
                        className={`${styles.filterBtn} ${filterType === t ? styles.activeFilter : ''}`}
                    >
                        {t.toUpperCase()}
                    </button>
                ))}
            </div>

            {/* Project Cards */}
            {loading ? (
                <div className={styles.loadingState}>
                    <div className={styles.loadingSpinner} />
                    <p>Loading projects...</p>
                </div>
            ) : projects.length === 0 ? (
                <div className={styles.emptyState}>
                    <FiLayers style={{ fontSize: '3rem', color: '#cdff00', marginBottom: 16 }} />
                    <h3>No Projects Found</h3>
                    <p>Click "ADD PROJECT" to document your first project.</p>
                </div>
            ) : (
                <div className={styles.projectsGrid}>
                    {projects.map((proj) => (
                        <div key={proj._id} className={styles.projectCard}>
                            {proj.image && (
                                <div className={styles.cardImageWrap}>
                                    <img src={proj.image} alt={proj.title} className={styles.cardImage} />
                                </div>
                            )}
                            <div className={styles.cardBody}>
                                <div className={styles.cardMeta}>
                                    <span className={styles.typeTag}>{proj.type}</span>
                                    <span className={styles.dateTag}>
                                        {new Date(proj.createdAt).getFullYear()}
                                    </span>
                                </div>

                                <h3 className={styles.projectTitle}>{proj.title}</h3>
                                <p className={styles.projectDetail}>{proj.detail}</p>

                                {proj.tech && proj.tech.length > 0 && (
                                    <div className={styles.techPills}>
                                        {proj.tech.map((t, i) => (
                                            <span key={i} className={styles.techPill}>{t}</span>
                                        ))}
                                    </div>
                                )}

                                {proj.speciality && (
                                    <div className={styles.infoRow}>
                                        <span className={styles.infoLabel}>Speciality</span>
                                        <span className={styles.infoValue}>{proj.speciality}</span>
                                    </div>
                                )}

                                <div className={styles.cardFooter}>
                                    <div className={styles.links}>
                                        {proj.liveUrl && (
                                            <a href={proj.liveUrl} target="_blank" rel="noreferrer" className={styles.linkIcon} title="Live">
                                                <FiExternalLink />
                                            </a>
                                        )}
                                        {proj.githubUrl && (
                                            <a href={proj.githubUrl} target="_blank" rel="noreferrer" className={styles.linkIcon} title="GitHub">
                                                <FiGithub />
                                            </a>
                                        )}
                                    </div>

                                    <div className={styles.cardActions}>
                                        <button onClick={() => handleOpenEdit(proj)} className={styles.editBtn}>
                                            <FiEdit2 /> Edit
                                        </button>
                                        <button onClick={() => handleDelete(proj._id, proj.title)} className={styles.deleteBtn}>
                                            <FiTrash2 /> Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Create / Edit Modal */}
            {isModalOpen && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <div className={styles.modalHeader}>
                            <h2>{editingId ? 'EDIT PROJECT' : 'ADD NEW PROJECT'}</h2>
                            <button onClick={handleCloseModal} className={styles.closeBtn}><FiX /></button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className={styles.formGrid}>

                                {/* Type */}
                                <div className={styles.formGroup}>
                                    <label>Project Type *</label>
                                    <select name="type" value={formData.type} onChange={handleChange} className={styles.select}>
                                        {PROJECT_TYPES.map((t) => (
                                            <option key={t} value={t}>{t}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Title */}
                                <div className={styles.formGroup}>
                                    <label>Project Title *</label>
                                    <input
                                        type="text" name="title" required
                                        value={formData.title} onChange={handleChange}
                                        className={styles.input} placeholder="e.g. Portfolio Backend API"
                                    />
                                </div>

                                {/* Detail */}
                                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                                    <label>Project Detail *</label>
                                    <textarea
                                        name="detail" required
                                        value={formData.detail} onChange={handleChange}
                                        className={styles.textarea} placeholder="Describe what this project does..."
                                    />
                                </div>

                                {/* Tech */}
                                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                                    <label>Tech Stack (comma separated)</label>
                                    <input
                                        type="text" name="tech"
                                        value={formData.tech} onChange={handleChange}
                                        className={styles.input} placeholder="React, Node.js, MongoDB..."
                                    />
                                </div>

                                {/* Speciality */}
                                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                                    <label>Speciality / Unique Feature</label>
                                    <input
                                        type="text" name="speciality"
                                        value={formData.speciality} onChange={handleChange}
                                        className={styles.input} placeholder="What makes this project special?"
                                    />
                                </div>

                                {/* Error Faced */}
                                <div className={styles.formGroup}>
                                    <label>Error / Problem Faced</label>
                                    <textarea
                                        name="errorFaced"
                                        value={formData.errorFaced} onChange={handleChange}
                                        className={styles.textarea} placeholder="Key errors or blockers faced..."
                                    />
                                </div>

                                {/* Solution */}
                                <div className={styles.formGroup}>
                                    <label>Solution You Found</label>
                                    <textarea
                                        name="solutionYouFound"
                                        value={formData.solutionYouFound} onChange={handleChange}
                                        className={styles.textarea} placeholder="How did you resolve it?"
                                    />
                                </div>

                                {/* Image */}
                                <div className={styles.formGroup}>
                                    <label>Image URL</label>
                                    <input
                                        type="url" name="image"
                                        value={formData.image} onChange={handleChange}
                                        className={styles.input} placeholder="https://..."
                                    />
                                </div>

                                {/* Live URL */}
                                <div className={styles.formGroup}>
                                    <label>Live URL</label>
                                    <input
                                        type="url" name="liveUrl"
                                        value={formData.liveUrl} onChange={handleChange}
                                        className={styles.input} placeholder="https://..."
                                    />
                                </div>

                                {/* GitHub URL */}
                                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                                    <label>GitHub URL</label>
                                    <input
                                        type="url" name="githubUrl"
                                        value={formData.githubUrl} onChange={handleChange}
                                        className={styles.input} placeholder="https://github.com/..."
                                    />
                                </div>

                            </div>

                            <div className={styles.formActions}>
                                <button type="button" onClick={handleCloseModal} className={styles.cancelBtn}>CANCEL</button>
                                <button type="submit" disabled={submitting} className={styles.saveBtn}>
                                    {submitting ? 'SAVING...' : editingId ? 'UPDATE' : 'PUBLISH'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
