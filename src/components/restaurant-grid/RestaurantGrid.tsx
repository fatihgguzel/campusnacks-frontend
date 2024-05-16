import React, { useEffect, useState } from 'react'
import { IRestaurantGrid } from './types'
import { gridStyles, inputContainerStyles, wrapperStyles } from './styles'
import { Input, INPUT_SIZE, INPUT_WIDTH } from '../input'
import { icons } from '../../lib'
import { useLanguage } from '../../hooks'
import { RestaurantCard } from './components/restaurant-card'
import { restaurantData } from '../../mock'
import { useDebouncer } from '../../hooks'

export const RestaurantGrid: React.FC<IRestaurantGrid> = React.memo(
  ({ className, dataAttr }) => {
    const { t } = useLanguage()
    const [searchValue, setSearchValue] = useState('')
    const [filteredRestaurants, setFilteredRestaurants] =
      useState(restaurantData)

    const debouncedSearch = useDebouncer(
      () => {
        const filtered = restaurantData.filter((restaurant) =>
          restaurant.restaurantName
            .toLowerCase()
            .includes(searchValue.toLowerCase()),
        )
        setFilteredRestaurants(filtered)
      },
      { delay: 300 },
    )

    useEffect(() => {
      debouncedSearch()
    }, [searchValue])

    return (
      <div className={className} {...dataAttr} css={wrapperStyles}>
        <div css={inputContainerStyles}>
          <Input
            placeholder={t('search_restaurant')}
            value={searchValue}
            icon={icons.find}
            iconSize={16}
            width={INPUT_WIDTH.FULL}
            size={INPUT_SIZE.BIG}
            onChange={(value) => setSearchValue(value)}
          />
        </div>
        <div css={gridStyles}>
          {filteredRestaurants.map((restaurant, index) => (
            <RestaurantCard
              restaurantName={restaurant.restaurantName}
              minimumPrice={restaurant.minimumPrice}
              deliveryTime={restaurant.deliveryTime}
              isBusy={restaurant.isBusy}
              hasDelivery={restaurant.hasDelivery}
              restaurantId={restaurant.restaurantId}
              key={index}
            />
          ))}
        </div>
      </div>
    )
  },
)
