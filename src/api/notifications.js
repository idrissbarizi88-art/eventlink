import api from './client'
export const byUser = id => api.get(`/api/notifications/user/${id}`).then(r => r.data)
export const count = id => api.get(`/api/notifications/user/${id}/count`).then(r => r.data)
export const markRead = id => api.put(`/api/notifications/${id}/lue`)
export const markAllRead = uid => api.put(`/api/notifications/user/${uid}/toutes-lues`)
