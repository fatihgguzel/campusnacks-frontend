import { dataAttrType } from '../../types'
import { getRestaurantContentResponse } from '../../types/api/responseObjects'

export interface IRestaurantContent {
  dataAttr?: dataAttrType
  className?: string
  name?: string
  hasDelivery?: boolean
  minimumPrice?: number
  isLoading?: boolean
  items?: getRestaurantContentResponse['data']['items']
}
