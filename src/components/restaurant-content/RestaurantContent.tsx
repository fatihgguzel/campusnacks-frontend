import React, { useEffect, useState } from 'react'
import {
  contentGridStyles,
  contentWrapperStyles,
  inputContainerStyles,
  loaderWrapperStyles,
  restaurantInfoStyles,
  wrapperStyles,
} from './styles'
import { IRestaurantContent } from './types'
import { RestaurantContentInfo } from './components/restaurant-content-info/RestaurantContentInfo'
import { useDebouncer, useLanguage } from '../../hooks'
import { Input, INPUT_SIZE, INPUT_WIDTH } from '../input'
import { icons } from '../../lib'
import { RestaurantContentCard } from './components/restaurant-content-card'
import { Loader } from '../../lib/loader'

export const RestaurantContent: React.FC<IRestaurantContent> = React.memo(
  ({
    className,
    dataAttr,
    hasDelivery,
    minimumPrice,
    name,
    isLoading,
    items,
  }) => {
    const [searchValue, setSearchValue] = useState('')
    const [filteredItems, setFilteredItems] = useState(items)
    const { t } = useLanguage()

    const debouncedSearch = useDebouncer(
      () => {
        const filtered = items?.filter((item) =>
          item.name.toLowerCase().includes(searchValue.toLowerCase().trim()),
        )

        setFilteredItems(filtered)
      },
      { delay: 300 },
    )

    useEffect(() => {
      debouncedSearch()
    }, [searchValue, items])

    return (
      <div className={className} {...dataAttr} css={wrapperStyles}>
        <div css={restaurantInfoStyles}>
          <RestaurantContentInfo
            name={name}
            hasDelivery={hasDelivery}
            minimumPrice={minimumPrice}
          />
        </div>
        <div css={contentWrapperStyles}>
          <div css={inputContainerStyles}>
            <Input
              placeholder={t('search_in_menu')}
              value={searchValue}
              icon={icons.find}
              iconSize={16}
              width={INPUT_WIDTH.FULL}
              size={INPUT_SIZE.BIG}
              onChange={(value) => setSearchValue(value)}
            />
          </div>
          <div css={contentGridStyles}>
            <div css={loaderWrapperStyles}>{isLoading && <Loader />}</div>
            {filteredItems?.map((item) => (
              <RestaurantContentCard
                key={item.id}
                name={item.name}
                description={item.description}
                price={item.price}
                imageUrl={item.imageUrl}
              />
            ))}
          </div>
        </div>
      </div>
    )
  },
)
