import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../../api/auth'
import { errMsg } from '../../api/client'
import { useAuth } from '../../context/AuthContext'
import { Alert } from '../../components/ui'
export default function Login() {
  const [f, setF] = useState({ email: '', password: '' }); const [err, setErr] = useState(''); const [busy, setBusy] = useState(false)
  const { signIn } = useAuth(); const nav = useNavigate()
  const submit = async e => {
    e.preventDefault(); setErr(''); setBusy(true)
    try { const d = await login(f); signIn(d); nav(d.role === 'ADMIN' ? '/admin/events' : '/events') }
    catch (x) { setErr(errMsg(x)) } finally { setBusy(false) }
  }
  return <form className="card auth" onSubmit={submit}><h1>Connexion</h1><Alert msg={err} />
    <label htmlFor="e">Email</label><input id="e" type="email" required value={f.email} onChange={e => setF({ ...f, email: e.target.value })} />
    <label htmlFor="p">Mot de passe</label><input id="p" type="password" required value={f.password} onChange={e => setF({ ...f, password: e.target.value })} />
    <p><button className="btn" disabled={busy}>{busy ? 'Connexion…' : 'Se connecter'}</button></p>
    <p className="muted">Pas de compte ? <Link to="/register">Créer un compte</Link></p></form>
}
