import React from 'react'
import { IRestaurantInfo } from './types'
import { Icon, icons } from '../../../../lib'
import { wrapperStyles } from './styles'
import { colors } from '../../../../theme'
import { useLanguage } from '../../../../hooks'

export const RestaurantInfo: React.FC<IRestaurantInfo> = React.memo(
  ({ deliveryTime, hasDelivery, isBusy, minimumPrice }) => {
    const { t } = useLanguage()
    return (
      <div css={wrapperStyles}>
        <div className="first-row">
          <div className="min-price">{minimumPrice}TL minimum</div>

          {isBusy && (
            <>
              <div>•</div>
              <Icon
                icon={icons.busy}
                color={colors.primary.DEFAULT}
                size={16}
              />
              <div className="busy">{t('restaurant_busy')}</div>
            </>
          )}
        </div>
        <div className="second-row">
          <Icon icon={icons.clock} color={colors.primary.DEFAULT} size={16} />
          <div className="delivery-time">{deliveryTime} min</div>

          {hasDelivery && (
            <>
              <div>•</div>
              <Icon
                icon={icons.delivery}
                size={16}
                color={colors.primary.DEFAULT}
              />
              <div className="has-delivery">{t('restaurant_has_delivery')}</div>
            </>
          )}
        </div>
      </div>
    )
  },
)
