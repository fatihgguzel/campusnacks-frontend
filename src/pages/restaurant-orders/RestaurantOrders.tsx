import React from 'react'
import { OrdersBoard } from '../../components/orders-board/OrdersBoard'
import { wrapperStyles } from '../../components/orders-board/styles'

export const RestaurantOrders: React.FC = React.memo(() => {
  return (
    <div css={wrapperStyles}>
      <OrdersBoard />
    </div>
  )
})
