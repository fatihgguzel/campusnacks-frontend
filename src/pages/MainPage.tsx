import React from 'react'
import { RestaurantGrid } from '../components/restaurant-grid'
import { wrapperStyles } from './styles'

export const MainPage: React.FC = React.memo(() => {
  return (
    <div css={wrapperStyles}>
      <RestaurantGrid />
    </div>
  )
})
