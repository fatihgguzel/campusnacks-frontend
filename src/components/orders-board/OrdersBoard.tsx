import React, { useState, useEffect } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { gridStyles, wrapperStyles } from './styles'
import { OrdersColumn } from './components/order-column/OrdersColumn'

export interface IOrder {
  id: number
  name: string
  address: string
  items: string
  price: number
  paymentType: string
  phone: string
  status: string
}

const initialOrders: IOrder[] = [
  {
    id: 1,
    name: 'John Doe',
    address: '123 Main St',
    items: 'Pizza, Coke',
    price: 20,
    paymentType: 'Cash',
    phone: '555-555-5555',
    status: 'New',
  },
  {
    id: 2,
    name: 'Jane Doe',
    address: '456 Elm St',
    items: 'Salad, Tea',
    price: 15,
    paymentType: 'Credit Card',
    phone: '555-555-5555',
    status: 'Preparing',
  },
  {
    id: 3,
    name: 'James Doe',
    address: '789 Maple St',
    items: 'Burger, Fries',
    price: 10,
    paymentType: 'Cash',
    phone: '555-555-5555',
    status: 'On the Way',
  },
  {
    id: 4,
    name: 'Jenny Doe',
    address: '101 Oak St',
    items: 'Pasta, Lemonade',
    price: 25,
    paymentType: 'Credit Card',
    phone: '555-555-5555',
    status: 'Delivered',
  },
  {
    id: 5,
    name: 'Jack Doe',
    address: '112 Pine St',
    items: 'Sandwich, Water',
    price: 5,
    paymentType: 'Cash',
    phone: '555-555-5555',
    status: 'Completed',
  },
  {
    id: 6,
    name: 'Jill Doe',
    address: '131 Cedar St',
    items: 'Tacos, Beer',
    price: 30,
    paymentType: 'Credit Card',
    phone: '555-555-5555',
    status: 'Canceled',
  },
]

export const OrdersBoard = () => {
  const [orders, setOrders] = useState(initialOrders)
  const [isMobileView, setIsMobileView] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 480)
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const moveOrderToStatus = (orderId: number, newStatus: string) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order,
      ),
    )
  }

  const handleCancelOrder = (orderId: number) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: 'Canceled' } : order,
      ),
    )
  }

  const handleCompleteOrder = (orderId: number) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: 'Completed' } : order,
      ),
    )
  }

  const handleClearOrders = (status: string) => {
    setOrders((prevOrders) =>
      prevOrders.filter((order) => order.status !== status),
    )
  }

  const handleMoveNext = (orderId: number) => {
    setOrders((prevOrders: IOrder[]) =>
      prevOrders.map((order: IOrder): IOrder => {
        if (order.id === orderId) {
          const nextStatus: string = {
            'New': 'Preparing',
            'Preparing': 'On the Way',
            'On the Way': 'Delivered',
          }[order.status]!
          return { ...order, status: nextStatus }
        }
        return order
      }),
    )
  }

  const filterOrdersByStatus = (status: string) =>
    orders.filter((order) => order.status === status)

  return (
    <DndProvider backend={HTML5Backend}>
      <div css={wrapperStyles}>
        <div css={gridStyles}>
          <OrdersColumn
            title="New Orders"
            status="New"
            orders={filterOrdersByStatus('New')}
            onDropOrder={moveOrderToStatus}
            onCancel={handleCancelOrder}
            onMoveNext={handleMoveNext}
            onComplete={handleCompleteOrder}
            isMobileView={isMobileView}
          />
          <OrdersColumn
            title="Preparing"
            status="Preparing"
            orders={filterOrdersByStatus('Preparing')}
            onDropOrder={moveOrderToStatus}
            onCancel={handleCancelOrder}
            onMoveNext={handleMoveNext}
            onComplete={handleCompleteOrder}
            isMobileView={isMobileView}
          />
          <OrdersColumn
            title="On the Way"
            status="On the Way"
            orders={filterOrdersByStatus('On the Way')}
            onDropOrder={moveOrderToStatus}
            onCancel={handleCancelOrder}
            onMoveNext={handleMoveNext}
            onComplete={handleCompleteOrder}
            isMobileView={isMobileView}
          />
          <OrdersColumn
            title="Delivered"
            status="Delivered"
            orders={filterOrdersByStatus('Delivered')}
            onDropOrder={moveOrderToStatus}
            onCancel={handleCancelOrder}
            onMoveNext={handleMoveNext}
            onComplete={handleCompleteOrder}
            isMobileView={isMobileView}
          />
          <OrdersColumn
            title="Completed"
            status="Completed"
            orders={filterOrdersByStatus('Completed')}
            onDropOrder={moveOrderToStatus}
            onCancel={handleCancelOrder}
            onMoveNext={handleMoveNext}
            onComplete={handleCompleteOrder}
            onClear={handleClearOrders}
            isMobileView={isMobileView}
          />
          <OrdersColumn
            title="Canceled"
            status="Canceled"
            orders={filterOrdersByStatus('Canceled')}
            onDropOrder={moveOrderToStatus}
            onCancel={handleCancelOrder}
            onMoveNext={handleMoveNext}
            onComplete={handleCompleteOrder}
            onClear={handleClearOrders}
            isMobileView={isMobileView}
          />
        </div>
      </div>
    </DndProvider>
  )
}
