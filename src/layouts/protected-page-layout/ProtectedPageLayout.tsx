import React from 'react'
import { useAuthProvider } from '../../provider'
import { Navigate, Outlet } from 'react-router-dom'
import { useIdleTimer } from '../../hooks'

export const ProtectedPageLayout: React.FC = React.memo(() => {
  const { token } = useAuthProvider()

  const { isExpired } = useIdleTimer()

  if (!token || isExpired) {
    return <Navigate to="/login" />
  }

  return (
    <>
      <Outlet />
    </>
  )
})
