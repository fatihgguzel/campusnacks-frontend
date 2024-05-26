import { dataAttrType } from 'src/types'

export interface IOrderDetails {
  className?: string
  dataAttr?: dataAttrType
  onCloseclick?: () => void
  orderId: number
}
