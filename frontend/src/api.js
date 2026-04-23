import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const sessionService = {
  getHistory: () => api.get('/sessions/history'),
  createSession: (data) => api.post('/sessions/', data),
  startSession: (id) => api.patch(`/sessions/${id}/start`),
  pauseSession: (id, reason) => api.patch(`/sessions/${id}/pause`, { reason }),
  resumeSession: (id) => api.patch(`/sessions/${id}/resume`),
  completeSession: (id) => api.patch(`/sessions/${id}/complete`),
};

export default api;
