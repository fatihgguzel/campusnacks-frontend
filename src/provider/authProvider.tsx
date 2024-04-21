import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { childrenType } from '../types'
import { DateTimeService, RequestService } from '../services'

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

    const updateToken = useCallback(
      (token: string) => {
        localStorage.setItem('token', token)
        if (!localStorage.getItem('tokenCreatedAt')) {
          localStorage.setItem('tokenCreatedAt', DateTimeService.now())
        }
        RequestService.setAuthHeader(token)
      },
      [token],
    )

    const clearToken = () => {
      localStorage.removeItem('token')
      localStorage.removeItem('tokenCreatedAt')
      setToken('')
      RequestService.deleteAuthorizationHeader()
    }

    useEffect(() => {
      token && updateToken(token)
    }, [token])

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
