import { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import * as ev from '../../api/events'
import * as ins from '../../api/inscriptions'
import * as com from '../../api/commentaires'
import { errMsg } from '../../api/client'
import { useAuth } from '../../context/AuthContext'
import { Alert, Spinner, Badge, fmt } from '../../components/ui'
const evId = i => i.evenement?.id ?? i.evenementId
export default function EventDetail() {
  const { id } = useParams(); const { userId } = useAuth()
  const [e, setE] = useState(null); const [places, setPlaces] = useState(null); const [mine, setMine] = useState(null)
  const [comments, setComments] = useState([]); const [link, setLink] = useState(''); const [txt, setTxt] = useState('')
  const [edit, setEdit] = useState(null); const [err, setErr] = useState(''); const [load, setLoad] = useState(true)
  const refresh = useCallback(async () => {
    try {
      const [a, p, i, c] = await Promise.all([ev.getOne(id), ev.getPlaces(id), ins.byUser(userId), com.byEvent(id)])
      setE(a); setPlaces(typeof p === 'number' ? p : p.placesRestantes ?? p.places ?? 0)
      setMine(i.find(x => String(evId(x)) === String(id)) || null); setComments(c)
    } catch (x) { setErr(errMsg(x)) } finally { setLoad(false) }
  }, [id, userId])
  useEffect(() => { refresh() }, [refresh])
  const act = fn => async e2 => { e2?.preventDefault?.(); setErr(''); try { await fn(); await refresh() } catch (x) { setErr(errMsg(x)) } }
  const full = places !== null && places <= 0
  if (load) return <Spinner />
  return <main className="wrap stack">
    <Alert msg={err} />
    {e && <section className="card stack"><span className="badge b-cat">{e.categorie}</span><h1>{e.titre}</h1>
      <p className="muted">{fmt(e.date)}{e.lieu ? ` — ${e.lieu}` : ''}</p><p>{e.description}</p>
      <p><strong>{places}</strong> place(s) restante(s)</p>
      {mine ? <p>Votre inscription : <Badge statut={mine.statut} /></p>
        : full ? <><Alert info msg="Cet événement est complet." /><button className="btn" disabled>S'inscrire</button></>
        : <form className="stack" onSubmit={act(() => ins.create({ userId: Number(userId), evenementId: Number(id), lienLinkedIn: link }))}>
            <div><label htmlFor="li">Lien LinkedIn</label><input id="li" type="url" required placeholder="https://www.linkedin.com/in/…" value={link} onChange={x => setLink(x.target.value)} /></div>
            <button className="btn">S'inscrire</button></form>}
    </section>}
    <section className="card stack"><h2>Commentaires</h2>
      <form className="row" onSubmit={act(async () => { await com.create({ userId: Number(userId), evenementId: Number(id), contenu: txt }); setTxt('') })}>
        <input aria-label="Votre commentaire" required placeholder="Écrire un commentaire…" value={txt} onChange={x => setTxt(x.target.value)} /><button className="btn">Publier</button></form>
      {comments.length ? comments.map(c => {
        const own = String(c.user?.id ?? c.userId) === String(userId)
        return <div key={c.id} className="card">
          <p className="muted">{c.user ? `${c.user.prenom} ${c.user.nom}` : 'Participant'}</p>
          {edit?.id === c.id ? <div className="row"><input value={edit.contenu} onChange={x => setEdit({ ...edit, contenu: x.target.value })} />
            <button className="btn sm" onClick={act(async () => { await com.update(c.id, { userId: Number(userId), contenu: edit.contenu }); setEdit(null) })}>Enregistrer</button>
            <button className="btn ghost sm" onClick={() => setEdit(null)}>Annuler</button></div> : <p>{c.contenu}</p>}
          {own && !edit && <div className="row"><button className="btn ghost sm" onClick={() => setEdit({ id: c.id, contenu: c.contenu })}>Modifier</button>
            <button className="btn ghost sm" onClick={act(() => com.removeOwn(c.id, userId))}>Supprimer</button></div>}
        </div>
      }) : <p className="muted">Aucun commentaire pour le moment.</p>}
    </section></main>
}
