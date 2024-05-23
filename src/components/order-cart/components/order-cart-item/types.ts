import { dataAttrType } from '../../../../types'

export interface IOrderCartItems {
  className?: string
  dataAttr?: dataAttrType
  id: number
  name: string
  description: string
  price: number
  imageUrl?: string | null
  count: number
}
