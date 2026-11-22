import { useEffect, useState, useCallback } from 'react'
import { byUser, markRead, markAllRead } from '../../api/notifications'
import { errMsg } from '../../api/client'
import { useAuth } from '../../context/AuthContext'
import { Alert, Spinner, fmt } from '../../components/ui'
export default function Notifications() {
  const { userId } = useAuth(); const [l, setL] = useState([]); const [err, setErr] = useState(''); const [load, setLoad] = useState(true)
  const refresh = useCallback(() => byUser(userId).then(setL).catch(x => setErr(errMsg(x))).finally(() => setLoad(false)), [userId])
  useEffect(() => { refresh() }, [refresh])
  const run = fn => async () => { try { await fn(); await refresh() } catch (x) { setErr(errMsg(x)) } }
  return <main className="wrap"><div className="row between"><h1>Notifications</h1>
    <button className="btn alt sm" onClick={run(() => markAllRead(userId))}>Tout marquer comme lu</button></div><Alert msg={err} />
    {load ? <Spinner /> : l.length ? <div className="stack">{l.map(n => <div key={n.id} className={`card row between${n.lue ? '' : ' unread'}`}>
      <div><p style={{ margin: 0 }}>{n.message}</p><span className="muted">{fmt(n.dateCreation || n.date)}</span></div>
      {!n.lue && <button className="btn ghost sm" onClick={run(() => markRead(n.id))}>Marquer comme lue</button>}</div>)}</div>
      : <p className="muted">Aucune notification.</p>}</main>
}
