import { useEffect, useState } from 'react'
import { byEvent, removeAdmin } from '../../api/commentaires'
import { errMsg } from '../../api/client'
import { Alert, Spinner } from '../../components/ui'
import EventPicker from './EventPicker'
export default function AdminCommentaires() {
  const [eid, setEid] = useState(''); const [l, setL] = useState([]); const [err, setErr] = useState(''); const [load, setLoad] = useState(false)
  const refresh = () => { if (!eid) return; setLoad(true); byEvent(eid).then(setL).catch(x => setErr(errMsg(x))).finally(() => setLoad(false)) }
  useEffect(() => { refresh() }, [eid])
  const del = async id => { try { await removeAdmin(id); refresh() } catch (x) { setErr(errMsg(x)) } }
  return <main className="wrap"><h1>Commentaires</h1><Alert msg={err} />
    <div className="card" style={{ marginBottom: '1rem' }}><EventPicker value={eid} onChange={setEid} onError={setErr} /></div>
    {load ? <Spinner /> : l.length ? <div className="stack">{l.map(c => <div key={c.id} className="card row between">
      <div><p className="muted" style={{ margin: 0 }}>{c.user ? `${c.user.prenom} ${c.user.nom}` : 'Participant'}</p><p style={{ margin: 0 }}>{c.contenu}</p></div>
      <button className="btn sm" onClick={() => del(c.id)}>Supprimer</button></div>)}</div> : <p className="muted">Aucun commentaire.</p>}</main>
}
