import React, { useState } from 'react'
import { IRestaurantCard } from './types'
import placeholder from '../../../../assets/images/placeholder.svg'
import { cardInfoStyles, wrapperStyles } from './styles'
import { RestaurantInfo } from '../restaurant-info'

export const RestaurantCard: React.FC<IRestaurantCard> = React.memo(
  ({
    className,
    dataAttr,
    thumbnailUrl,
    deliveryTime,
    hasDelivery,
    isBusy,
    minimumPrice,
    restaurantId,
    restaurantName,
  }) => {
    const [isHovered, setIsHovered] = useState(false)

    return (
      <div
        css={wrapperStyles(isHovered)}
        className={className}
        {...dataAttr}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="restaurant-thumbnail-placeholder">
          <img
            className="placeholder-img"
            src={thumbnailUrl ? thumbnailUrl : placeholder}
          ></img>
        </div>
        <div css={cardInfoStyles}>
          <div className="restaurant-name">{restaurantName}</div>
          <div className="restaurant-info">
            <RestaurantInfo
              deliveryTime={deliveryTime}
              hasDelivery={hasDelivery}
              isBusy={isBusy}
              minimumPrice={minimumPrice}
            />
          </div>
        </div>
      </div>
    )
  },
)
