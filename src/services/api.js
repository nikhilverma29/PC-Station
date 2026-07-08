/**
 * PC Station — API Service Layer
 *
 * Central file for all backend API calls.
 * All functions return data directly or throw an error.
 */

const BASE_URL = 'http://localhost:5000/api';

// ── Helper ─────────────────────────────────────────────────

async function request(endpoint, options = {}) {
  const token = localStorage.getItem('pc-station-token');

  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const res = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Something went wrong.');
  }

  return data;
}

// ── Products ───────────────────────────────────────────────

export const productsAPI = {
  getAll: () => request('/products'),
  getByCategory: (category) => request(`/products/${category}`),
  getById: (id) => request(`/products/item/${id}`),
};

// ── Auth ───────────────────────────────────────────────────

export const authAPI = {
  register: (name, email, password) =>
    request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    }),

  login: (email, password) =>
    request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  getMe: () => request('/auth/me'),
};

// ── Builds ─────────────────────────────────────────────────

export const buildsAPI = {
  getAll: () => request('/builds'),

  create: (name, selections, totalPrice) =>
    request('/builds', {
      method: 'POST',
      body: JSON.stringify({ name, selections, totalPrice }),
    }),

  update: (id, name, selections, totalPrice) =>
    request(`/builds/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ name, selections, totalPrice }),
    }),

  delete: (id) =>
    request(`/builds/${id}`, { method: 'DELETE' }),
};
