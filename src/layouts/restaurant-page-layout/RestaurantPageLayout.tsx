import React, { useEffect } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { Header } from '../../components/header'
import { wrapperStyles, headerLayoutStyle } from './styles'
import { useRestaurantsApi } from '../../hooks'

export const RestaurantPageLayout: React.FC = React.memo(() => {
  const params = useParams()
  const { getRestaurantContent } = useRestaurantsApi()

  useEffect(() => {
    if (params?.id) {
      getRestaurantContent(params.id)
    }
  }, [params.id])

  return (
    <>
      <Header css={headerLayoutStyle} />
      <div css={wrapperStyles}>
        <Outlet />
      </div>
    </>
  )
})
