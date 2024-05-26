import React, { useMemo, useState } from 'react'
import { IOrderCart } from './types'
import { footerStyles, wrapperStyles } from './styles'
import { useLanguage, useUserApi } from '../../hooks'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import { Button, BUTTON_SIZE, BUTTON_WIDTH } from '../button'
import { OrderCartItem } from './components'
import { Modal, MODAL_POSITION } from '../modal'
import { SignCard } from '../sign-card'
import { clearCartItems } from 'src/store/order-cart'

export const OrderCart: React.FC<IOrderCart> = React.memo(
  ({ className, dataAttr, minimumPrice }) => {
    const { t } = useLanguage()
    const { cartItems, user, restaurantId } = useSelector(
      ({ orderCart, user }: RootState) => ({
        cartItems: orderCart.cartItems,
        user: user.data,
        restaurantId: orderCart.restaurantId,
      }),
    )

    const dispatch = useDispatch()
    const [isSignModalOpen, setIsSignModalOpen] = useState(false)
    const { giveOrder } = useUserApi()

    const totalPrice = useMemo(() => {
      let totalPrice = 0

      cartItems.forEach(
        (cartItem) => (totalPrice += cartItem.price * cartItem.count),
      )

      return totalPrice
    }, [cartItems])

    const orderDisabled = useMemo(() => {
      return !(cartItems.length > 0) || totalPrice < minimumPrice
    }, [cartItems])

    const handleConfirmOrder = () => {
      if (!user) {
        setIsSignModalOpen(true)
      } else {
        giveOrder({
          restaurantId: restaurantId!,
          items: cartItems.map((cartItem) => {
            return {
              itemId: cartItem.id,
              count: cartItem.count,
            }
          }),
        })
        dispatch(clearCartItems())
      }
    }

    return (
      <div className={className} {...dataAttr} css={wrapperStyles}>
        <div className="order-cart-container">
          <div className="order-cart-header">{t('your_items')}</div>
          <div className="order-cart-items">
            {cartItems.map((cartItem) => (
              <OrderCartItem
                key={cartItem.id}
                name={cartItem.name}
                price={cartItem.price}
                imageUrl={cartItem.imageUrl}
                id={cartItem.id}
                description={cartItem.description}
                count={cartItem.count}
              />
            ))}
          </div>
        </div>
        <div css={footerStyles}>
          <div className="footer-info">
            <span className="footer-total">{t('total_price')}</span>
            <span className="footer-price">{totalPrice.toFixed(2)} TL</span>
          </div>
          <div className="footer-button">
            <Button
              width={BUTTON_WIDTH.FULL}
              text={t('confirm_order')}
              disabled={orderDisabled}
              size={BUTTON_SIZE.LARGE}
              onClick={() => handleConfirmOrder()}
            />
          </div>
        </div>
        <Modal
          isOpen={isSignModalOpen}
          onClose={() => setIsSignModalOpen(false)}
          position={MODAL_POSITION.CENTER}
          mobileVerticalAlign={true}
        >
          <SignCard
            onCloseclick={() => setIsSignModalOpen(false)}
            isOpen={isSignModalOpen}
          />
        </Modal>
      </div>
    )
  },
)
