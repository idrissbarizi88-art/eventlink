import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../../api/auth'
import { errMsg } from '../../api/client'
import { Alert } from '../../components/ui'
const F = [['nom', 'Nom', 'text'], ['prenom', 'Prénom', 'text'], ['email', 'Email', 'email'], ['password', 'Mot de passe', 'password']]
export default function Register() {
  const [f, setF] = useState({ nom: '', prenom: '', email: '', password: '' }); const [err, setErr] = useState(''); const [busy, setBusy] = useState(false)
  const nav = useNavigate()
  const submit = async e => {
    e.preventDefault(); setErr(''); setBusy(true)
    try { await register(f); nav('/login') } catch (x) { setErr(errMsg(x)) } finally { setBusy(false) }
  }
  return <form className="card auth" onSubmit={submit}><h1>Créer un compte</h1><Alert msg={err} />
    {F.map(([k, l, t]) => <div key={k}><label htmlFor={k}>{l}</label><input id={k} type={t} required value={f[k]} onChange={e => setF({ ...f, [k]: e.target.value })} /></div>)}
    <p><button className="btn" disabled={busy}>{busy ? 'Création…' : 'Créer mon compte'}</button></p>
    <p className="muted">Déjà inscrit ? <Link to="/login">Se connecter</Link></p></form>
}
