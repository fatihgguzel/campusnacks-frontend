import React from 'react'
import { IRestaurantContentInfo } from './types'
import { Icon, icons } from '../../../../lib'
import { colors } from '../../../../theme'
import { useLanguage } from '../../../../hooks'

export const RestaurantContentInfo: React.FC<IRestaurantContentInfo> =
  React.memo(({ name, hasDelivery, minimumPrice, isOpen }) => {
    const { t } = useLanguage()

    return (
      <>
        <h1 className="restaurant-info-header">{name}</h1>
        <div className="restaurant-info-row">
          {hasDelivery && (
            <>
              <Icon
                icon={icons.delivery}
                size={16}
                color={colors.primary.DEFAULT}
              />
              <div className="has-delivery">{t('restaurant_has_delivery')}</div>

              <div className="seperator">•</div>
            </>
          )}
          <Icon
            icon={icons.shopping_basket}
            size={16}
            color={colors.primary.DEFAULT}
          />
          <div className="minimum-price">{minimumPrice}TL Minimum</div>
          <div className="seperator">•</div>
          <Icon icon={icons.open} size={20} color={colors.primary.DEFAULT} />
          <div className="is-open">
            {isOpen ? t('restaurant_open') : t('restaurant_closed')}
          </div>
        </div>
      </>
    )
  })
