import { ColumnDef } from '@tanstack/react-table'
import { dataAttrType } from 'src/types'
import * as ENUMS from 'src/types/api/enums'

export interface Order {
  id: number
  userId: number
  restaurantId: number
  restaurantName?: string
  status: ENUMS.OrderStatusTypes
  orderDate: Date | string
  deliveredDate: Date | null
  deliveryType: ENUMS.DeliveryTypes
  cost: number
}

export type OrderColumn = {
  accessorKey: keyof Order | 'actions'
  header: string
}

export interface IDataTable {
  className?: string
  dataAttr?: dataAttrType
  data: Partial<Order>[]
  columns: ColumnDef<Partial<Order>>[]
  isUserOrders?: boolean
}
