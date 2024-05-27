import React, { useEffect, useState } from 'react'
import { IOrderDetails } from './types'
import { wrapperStyles } from './styles'
import { getOrderDetailsResponse } from 'src/types/api/responseObjects'
import { useLanguage, useRestaurantApi, useUserApi } from 'src/hooks'
import {
  Button,
  BUTTON_SIZE,
  BUTTON_TYPE,
  BUTTON_THEME,
} from 'src/components/button'
import { icons } from 'src/lib'
import { COLOR } from 'src/theme'

export const OrderDetails: React.FC<IOrderDetails> = React.memo(
  ({ className, dataAttr, orderId, onCloseclick, isOpen, isUserOrders }) => {
    const [orderDetails, setOrderDetails] =
      useState<getOrderDetailsResponse['data']['order']>(undefined)
    const { t } = useLanguage()
    const { getOrderDetails: getRestaurantOrderDetails } = useRestaurantApi()
    const { getOrderDetails: getUserOrderDetails } = useUserApi()

    useEffect(() => {
      const fetchOrderDetails = async () => {
        const orderDetailsResponse = isUserOrders
          ? await getUserOrderDetails({ orderId })
          : await getRestaurantOrderDetails({ orderId })

        setOrderDetails(orderDetailsResponse.order)
      }

      isOpen && fetchOrderDetails()
    }, [isOpen])
    return (
      <div css={wrapperStyles} className={className} {...dataAttr}>
        <div className="close-button-area">
          <Button
            icon={icons.close}
            iColor={COLOR.primary_100}
            size={BUTTON_SIZE.AUTO}
            type={BUTTON_TYPE.GHOST}
            theme={BUTTON_THEME.ELEMENTS}
            iconSize={20}
            onClick={onCloseclick}
          />
        </div>
        <div className="customer-name title-wrapper">
          <div className="customer-name-key key">{t('fullName')}:</div>
          <div className="customer-name-value value">
            {orderDetails?.user.fullName}
          </div>
        </div>
        <div className="customer-phone title-wrapper">
          <div className="customer-phone-key key">{t('phone_number')}:</div>
          <div className="customer-phone-value value">
            {orderDetails?.user.phoneNumber}
          </div>
        </div>

        <div className="customer-city title-wrapper">
          <div className="customer-city-key key">{t('city')}:</div>
          <div className="customer-city-value value">
            {orderDetails?.user.address.city}
          </div>
        </div>
        <div className="customer-district title-wrapper">
          <div className="customer-district-key key">{t('district')}:</div>
          <div className="customer-district-value value">
            {orderDetails?.user.address.district}
          </div>
        </div>
        <div className="customer-address title-wrapper">
          <div className="customer-address-key key">{t('address')}:</div>
          <div className="customer-address-value value">
            {orderDetails?.user.address.address}
          </div>
        </div>
        <div className="customer-order-items title-wrapper">
          <div className="customer-order-items-key key">{t('items')}</div>
          <div className="order-item-info-wrapper">
            {orderDetails?.orderItems.map((orderItem) => (
              <div className="order-wrapper" key={orderItem.id}>
                <div className="order-item-info">
                  <div className="order-item-count-info">
                    {orderItem.count}x {orderItem.item.name}
                  </div>
                  <div className="order-item-price-info">
                    {(orderItem.count * orderItem.item.price).toFixed(2)} TL
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  },
)
