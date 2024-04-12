import React from 'react'
import { Outlet } from 'react-router-dom'

export const UnprotectedPageLayout: React.FC = React.memo(() => {
  return (
    <>
      <Outlet />
    </>
  )
})

export default UnprotectedPageLayout
