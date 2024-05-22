import { dataAttrType } from '../../../../types'

export interface IRestaurantCard {
  className?: string
  dataAttr?: dataAttrType
  restaurantId: number
  thumbnailUrl?: string | null
  minimumPrice: number
  deliveryTime: number
  isBusy: boolean
  hasDelivery: boolean
  restaurantName: string
  onClick: (restaurantId: number) => void
}
