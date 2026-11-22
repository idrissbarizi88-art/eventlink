import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAll, remove } from '../../api/events'
import { errMsg } from '../../api/client'
import { Alert, Spinner, fmt } from '../../components/ui'
export default function AdminEvents() {
  const [l, setL] = useState([]); const [err, setErr] = useState(''); const [load, setLoad] = useState(true)
  const refresh = () => getAll().then(setL).catch(x => setErr(errMsg(x))).finally(() => setLoad(false))
  useEffect(() => { refresh() }, [])
  const del = async id => { if (!confirm('Supprimer cet événement ?')) return; try { await remove(id); refresh() } catch (x) { setErr(errMsg(x)) } }
  return <main className="wrap"><div className="row between"><h1>Événements</h1><Link className="btn" to="/admin/events/new">Créer un événement</Link></div><Alert msg={err} />
    {load ? <Spinner /> : <div className="tablewrap"><table><thead><tr><th>Titre</th><th>Catégorie</th><th>Date</th><th>Capacité</th><th></th></tr></thead><tbody>
      {l.map(e => <tr key={e.id}><td>{e.titre}</td><td>{e.categorie}</td><td>{fmt(e.date)}</td><td>{e.capacite}</td>
        <td className="row"><Link className="btn ghost sm" to={`/admin/events/${e.id}/edit`}>Modifier</Link><button className="btn sm" onClick={() => del(e.id)}>Supprimer</button></td></tr>)}
      {!l.length && <tr><td colSpan="5" className="muted">Aucun événement.</td></tr>}</tbody></table></div>}</main>
}
