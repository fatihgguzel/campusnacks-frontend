import React, { useState } from 'react'
import { IRestaurantContentCard } from './types'
import itemPlaceholder from '../../../../assets/images/item-placeholder.svg'
import {
  cardThumbnailStyles,
  wrapperStyles,
  cardContentStyles,
  addToCartStyles,
} from './styles'
import { Icon, icons } from '../../../../lib'
import { colors } from '../../../../theme'
import { useDispatch } from 'react-redux'
import { addCartItem } from '../../../../store/order-cart'
import { ICartItem } from '../../../../store/order-cart/types'

export const RestaurantContentCard: React.FC<IRestaurantContentCard> =
  React.memo(({ id, name, description, price, imageUrl }) => {
    const [isHovered, setIsHovered] = useState(false)
    const [isAddToCartHovered, setIsAddToCartHovered] = useState(false)
    const dispatch = useDispatch()

    const handleAddToCartClick = (cartItem: ICartItem) => {
      dispatch(
        addCartItem({
          id: cartItem.id,
          description: cartItem.description,
          name: cartItem.name,
          imageUrl: cartItem.imageUrl,
          price: cartItem.price,
          count: cartItem.count,
        }),
      )
    }

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
          <div
            css={addToCartStyles(isAddToCartHovered)}
            onMouseEnter={() => setIsAddToCartHovered(true)}
            onMouseLeave={() => setIsAddToCartHovered(false)}
            onClick={() =>
              handleAddToCartClick({
                id,
                name,
                description,
                imageUrl,
                price,
                count: 1,
              })
            }
          >
            <Icon icon={icons.plus} size={20} color={colors.primary.DEFAULT} />
          </div>
        </div>
      </div>
    )
  })
