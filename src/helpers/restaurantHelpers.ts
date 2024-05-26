interface IRestaurant {
  id: number
  name: string
  minimumPrice: number
  deliveryTime: number
  isBusy: boolean
  hasDelivery: boolean
  imageUrl: string | null
  deliveryPrice: number | null
}

export const filterUniqueRestaurants = (
  restaurants: IRestaurant[],
): IRestaurant[] => {
  const seen = new Set<number>()
  return restaurants.filter((restaurant) => {
    if (seen.has(restaurant.id)) {
      return false
    } else {
      seen.add(restaurant.id)
      return true
    }
  })
}
