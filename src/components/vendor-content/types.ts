import { dataAttrType } from '../../types'
import { getRestaurantContentResponse } from '../../types/api/responseObjects'

export interface IVendorContent {
  dataAttr?: dataAttrType
  className?: string
  name?: string
  hasDelivery?: boolean
  minimumPrice?: number
  items?: getRestaurantContentResponse['data']['items']
  isOpen?: boolean
}
