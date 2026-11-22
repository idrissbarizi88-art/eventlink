import { Link } from 'react-router-dom'
import { fmt } from './ui'
export default function EventCard({ e }) {
  return <article className="card stack">
    <span className="badge b-cat">{e.categorie}</span>
    <h3><Link to={`/events/${e.id}`}>{e.titre}</Link></h3>
    <p className="muted">{fmt(e.date)}{e.lieu ? ` — ${e.lieu}` : ''}</p>
    <Link className="btn alt sm" to={`/events/${e.id}`}>Voir le détail</Link>
  </article>
}
