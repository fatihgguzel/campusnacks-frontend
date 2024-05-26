import React from 'react'
import { useAuthProvider } from '../../provider'
import { Outlet, Navigate } from 'react-router-dom'
import { useIdleTimer } from '../../hooks'
import { jwtDecode } from 'jwt-decode'
import { JWTPayload } from 'src/config'

export const ProtectedPageLayout: React.FC = React.memo(() => {
  const { token } = useAuthProvider()

  const { isExpired } = useIdleTimer()

  if (!token || isExpired) {
    return <Navigate to={'/'} />
  } else if (token && !isExpired) {
    const payload = jwtDecode<JWTPayload>(token)

    if (payload.isUser) {
      return <Navigate to={'/'} />
    }
  }

  return (
    <>
      <Outlet />
    </>
  )
})
