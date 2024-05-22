import React, { useState } from 'react'
import { IRestaurantContentCard } from './types'
import itemPlaceholder from '../../../../assets/images/item-placeholder.svg'
import { cardThumbnailStyles, wrapperStyles, cardContentStyles } from './styles'

export const RestaurantContentCard: React.FC<IRestaurantContentCard> =
  React.memo(({ name, description, price, imageUrl }) => {
    const [isHovered, setIsHovered] = useState(false)

    return (
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        css={wrapperStyles(isHovered)}
      >
        <div css={cardContentStyles}>
          <h3 className="content-name">{name}</h3>
          <div className="content-price">{price} TL</div>
          <div className="content-description">{description}</div>
        </div>
        <div css={cardThumbnailStyles(isHovered)}>
          <img
            className="placeholder-img"
            src={imageUrl ? imageUrl : itemPlaceholder}
          />
        </div>
      </div>
    )
  })
