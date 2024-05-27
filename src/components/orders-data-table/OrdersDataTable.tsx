import React, { useEffect, useState } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from '@tanstack/react-table'
import { IDataTable, Order, OrderColumn } from './types'
import { wrapperStyles } from './styles'
import { Button } from '../button'
import { useLanguage } from 'src/hooks'
import { useDispatch, useSelector } from 'react-redux'
import { setOrdersQuery as setRestaurantOrdersQuery } from 'src/store/restaurant-orders'
import { setOrdersQuery as setUserOrdersQuery } from 'src/store/user-orders'
import { RootState } from 'src/store'

export const OrdersDataTable: React.FC<IDataTable> = React.memo(
  ({ className, dataAttr, data, columns, isUserOrders }) => {
    const [tableData, setTableData] = useState<Partial<Order>[]>([])
    const [tableColumns, setTableColumns] =
      useState<ColumnDef<Partial<Order>>[]>(columns)
    const [isAllOrders, setIsAllOrders] = useState(false)
    const { t } = useLanguage()
    const dispatch = useDispatch()
    const ORDERS_PER_PAGE = 20

    const table = useReactTable<Partial<Order>>({
      data: tableData,
      columns: tableColumns,
      getCoreRowModel: getCoreRowModel(),
    })

    useEffect(() => {
      setTableColumns(columns)
    }, [columns])

    const { ordersQuery } = useSelector(({ restaurantOrders }: RootState) => ({
      ordersQuery: restaurantOrders.ordersQuery,
    }))

    const handleButtonClick = () => {
      isUserOrders
        ? dispatch(
            setUserOrdersQuery({
              active: isAllOrders,
              limit: ORDERS_PER_PAGE,
              offset: ordersQuery.offset,
            }),
          )
        : dispatch(
            setRestaurantOrdersQuery({
              active: isAllOrders,
              limit: ORDERS_PER_PAGE,
              offset: ordersQuery.offset,
            }),
          )

      setIsAllOrders((prev) => !prev)
    }

    useEffect(() => {
      setTableData(data)
    }, [data])

    return (
      <div className={className} {...dataAttr} css={wrapperStyles}>
        <div className="change-table">
          <Button
            text={isAllOrders ? t('get_all_orders') : t('get_active_orders')}
            onClick={() => handleButtonClick()}
          />
        </div>
        <div className="table-wrapper">
          <table className="orders-table">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th className="orders-table-cell head-cell" key={header.id}>
                      <div>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      <div className="orders-table-cell body-cell">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                        {cell.id.includes('cost') ? ' TL' : ''}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {!data.length && <div className="no-data-found">{t('no_order')}</div>}
        </div>
      </div>
    )
  },
)
