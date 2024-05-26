import React, { useEffect, useState } from 'react'
import {
  containerStyles,
  contentGridStyles,
  contentWrapperStyles,
  inputContainerStyles,
  restaurantInfoStyles,
  wrapperStyles,
} from './styles'
import { IVendorContent } from './types'
import { RestaurantContentInfo } from './components/restaurant-content-info/RestaurantContentInfo'
import { useDebouncer, useLanguage } from '../../hooks'
import { Input, INPUT_SIZE, INPUT_WIDTH } from '../input'
import { icons } from '../../lib'
import { RestaurantContentCard } from './components/restaurant-content-card'
import { Button, BUTTON_SIZE } from '../button'
import { AddItem } from './components/add-item/AddItem'
import { Modal, MODAL_POSITION } from '../modal'

export const VendorContent: React.FC<IVendorContent> = React.memo(
  ({ className, dataAttr, hasDelivery, minimumPrice, name, items, isOpen }) => {
    const [searchValue, setSearchValue] = useState('')
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
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
            isOpen={isOpen}
          />
        </div>
        <div css={containerStyles}>
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
              <Button
                text={t('add_item')}
                size={BUTTON_SIZE.SMALL}
                onClick={() => setIsAddModalOpen(true)}
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

            {!items?.length && (
              <div className="restaurant-no-item">
                {t('restaurant_no_item')}
              </div>
            )}
          </div>
        </div>

        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          position={MODAL_POSITION.CENTER}
          mobileVerticalAlign={true}
        >
          <AddItem
            isOpen={isAddModalOpen}
            onCloseClick={() => setIsAddModalOpen(false)}
          />
        </Modal>
      </div>
    )
  },
)
