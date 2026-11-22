import { useEffect, useState } from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { count } from '../api/notifications'
export default function Navbar() {
  const { token, role, userId, signOut } = useAuth()
  const nav = useNavigate(); const loc = useLocation(); const [n, setN] = useState(0)
  useEffect(() => { if (role === 'PARTICIPANT') count(userId).then(d => setN(typeof d === 'number' ? d : d.count ?? 0)).catch(() => {}) }, [role, userId, loc.pathname])
  if (!token) return null
  const out = () => { signOut(); nav('/login') }
  return <nav className="nav"><span className="brand">EventLink</span>
    {role === 'ADMIN' ? <>
      <NavLink to="/admin/events">Événements</NavLink><NavLink to="/admin/inscriptions">Inscriptions</NavLink>
      <NavLink to="/admin/participants">Participants</NavLink><NavLink to="/admin/commentaires">Commentaires</NavLink>
    </> : <>
      <NavLink to="/events">Événements</NavLink><NavLink to="/my-registrations">Mes inscriptions</NavLink>
      <NavLink to="/notifications">Notifications{n > 0 && <span className="count">{n}</span>}</NavLink>
    </>}
    <button onClick={out}>Déconnexion</button></nav>
}
