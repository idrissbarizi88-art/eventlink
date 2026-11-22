import api from './client'
export const create = b => api.post('/api/commentaires', b).then(r => r.data)
export const byEvent = id => api.get(`/api/commentaires/evenement/${id}`).then(r => r.data)
export const update = (id, b) => api.put(`/api/commentaires/${id}`, b).then(r => r.data)
export const removeOwn = (id, uid) => api.delete(`/api/commentaires/${id}/user/${uid}`)
export const removeAdmin = id => api.delete(`/api/commentaires/${id}/admin`)
