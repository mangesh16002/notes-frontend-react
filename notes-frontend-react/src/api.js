import axios from 'axios';

// Set this in Vercel Project Settings → Environment Variables
// Example: https://your-backend.onrender.com/api
const API_BASE = import.meta.env.VITE_API_BASE;

export const api = axios.create({ baseURL: API_BASE });

export const listNotes = () => api.get('/notes');
export const createNote = (payload) => api.post('/notes', payload);
export const updateNote = (id, payload) => api.put(`/notes/${id}`, payload);
export const deleteNote = (id) => api.delete(`/notes/${id}`);
export const shareNote = (id) => api.post(`/notes/${id}/share`);
export const getPublicNote = (token) => api.get(`/public/${token}`);
