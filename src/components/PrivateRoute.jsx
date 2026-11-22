import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
export default function PrivateRoute({ role, children }) {
  const { token, role: r } = useAuth()
  if (!token) return <Navigate to="/login" replace />
  if (role && r !== role) return <Navigate to={r === 'ADMIN' ? '/admin/events' : '/events'} replace />
  return children
}
