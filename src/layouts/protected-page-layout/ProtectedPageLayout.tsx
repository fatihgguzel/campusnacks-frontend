import React from 'react'
import { useAuthProvider } from '../../provider'
import { Navigate, Outlet } from 'react-router-dom'
import { useIdleTimer } from '../../hooks'
import { useSelector } from 'react-redux'
import { selectRestaurant, selectUser } from '../../store'
import { RestaurantLayout } from '../restaurant-layout'
import { Header } from '../../components/header'

export const ProtectedPageLayout: React.FC = React.memo(() => {
  const { token } = useAuthProvider()

  const { isExpired } = useIdleTimer()

  const userData = useSelector(selectUser).data
  const restaurantData = useSelector(selectRestaurant).data

  if (!token || isExpired) {
    return <Navigate to="/login" />
  }

  return (
    <>
      <Header />
      {restaurantData ? <RestaurantLayout /> : <Outlet />}
    </>
  )
})
