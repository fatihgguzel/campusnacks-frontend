import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '../../components/header/Header'
import { headerLayoutStyle, wrapperStyles } from './styles'
export const RestaurantLayout: React.FC = React.memo(() => {
  return (
    <>
      <Header css={headerLayoutStyle} logoTo="/vendor" />
      <div css={wrapperStyles}>
        <Outlet />
      </div>
    </>
  )
})
