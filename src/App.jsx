import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Navbar from './components/Navbar'
import PrivateRoute from './components/PrivateRoute'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import EventList from './pages/participant/EventList'
import EventDetail from './pages/participant/EventDetail'
import MyRegistrations from './pages/participant/MyRegistrations'
import Notifications from './pages/participant/Notifications'
import AdminEvents from './pages/admin/AdminEvents'
import AdminEventForm from './pages/admin/AdminEventForm'
import AdminInscriptions from './pages/admin/AdminInscriptions'
import AdminParticipants from './pages/admin/AdminParticipants'
import AdminCommentaires from './pages/admin/AdminCommentaires'
const P = ({ children }) => <PrivateRoute role="PARTICIPANT">{children}</PrivateRoute>
const A = ({ children }) => <PrivateRoute role="ADMIN">{children}</PrivateRoute>
export default function App() {
  const { token, role } = useAuth()
  return <><Navbar /><Routes>
    <Route path="/login" element={<Login />} /><Route path="/register" element={<Register />} />
    <Route path="/events" element={<P><EventList /></P>} />
    <Route path="/events/:id" element={<P><EventDetail /></P>} />
    <Route path="/my-registrations" element={<P><MyRegistrations /></P>} />
    <Route path="/notifications" element={<P><Notifications /></P>} />
    <Route path="/admin/events" element={<A><AdminEvents /></A>} />
    <Route path="/admin/events/new" element={<A><AdminEventForm /></A>} />
    <Route path="/admin/events/:id/edit" element={<A><AdminEventForm /></A>} />
    <Route path="/admin/inscriptions" element={<A><AdminInscriptions /></A>} />
    <Route path="/admin/participants" element={<A><AdminParticipants /></A>} />
    <Route path="/admin/commentaires" element={<A><AdminCommentaires /></A>} />
    <Route path="*" element={<Navigate to={!token ? '/login' : role === 'ADMIN' ? '/admin/events' : '/events'} replace />} />
  </Routes></>
}
