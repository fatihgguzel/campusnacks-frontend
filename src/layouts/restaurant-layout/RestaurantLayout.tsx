import React from 'react'
import { Outlet } from 'react-router-dom'

export const RestaurantLayout: React.FC = React.memo(() => {
  return (
    <>
      <Outlet />
    </>
  )
})
