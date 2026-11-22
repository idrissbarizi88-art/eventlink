import api from './client'
export const participants = () => api.get('/api/users/participants').then(r => r.data)
export const remove = id => api.delete(`/api/users/${id}`)
