import React, { useEffect, useMemo, useState } from 'react'
import {
  containerStyles,
  contentGridStyles,
  contentWrapperStyles,
  inputContainerStyles,
  loaderWrapperStyles,
  orderCartWrapperStyles,
  restaurantInfoStyles,
  wrapperStyles,
} from './styles'
import { IRestaurantContent } from './types'
import { RestaurantContentInfo } from './components/restaurant-content-info/RestaurantContentInfo'
import { useDebouncer, useLanguage, useWindowSize } from '../../hooks'
import { Input, INPUT_SIZE, INPUT_WIDTH } from '../input'
import { icons } from '../../lib'
import { RestaurantContentCard } from './components/restaurant-content-card'
import { Loader } from '../../lib/loader'
import { OrderCart } from '../order-cart'
import { theme } from '../../theme'
import { Modal, MODAL_POSITION } from '../modal'
import { Button, BUTTON_SIZE, BUTTON_WIDTH } from '../button'

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
    const [isCartModalOpen, setIsCartModalOpen] = useState(false)
    const { t } = useLanguage()
    const windowSize = useWindowSize()

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

    const isMobileSize = useMemo(
      () => windowSize.width < theme.breakpoints.tablet,
      [windowSize],
    )

    return (
      <div className={className} {...dataAttr} css={wrapperStyles}>
        <div css={restaurantInfoStyles}>
          <RestaurantContentInfo
            name={name}
            hasDelivery={hasDelivery}
            minimumPrice={minimumPrice}
          />
        </div>
        <div css={containerStyles}>
          <div css={contentWrapperStyles}>
            <div css={loaderWrapperStyles}>{isLoading && <Loader />}</div>
            {items?.length && items.length > 0 ? (
              <>
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
                  {filteredItems?.map((item) => (
                    <RestaurantContentCard
                      key={item.id}
                      id={item.id}
                      name={item.name}
                      description={item.description}
                      price={item.price}
                      imageUrl={item.imageUrl}
                    />
                  ))}
                </div>
              </>
            ) : (
              !isLoading && (
                <div className="restaurant-no-item">
                  {t('restaurant_no_item')}
                </div>
              )
            )}
          </div>

          {isMobileSize ? (
            <div className="view-cart-wrapper">
              <Button
                width={BUTTON_WIDTH.FULL}
                text={t('view_cart')}
                size={BUTTON_SIZE.XLARGE}
                height={65}
                onClick={() => setIsCartModalOpen(true)}
              />
            </div>
          ) : (
            <div css={orderCartWrapperStyles}>
              <OrderCart minimumPrice={minimumPrice || 0} />
            </div>
          )}
        </div>

        <Modal
          isOpen={isCartModalOpen}
          onClose={() => setIsCartModalOpen(false)}
          position={MODAL_POSITION.CENTER}
          mobileVerticalAlign={true}
        >
          <div css={orderCartWrapperStyles}>
            <OrderCart minimumPrice={minimumPrice || 0} />
          </div>
        </Modal>
      </div>
    )
  },
)
