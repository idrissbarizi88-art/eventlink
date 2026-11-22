import { createContext, useContext, useState } from 'react'
const Ctx = createContext(null)
export const useAuth = () => useContext(Ctx)
export function AuthProvider({ children }) {
  const read = () => ({ token: localStorage.getItem('token'), role: localStorage.getItem('role'), userId: localStorage.getItem('userId') })
  const [auth, setAuth] = useState(read)
  const signIn = ({ token, role, userId }) => {
    localStorage.setItem('token', token); localStorage.setItem('role', role); localStorage.setItem('userId', String(userId))
    setAuth({ token, role, userId: String(userId) })
  }
  const signOut = () => { localStorage.clear(); setAuth({ token: null, role: null, userId: null }) }
  return <Ctx.Provider value={{ ...auth, signIn, signOut }}>{children}</Ctx.Provider>
}
