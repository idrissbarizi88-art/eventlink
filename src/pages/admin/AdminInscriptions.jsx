import { useEffect, useState } from 'react'
import { byEvent, valider, refuser } from '../../api/inscriptions'
import { errMsg } from '../../api/client'
import { Alert, Spinner, Badge } from '../../components/ui'
import EventPicker from './EventPicker'
export default function AdminInscriptions() {
  const [eid, setEid] = useState(''); const [l, setL] = useState([]); const [err, setErr] = useState(''); const [load, setLoad] = useState(false)
  const refresh = () => { if (!eid) return; setLoad(true); byEvent(eid).then(setL).catch(x => setErr(errMsg(x))).finally(() => setLoad(false)) }
  useEffect(() => { refresh() }, [eid])
  const act = (fn, id) => async () => { setErr(''); try { await fn(id); refresh() } catch (x) { setErr(errMsg(x)) } }
  return <main className="wrap"><h1>Inscriptions</h1><Alert msg={err} />
    <div className="card" style={{ marginBottom: '1rem' }}><EventPicker value={eid} onChange={setEid} onError={setErr} /></div>
    {load ? <Spinner /> : <div className="tablewrap"><table><thead><tr><th>Participant</th><th>LinkedIn</th><th>Statut</th><th></th></tr></thead><tbody>
      {l.map(i => { const u = i.user || i.participant || {}
        return <tr key={i.id}><td>{u.prenom} {u.nom}<div className="muted">{u.email}</div></td>
          <td>{i.lienLinkedIn ? <a href={i.lienLinkedIn} target="_blank" rel="noreferrer">Profil LinkedIn</a> : '—'}</td><td><Badge statut={i.statut} /></td>
          <td className="row"><button className="btn sm" disabled={i.statut === 'VALIDEE'} onClick={act(valider, i.id)}>Valider</button>
            <button className="btn ghost sm" disabled={i.statut === 'REFUSEE'} onClick={act(refuser, i.id)}>Refuser</button></td></tr> })}
      {!l.length && <tr><td colSpan="4" className="muted">Aucune inscription.</td></tr>}</tbody></table></div>}</main>
}
