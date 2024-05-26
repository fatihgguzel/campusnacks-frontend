import React, { useEffect, useMemo, useState } from 'react'
import { Order, OrdersDataTable } from 'src/components/orders-data-table'
import { wrapperStyles } from './styles'
import { useLanguage, useRestaurantApi } from 'src/hooks'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'src/store'
import moment from 'moment'
import { getEnumKeyByValue } from 'src/helpers'
import { DeliveryTypes, OrderStatusTypes } from 'src/types/api/enums'
import { setActivePage, setOrdersQuery } from 'src/store/restaurant-orders'
import { Pagination } from 'src/components/pagination'
import { useSearchParams } from 'react-router-dom'
import { TKey } from 'src/i18n/locales/en'
import { RowActions } from 'src/components/orders-data-table/components/row-actions'

const ORDERS_PER_PAGE = 20

export const RestaurantOrdersPage: React.FC = React.memo(() => {
  const { getOrders } = useRestaurantApi()
  const [searchParams, setSearchParams] = useSearchParams()
  const { t } = useLanguage()
  const [restaurantOrders, setRestaurantOrders] = useState<Order[]>([])
  const dispatch = useDispatch()
  const parsedPage = useMemo(
    () => Number(searchParams.get('page')) || 1,
    [searchParams],
  )

  const { ordersQuery, orders, ordersCount } = useSelector(
    ({ restaurantOrders }: RootState) => ({
      ordersQuery: restaurantOrders.ordersQuery,
      orders: restaurantOrders.orders.data,
      ordersCount: restaurantOrders.totalCount,
    }),
  )

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
    setRestaurantOrders(orders as Order[])
  }, [orders])

  return (
    <div css={wrapperStyles}>
      <Pagination />
      <OrdersDataTable
        data={restaurantOrders.map((order) => {
          return {
            id: order.id,
            orderDate: moment(order.orderDate).format('DD/MM/YYYY HH:mm'),
            cost: order.cost,
            status: t(
              getEnumKeyByValue(OrderStatusTypes, order.status) as TKey,
            ),
            deliveryType: t(
              getEnumKeyByValue(DeliveryTypes, order.deliveryType) as TKey,
            ),
            userId: order.userId,
          }
        })}
        columns={[
          { accessorKey: 'status', header: t('order_status') },
          { accessorKey: 'orderDate', header: t('order_date') },
          { accessorKey: 'deliveryType', header: t('delivery_type') },
          { accessorKey: 'cost', header: t('cost') },
          {
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => <RowActions orderId={row.original.id!} />,
          },
        ]}
      />
    </div>
  )
})
