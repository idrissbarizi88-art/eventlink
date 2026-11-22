import api from './client'
export const login = b => api.post('/api/auth/login', b).then(r => r.data)
export const register = b => api.post('/api/auth/register', b).then(r => r.data)
