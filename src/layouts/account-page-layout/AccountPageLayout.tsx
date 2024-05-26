import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { Header } from '../../components/header/Header'
import { headerLayoutStyle, wrapperStyles } from './styles'
import { jwtDecode } from 'jwt-decode'
import { JWTPayload } from 'src/config'
import { useIdleTimer } from 'src/hooks'
import { useAuthProvider } from 'src/provider'

export const AccountPageLayout: React.FC = React.memo(() => {
  const { token } = useAuthProvider()
  const { isExpired } = useIdleTimer()

  if (!token) {
    return <Navigate to={'/'} />
  }

  if (token && !isExpired) {
    const payload = jwtDecode<JWTPayload>(token)

    if (!payload.isUser) {
      return <Navigate to={'/vendor'} />
    }
  }

  return (
    <>
      <Header css={headerLayoutStyle} />
      <div css={wrapperStyles}>
        <Outlet />
      </div>
    </>
  )
})
