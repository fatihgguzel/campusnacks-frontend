import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import { wrapperStyles } from './styles'
import { RestaurantContent } from '../../components/restaurant-content'
import { clearCart, setRestaurantId } from 'src/store/order-cart'

export const RestaurantPage: React.FC = React.memo(() => {
  const { isLoading } = useSelector(({ publicRestaurant }: RootState) => ({
    isLoading: publicRestaurant.items.isLoading,
  }))

  const dispatch = useDispatch()

  const { restaurantInfo, items, cartRestaurantId } = useSelector(
    ({ publicRestaurant, orderCart }: RootState) => ({
      restaurantInfo: publicRestaurant.info,
      items: publicRestaurant.items.data,
      cartRestaurantId: orderCart.restaurantId,
    }),
  )

  useEffect(() => {
    if (restaurantInfo && cartRestaurantId !== restaurantInfo.id) {
      dispatch(clearCart())
      dispatch(setRestaurantId({ restaurantId: restaurantInfo?.id || null }))
    }
  }, [restaurantInfo, cartRestaurantId])

  return (
    <div css={wrapperStyles}>
      <RestaurantContent
        name={restaurantInfo?.name}
        hasDelivery={restaurantInfo?.hasDelivery}
        minimumPrice={restaurantInfo?.minimumPrice}
        isLoading={isLoading}
        items={items}
        isOpen={restaurantInfo?.isOpen}
      />
    </div>
  )
})
