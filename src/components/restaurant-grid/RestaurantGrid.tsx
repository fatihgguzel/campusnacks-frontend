import React, { useEffect, useState } from 'react'
import { IRestaurant, IRestaurantGrid } from './types'
import {
  gridStyles,
  inputContainerStyles,
  loaderWrapperStyles,
  wrapperStyles,
} from './styles'
import { Input, INPUT_SIZE, INPUT_WIDTH } from '../input'
import { icons } from '../../lib'
import { useLanguage, useRestaurantsApi } from '../../hooks'
import { RestaurantCard } from './components/restaurant-card'
import { useDebouncer } from '../../hooks'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, setRestaurantsQuery } from '../../store'
import { Loader } from '../../lib/loader'

export const RestaurantGrid: React.FC<IRestaurantGrid> = React.memo(
  ({ className, dataAttr, scrollWrapperRef }) => {
    const { t } = useLanguage()
    const dispatch = useDispatch()
    const [searchValue, setSearchValue] = useState('')
    const [restaurants, setRestaurants] = useState<IRestaurant[]>([])
    const [filteredRestaurants, setFilteredRestaurants] =
      useState<IRestaurant[]>(restaurants)
    const RESTAURANT_PER_PAGE = 16
    const { getRestaurants } = useRestaurantsApi()

    const {
      restaurantsQuery,
      restaurantsArr,
      isLoading,
      totalRestaurantCount,
    } = useSelector(({ restaurants }: RootState) => ({
      restaurantsQuery: restaurants.restaurantsQuery,
      restaurantsArr: restaurants.restaurants.data,
      isLoading: restaurants.restaurants.isLoading,
      totalRestaurantCount: restaurants.totalCount,
    }))

    useEffect(() => {
      const fetchRestaurants = () => {
        console.log(555)
        getRestaurants()
      }
      fetchRestaurants()
    }, [restaurantsQuery])

    useEffect(() => {
      !searchValue && setRestaurants(restaurantsArr as IRestaurant[])
    }, [restaurantsArr])

    useEffect(() => {
      const handleScroll = () => {
        const gridWrapper = scrollWrapperRef.current

        if (!gridWrapper || searchValue) {
          return
        }

        const { scrollTop, clientHeight, scrollHeight } = gridWrapper
        if (scrollTop + clientHeight + 1 >= scrollHeight) {
          const newOffset = restaurantsQuery.offset + RESTAURANT_PER_PAGE

          if (newOffset <= totalRestaurantCount) {
            dispatch(
              setRestaurantsQuery({
                limit: RESTAURANT_PER_PAGE,
                offset: restaurantsQuery.offset + RESTAURANT_PER_PAGE,
              }),
            )
          }
        }
      }

      const gridWrapper = scrollWrapperRef.current

      gridWrapper?.addEventListener('scroll', handleScroll)

      return () => {
        gridWrapper?.removeEventListener('scroll', handleScroll)
      }
    }, [restaurantsQuery, searchValue, totalRestaurantCount])

    const debouncedSearch = useDebouncer(
      () => {
        const filtered = restaurants.filter((restaurant) =>
          restaurant.name
            .toLowerCase()
            .includes(searchValue.toLowerCase().trim()),
        )
        setFilteredRestaurants(filtered)
      },
      { delay: 300 },
    )

    useEffect(() => {
      debouncedSearch()
    }, [searchValue, restaurants, restaurantsArr])

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
              restaurantName={restaurant.name}
              minimumPrice={restaurant.minimumPrice}
              deliveryTime={restaurant.deliveryTime}
              isBusy={restaurant.isBusy}
              hasDelivery={restaurant.hasDelivery}
              restaurantId={restaurant.id}
              thumbnailUrl={restaurant.imageUrl}
              key={index}
            />
          ))}

          <div css={loaderWrapperStyles}>{isLoading && <Loader />}</div>
        </div>
      </div>
    )
  },
)
