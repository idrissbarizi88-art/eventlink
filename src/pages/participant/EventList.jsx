import { useEffect, useState } from 'react'
import * as ev from '../../api/events'
import { errMsg } from '../../api/client'
import EventCard from '../../components/EventCard'
import { Alert, Spinner, CATS } from '../../components/ui'
export default function EventList() {
  const [list, setList] = useState([]); const [q, setQ] = useState(''); const [cat, setCat] = useState(''); const [up, setUp] = useState(false)
  const [load, setLoad] = useState(true); const [err, setErr] = useState('')
  useEffect(() => {
    setLoad(true); setErr('')
    const t = setTimeout(() => {
      const p = q.trim() ? ev.search(q.trim()) : cat ? ev.byCategorie(cat) : up ? ev.getUpcoming() : ev.getAll()
      p.then(setList).catch(x => setErr(errMsg(x))).finally(() => setLoad(false))
    }, 300)
    return () => clearTimeout(t)
  }, [q, cat, up])
  return <main className="wrap"><h1>Événements</h1><Alert msg={err} />
    <div className="row card" style={{ marginBottom: '1rem' }}>
      <input aria-label="Rechercher par titre" placeholder="Rechercher par titre…" value={q} onChange={e => setQ(e.target.value)} />
      <select aria-label="Catégorie" value={cat} onChange={e => setCat(e.target.value)}><option value="">Toutes les catégories</option>{CATS.map(c => <option key={c}>{c}</option>)}</select>
      <label style={{ margin: 0 }}><input type="checkbox" style={{ width: 'auto' }} checked={up} onChange={e => setUp(e.target.checked)} /> À venir uniquement</label>
    </div>
    {load ? <Spinner /> : list.length ? <div className="grid">{list.map(e => <EventCard key={e.id} e={e} />)}</div> : <p className="muted">Aucun événement trouvé.</p>}
  </main>
}
