import React from 'react'
import { IOrderCartItems } from './types'
import {
  wrapperStyles,
  imageContainerStyles,
  cartItemDetailsStyles,
} from './styles'
import cartItemPlaceholder from 'src/assets/images/cart-item-placeholder.svg'
import { Counter } from 'src/components/counter'
import { useDispatch } from 'react-redux'
import { addCartItem, removeCartItem } from 'src/store/order-cart'

export const OrderCartItem: React.FC<IOrderCartItems> = React.memo(
  ({ id, className, dataAttr, name, description, price, imageUrl, count }) => {
    const dispatch = useDispatch()

    return (
      <div className={className} {...dataAttr} css={wrapperStyles}>
        <div css={imageContainerStyles}>
          <img
            className="placeholder-img"
            src={imageUrl ? imageUrl : cartItemPlaceholder}
          />
        </div>
        <div css={cartItemDetailsStyles}>
          <span className="item-name">{name}</span>
          <div className="cart-item-details-bottom">
            <div className="item-price">{price * count} TL</div>
            <div className="item-counter">
              <Counter
                counter={count}
                onIncrement={() => {
                  dispatch(
                    addCartItem({
                      id,
                      count,
                      description,
                      name,
                      price,
                      imageUrl,
                    }),
                  )
                }}
                onDecrement={() =>
                  dispatch(
                    removeCartItem({
                      id,
                      count,
                      description,
                      name,
                      price,
                      imageUrl,
                    }),
                  )
                }
              />
            </div>
          </div>
        </div>
      </div>
    )
  },
)
