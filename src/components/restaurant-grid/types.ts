import { dataAttrType } from '../../types'

export interface IRestaurantGrid {
  dataAttr?: dataAttrType
  className?: string
  scrollWrapperRef: React.RefObject<HTMLDivElement>
}

export interface IRestaurant {
  name: string
  minimumPrice: number
  deliveryTime: number
  isBusy: boolean
  hasDelivery: boolean
  id: number
  imageUrl: string | null
}
