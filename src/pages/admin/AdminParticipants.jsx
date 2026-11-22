import { useEffect, useState } from 'react'
import { participants, remove } from '../../api/users'
import { errMsg } from '../../api/client'
import { Alert, Spinner } from '../../components/ui'
export default function AdminParticipants() {
  const [l, setL] = useState([]); const [err, setErr] = useState(''); const [load, setLoad] = useState(true)
  const refresh = () => participants().then(setL).catch(x => setErr(errMsg(x))).finally(() => setLoad(false))
  useEffect(() => { refresh() }, [])
  const del = async u => { if (!confirm(`Supprimer ${u.prenom} ${u.nom} ?`)) return; try { await remove(u.id); refresh() } catch (x) { setErr(errMsg(x)) } }
  return <main className="wrap"><h1>Participants</h1><Alert msg={err} />
    {load ? <Spinner /> : <div className="tablewrap"><table><thead><tr><th>Nom</th><th>Email</th><th></th></tr></thead><tbody>
      {l.map(u => <tr key={u.id}><td>{u.prenom} {u.nom}</td><td>{u.email}</td><td><button className="btn sm" onClick={() => del(u)}>Supprimer</button></td></tr>)}
      {!l.length && <tr><td colSpan="3" className="muted">Aucun participant.</td></tr>}</tbody></table></div>}</main>
}
