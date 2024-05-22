import React, { useRef } from 'react'
import { RestaurantGrid } from '../../components/restaurant-grid'
import { wrapperStyles } from './styles'

export const MainPage: React.FC = React.memo(() => {
  const scrollWrapperRef = useRef<HTMLDivElement>(null)
  return (
    <div ref={scrollWrapperRef} css={wrapperStyles}>
      <RestaurantGrid scrollWrapperRef={scrollWrapperRef} />
    </div>
  )
})
