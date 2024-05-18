import React, { useState } from 'react'
import { useDrop } from 'react-dnd'
import { css } from '@emotion/react'
import { OrderCard } from '../order-card/OrderCard'
import { IOrder } from '../../OrdersBoard'
import {
  buttonStyles,
  columnStyles,
  columnTitleStyles,
  newOrderColumnStyles,
} from '../../styles'

export const OrdersColumn = ({
  title,
  orders,
  status,
  onDropOrder,
  onCancel,
  onMoveNext,
  onComplete,
  onClear,
  isMobileView,
}: {
  title: string
  orders: any[]
  status: string
  onDropOrder: (orderId: number, newStatus: string) => void
  onCancel: (orderId: number) => void
  onMoveNext: (orderId: number) => void
  onComplete: (orderId: number) => void
  onClear?: (status: string) => void
  isMobileView: boolean
}) => {
  const [expanded, setExpanded] = useState(true)
  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: 'ORDER_CARD',
    drop: (item: IOrder) => onDropOrder(item.id, status),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }))

  const hasOrders = orders.length > 0

  return (
    <div
      ref={dropRef}
      css={[
        columnStyles,
        status === 'New' && hasOrders && newOrderColumnStyles,
      ]}
    >
      <div
        css={(theme) => columnTitleStyles(theme, isMobileView)}
        onClick={() => isMobileView && setExpanded(!expanded)}
      >
        {title}
        {isMobileView && <span>{expanded ? '▲' : '▼'}</span>}
      </div>
      {(expanded || !isMobileView) &&
        orders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            onCancel={onCancel}
            onMoveNext={onMoveNext}
            onComplete={onComplete}
          />
        ))}
      {(status === 'Completed' || status === 'Canceled') &&
        orders.length > 0 && (
          <button css={buttonStyles} onClick={() => onClear?.(status)}>
            Clear Orders
          </button>
        )}
    </div>
  )
}
