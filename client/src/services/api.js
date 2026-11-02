/**
 * API Service for Lernen Frontend
 * Uses native fetch with credentials: 'include' for secure httpOnly JWT cookies.
 */

const API_BASE = '/api';

async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    credentials: 'include', // Ensures httpOnly JWT cookies are sent with requests
  };

  if (config.body && typeof config.body === 'object' && !(config.body instanceof FormData)) {
    config.body = JSON.stringify(config.body);
  }

  const response = await fetch(url, config);
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(data.message || `Request failed with status ${response.status}`);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

export const api = {
  get: (endpoint, params = {}) => {
    const query = new URLSearchParams(
      Object.entries(params).filter(([_, v]) => v !== undefined && v !== null && v !== '')
    ).toString();
    const url = query ? `${endpoint}?${query}` : endpoint;
    return request(url, { method: 'GET' });
  },
  post: (endpoint, body) => request(endpoint, { method: 'POST', body }),
  patch: (endpoint, body) => request(endpoint, { method: 'PATCH', body }),
  delete: (endpoint) => request(endpoint, { method: 'DELETE' }),
};

// Auth API endpoints
export const authApi = {
  register: (payload) => api.post('/auth/register', payload),
  login: (payload) => api.post('/auth/login', payload),
  logout: () => api.post('/auth/logout', {}),
  sendOtp: (payload) => api.post('/auth/send-otp', payload),
  verifyOtp: (payload) => api.post('/auth/verify-otp', payload),
  resetPassword: (payload) => api.post('/auth/reset-password', payload),
  verifyEmail: (payload) => api.post('/auth/verify-email', payload),
  resendVerification: (payload) => api.post('/auth/resend-verification', payload),
  getMe: () => api.get('/auth/me'),
  updateSettings: (settings) => api.patch('/auth/settings', settings),
};

// Words & Dictionary API endpoints
export const wordsApi = {
  getWords: (params) => api.get('/words', params),
  getWordById: (id) => api.get(`/words/${id}`),
  toggleSaveWord: (id, status) => api.post(`/words/${id}/save`, { status }),
  getSavedWordIds: () => api.get('/words/user/saved-ids'),
  getReviewQueue: () => api.get('/words/review/queue'),
  submitReview: (id, rating) => api.post(`/words/${id}/review`, { rating }),
};

// Grammar API endpoints
export const grammarApi = {
  getTopics: (params) => api.get('/grammar', params),
  getTopicBySlug: (slug) => api.get(`/grammar/${slug}`),
};
