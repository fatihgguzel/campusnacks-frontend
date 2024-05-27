import React, { useEffect, useMemo, useState } from 'react'
import { Order, OrdersDataTable } from 'src/components/orders-data-table'
import { wrapperStyles } from './styles'
import { useLanguage, useUserApi } from 'src/hooks'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'src/store'
import moment from 'moment'
import { getEnumKeyByValue } from 'src/helpers'
import { DeliveryTypes, OrderStatusTypes } from 'src/types/api/enums'
import { setOrdersQuery, setActivePage } from 'src/store/user-orders'
import { Pagination } from 'src/components/pagination'
import { useSearchParams } from 'react-router-dom'
import { TKey } from 'src/i18n/locales/en'
import { RowActions } from 'src/components/orders-data-table/components/row-actions'
import { ColumnDef } from '@tanstack/react-table'

const ORDERS_PER_PAGE = 20

export const UserOrdersPage: React.FC = React.memo(() => {
  const { getOrders } = useUserApi()
  const [searchParams, setSearchParams] = useSearchParams()
  const { t, lang } = useLanguage()
  const [userOrders, setUserOrders] = useState<Order[]>([])
  const [columns, setColumns] = useState<ColumnDef<Partial<Order>>[]>([])
  const dispatch = useDispatch()
  const parsedPage = useMemo(
    () => Number(searchParams.get('page')) || 1,
    [searchParams],
  )

  const { ordersQuery, orders, ordersCount } = useSelector(
    ({ userOrders }: RootState) => ({
      ordersQuery: userOrders.ordersQuery,
      orders: userOrders.orders.data,
      ordersCount: userOrders.totalCount,
    }),
  )

  useEffect(() => {
    setColumns([
      { accessorKey: 'restaurantName', header: t('restaurant_name') },
      { accessorKey: 'status', header: t('order_status') },
      { accessorKey: 'orderDate', header: t('order_date') },
      { accessorKey: 'deliveryType', header: t('delivery_type') },
      { accessorKey: 'cost', header: t('cost') },
      {
        id: 'actions',
        header: t('actions'),
        cell: ({ row }) => (
          <RowActions isUserOrders={true} orderId={row.original.id!} />
        ),
      },
    ])
  }, [lang])

  const numberOfPages = useMemo(() => {
    if (!ordersCount) {
      return 1
    } else {
      return Math.ceil(ordersCount / ORDERS_PER_PAGE)
    }
  }, [ordersCount])

  useEffect(() => {
    const page = parsedPage > numberOfPages ? numberOfPages : parsedPage
    const ordersOffset = page * ORDERS_PER_PAGE - ORDERS_PER_PAGE
    const query = {
      ...ordersQuery,
      offset: ordersOffset,
    }

    dispatch(setActivePage(page))

    if (
      Object.entries(query).every(
        (elem) => Object.entries(ordersQuery).indexOf(elem) > -1,
      )
    )
      return

    dispatch(setOrdersQuery(query))
  }, [parsedPage, numberOfPages])

  useEffect(() => {
    const fetchOrders = () => {
      getOrders()
    }

    fetchOrders()

    const interval = setInterval(fetchOrders, 5000)

    return () => clearInterval(interval)
  }, [ordersQuery])

  useEffect(() => {
    setUserOrders(orders as Order[])
  }, [orders])

  return (
    <div css={wrapperStyles}>
      <Pagination />
      <OrdersDataTable
        data={userOrders.map((order) => {
          return {
            id: order.id,
            restaurantName: order.restaurantName,
            orderDate: moment(order.orderDate).format('DD/MM/YYYY HH:mm'),
            cost: Number(order.cost.toFixed(2)),
            status: t(
              getEnumKeyByValue(OrderStatusTypes, order.status) as TKey,
            ),
            deliveryType: t(
              getEnumKeyByValue(DeliveryTypes, order.deliveryType) as TKey,
            ),
            userId: order.userId,
          }
        })}
        columns={columns}
        isUserOrders={true}
      />
    </div>
  )
})
