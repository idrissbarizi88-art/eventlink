import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getOne, create, update } from '../../api/events'
import { errMsg } from '../../api/client'
import { Alert, Spinner, CATS } from '../../components/ui'
export default function AdminEventForm() {
  const { id } = useParams(); const nav = useNavigate()
  const [f, setF] = useState({ titre: '', description: '', date: '', lieu: '', categorie: 'CONFERENCE', capacite: 50 })
  const [err, setErr] = useState(''); const [load, setLoad] = useState(!!id)
  useEffect(() => { if (id) getOne(id).then(e => setF({ ...e, date: e.date ? e.date.slice(0, 16) : '' })).catch(x => setErr(errMsg(x))).finally(() => setLoad(false)) }, [id])
  const set = k => e => setF({ ...f, [k]: e.target.value })
  const submit = async e => {
    e.preventDefault(); setErr('')
    const b = { ...f, capacite: Number(f.capacite) }
    try { id ? await update(id, b) : await create(b); nav('/admin/events') } catch (x) { setErr(errMsg(x)) }
  }
  if (load) return <Spinner />
  return <main className="wrap"><form className="card" style={{ maxWidth: 560 }} onSubmit={submit}><h1>{id ? "Modifier l'événement" : 'Nouvel événement'}</h1><Alert msg={err} />
    <label htmlFor="t">Titre</label><input id="t" required value={f.titre} onChange={set('titre')} />
    <label htmlFor="d">Description</label><textarea id="d" rows="4" required value={f.description} onChange={set('description')} />
    <label htmlFor="dt">Date</label><input id="dt" type="datetime-local" required value={f.date} onChange={set('date')} />
    <label htmlFor="l">Lieu</label><input id="l" required value={f.lieu} onChange={set('lieu')} />
    <label htmlFor="c">Catégorie</label><select id="c" value={f.categorie} onChange={set('categorie')}>{CATS.map(c => <option key={c}>{c}</option>)}</select>
    <label htmlFor="cp">Capacité</label><input id="cp" type="number" min="1" required value={f.capacite} onChange={set('capacite')} />
    <p className="row"><button className="btn">Enregistrer</button><button type="button" className="btn ghost" onClick={() => nav('/admin/events')}>Annuler</button></p></form></main>
}
