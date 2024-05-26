import * as ENUMS from 'src/types/api/enums'

export interface IEditItem {
  itemId: number
  onCloseClick?: () => void
  isOpen?: boolean
}

export interface EditItemType {
  id: number
  restaurantId: number
  hasDiscount: boolean
  discount: number | null
  name: string
  description: string
  imageUrl: string | null
  price: number
  menu?: {
    id: number
    hasBadge: boolean
    badgeTag: string | null
  }
  product?: {
    id: number
    productType: ENUMS.ProductTypes
  }
}
