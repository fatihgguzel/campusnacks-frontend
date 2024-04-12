import React, { useCallback, useState, useLayoutEffect } from 'react'
import { useAuthProvider } from '../../provider'
import { Navigate, Outlet, useSearchParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store'
import { useIdleTimer } from '../../hooks'

export const ProtectedPageLayout: React.FC = React.memo(() => {
  const { token } = useAuthProvider()
  // TODO useUserApi()

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
