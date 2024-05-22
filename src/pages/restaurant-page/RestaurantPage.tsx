import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { wrapperStyles } from './styles'
import { useLanguage, useRestaurantsApi } from '../../hooks'
import { RestaurantContent } from '../../components/restaurant-content'

export const RestaurantPage: React.FC = React.memo(() => {
  const { t } = useLanguage()
  const { isLoading } = useSelector(({ publicRestaurant }: RootState) => ({
    isLoading: publicRestaurant.items.isLoading,
  }))

  const { restaurantInfo, items } = useSelector(
    ({ publicRestaurant }: RootState) => ({
      restaurantInfo: publicRestaurant.info,
      items: publicRestaurant.items.data,
    }),
  )
  return (
    <div css={wrapperStyles}>
      <RestaurantContent
        name={restaurantInfo?.name}
        hasDelivery={restaurantInfo?.hasDelivery}
        minimumPrice={restaurantInfo?.minimumPrice}
        isLoading={isLoading}
        items={items}
      />
    </div>
  )
})
