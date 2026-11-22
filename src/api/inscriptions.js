import api from './client'
export const create = b => api.post('/api/inscriptions', b).then(r => r.data)
export const byUser = id => api.get(`/api/inscriptions/user/${id}`).then(r => r.data)
export const byEvent = id => api.get(`/api/inscriptions/evenement/${id}`).then(r => r.data)
export const valider = id => api.put(`/api/inscriptions/${id}/valider`)
export const refuser = id => api.put(`/api/inscriptions/${id}/refuser`)
