import React from 'react'
import { useDrag } from 'react-dnd'
import { cancelButtonStyles, cardStyles, moveButtonStyles } from '../../styles'
import { IOrder } from '../../OrdersBoard'

export const OrderCard = ({
  order,
  onCancel,
  onMoveNext,
  onComplete,
}: {
  order: IOrder
  onCancel: (orderId: number) => void
  onMoveNext: (orderId: number) => void
  onComplete: (orderId: number) => void
}) => {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: 'ORDER_CARD',
    item: { id: order.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }))

  const getNextStatusButton = () => {
    switch (order.status) {
      case 'New':
        return (
          <button css={moveButtonStyles} onClick={() => onMoveNext(order.id)}>
            Move to Preparing
          </button>
        )
      case 'Preparing':
        return (
          <button css={moveButtonStyles} onClick={() => onMoveNext(order.id)}>
            Move to On the Way
          </button>
        )
      case 'On the Way':
        return (
          <button css={moveButtonStyles} onClick={() => onMoveNext(order.id)}>
            Move to Delivered
          </button>
        )
      case 'Delivered':
        return (
          <button css={moveButtonStyles} onClick={() => onComplete(order.id)}>
            Complete Order
          </button>
        )
      default:
        return null
    }
  }

  return (
    <div ref={dragRef} css={[cardStyles]}>
      <div>
        <span>Customer Name:</span> <span>{order.name}</span>
      </div>
      <div>
        <span>Address:</span> <span>{order.address}</span>
      </div>
      <div>
        <span>Order Content:</span> <span>{order.items}</span>
      </div>
      <div>
        <span>Total:</span> <span>${order.price}</span>
      </div>
      <div>
        <span>Payment Type:</span> <span>{order.paymentType}</span>
      </div>
      <div>
        <span>Phone Number:</span> <span>{order.phone}</span>
      </div>
      {order.status !== 'Completed' && order.status !== 'Canceled' && (
        <button css={cancelButtonStyles} onClick={() => onCancel(order.id)}>
          Cancel Order
        </button>
      )}
      {getNextStatusButton()}
    </div>
  )
}
