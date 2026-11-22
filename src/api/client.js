import axios from 'axios'
const api = axios.create({ baseURL: 'http://localhost:8080' })
api.interceptors.request.use(c => { const t = localStorage.getItem('token'); if (t) c.headers.Authorization = `Bearer ${t}`; return c })
api.interceptors.response.use(r => r, e => {
  if (e.response?.status === 401 && !e.config.url.includes('/api/auth/')) { localStorage.clear(); window.location.href = '/login' }
  return Promise.reject(e)
})
export const errMsg = e => e.response?.data?.message || (e.response ? `Erreur ${e.response.status}` : 'Serveur injoignable')
export default api
