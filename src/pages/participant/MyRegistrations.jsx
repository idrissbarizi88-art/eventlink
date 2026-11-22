import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { byUser } from '../../api/inscriptions'
import { errMsg } from '../../api/client'
import { useAuth } from '../../context/AuthContext'
import { Alert, Spinner, Badge } from '../../components/ui'
export default function MyRegistrations() {
  const { userId } = useAuth(); const [l, setL] = useState([]); const [err, setErr] = useState(''); const [load, setLoad] = useState(true)
  useEffect(() => { byUser(userId).then(setL).catch(x => setErr(errMsg(x))).finally(() => setLoad(false)) }, [userId])
  return <main className="wrap"><h1>Mes inscriptions</h1><Alert msg={err} />
    {load ? <Spinner /> : l.length ? <div className="stack">{l.map(i => {
      const eid = i.evenement?.id ?? i.evenementId
      return <div key={i.id} className="card row between"><Link to={`/events/${eid}`}>{i.evenement?.titre || `Événement n°${eid}`}</Link><Badge statut={i.statut} /></div>
    })}</div> : <p className="muted">Vous n'êtes inscrit à aucun événement.</p>}</main>
}
