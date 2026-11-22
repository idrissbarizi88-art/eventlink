export const Spinner = () => <div className="spin" role="status" aria-label="Chargement" />
export const Alert = ({ msg, info }) => msg ? <div className={`alert${info ? ' info' : ''}`} role="alert">{msg}</div> : null
const L = { EN_ATTENTE: 'En attente', VALIDEE: 'Validée', REFUSEE: 'Refusée' }
export const Badge = ({ statut }) => <span className={`badge b-${statut}`}>{L[statut] || statut}</span>
export const fmt = d => d ? new Date(d).toLocaleString('fr-FR', { dateStyle: 'long', timeStyle: 'short' }) : ''
export const CATS = ['CONFERENCE', 'HACKATHON', 'FORMATION', 'ATELIER', 'SEMINAIRE']
