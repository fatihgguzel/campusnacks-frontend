import React, { createContext, useContext, useMemo, useState } from 'react'
import { childrenType } from '../types'

interface IAuthContext {
  token: string
  setToken: React.Dispatch<React.SetStateAction<string>>
  clearToken: () => void
}

const defaultContext: IAuthContext = {
  token: '',
  setToken: () => {},
  clearToken: () => {},
}

const AuthContext = createContext<IAuthContext>(defaultContext)

const AuthProvider: React.FC<{ children: childrenType }> = React.memo(
  ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token') || '')

    // TODO const updateToken

    const clearToken = () => {
      localStorage.removeItem('token')
      localStorage.removeItem('tokenCreatedAt')
      setToken('')
      // TODO deleteAuthHeader()
    }

    const contextValue = useMemo(
      () => ({
        token,
        setToken,
        clearToken,
      }),
      [token],
    )

    return (
      <AuthContext.Provider value={contextValue}>
        {children}
      </AuthContext.Provider>
    )
  },
)

export const useAuthProvider = () => {
  return useContext(AuthContext)
}

export default AuthProvider
