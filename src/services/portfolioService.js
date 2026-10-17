import api from './api';

// ── Projects ─────────────────────────────────────────
export const getProjects = () => api.get('/projects/project');
export const getProjectBySlug = (slug) => api.get(`/projects/project/${slug}`);
export const createProject = (data) => api.post('/projects/project', data);
export const updateProject = (id, data) => api.put(`/projects/project/${id}`, data);
export const deleteProject = (id) => api.delete(`/projects/project/${id}`);

// ── Skills ───────────────────────────────────────────
export const getSkills = () => api.get('/skills/skill');
export const createSkill = (data) => api.post('/skills/skill', data);
export const updateSkill = (id, data) => api.put(`/skills/skill/${id}`, data);
export const deleteSkill = (id) => api.delete(`/skills/skill/${id}`);

// ── Contact ──────────────────────────────────────────
export const sendMessage = (data) => api.post('/contact/contact', data);
export const getMessages = () => api.get('/contact/contact');
export const deleteMessage = (id) => api.delete(`/contact/contact/${id}`);

// ── Auth ─────────────────────────────────────────────
export const loginAdmin = (data) => api.post('/auth/login', data);
export const getProfile = () => api.get('/auth/me');
export const changePassword = (data) => api.put('/auth/change-password', data);
