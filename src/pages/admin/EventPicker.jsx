import { useEffect, useState } from 'react'
import { getAll } from '../../api/events'
import { errMsg } from '../../api/client'
export default function EventPicker({ value, onChange, onError }) {
  const [l, setL] = useState([])
  useEffect(() => { getAll().then(d => { setL(d); if (d[0] && !value) onChange(String(d[0].id)) }).catch(x => onError(errMsg(x))) }, [])
  return <select aria-label="Événement" value={value} onChange={e => onChange(e.target.value)}>{l.map(e => <option key={e.id} value={e.id}>{e.titre}</option>)}</select>
}
