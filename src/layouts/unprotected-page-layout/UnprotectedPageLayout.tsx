import { jwtDecode } from 'jwt-decode'
import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { JWTPayload } from 'src/config'
import { useIdleTimer } from 'src/hooks'
import { useAuthProvider } from 'src/provider'

export const UnprotectedPageLayout: React.FC = React.memo(() => {
  const { token } = useAuthProvider()
  const { isExpired } = useIdleTimer()

  if (token && !isExpired) {
    const payload = jwtDecode<JWTPayload>(token)

    if (!payload.isUser) {
      return <Navigate to={'/vendor'} />
    }
  }

  return (
    <>
      <Outlet />
    </>
  )
})

export default UnprotectedPageLayout
