import React, { useEffect, useState } from 'react'
import { IVendorAccount } from './types'
import { useSelector } from 'react-redux'
import { RootState } from 'src/store'
import { wrapperStyles } from './styles'
import { useLanguage, useRestaurantApi, VALIDATION_RULE_TYPES } from 'src/hooks'
import { Input, INPUT_SIZE, INPUT_WIDTH } from '../input'
import { Button, BUTTON_SIZE, BUTTON_WIDTH } from '../button'
import _ from 'lodash'

export const VendorAccount: React.FC<IVendorAccount> = React.memo(
  ({ className, dataAttr }) => {
    const { restaurant } = useSelector(({ restaurant }: RootState) => ({
      restaurant: restaurant.data,
    }))
    const { t } = useLanguage()
    const { updateRestaurant } = useRestaurantApi()

    const [phoneNumber, setPhoneNumber] = useState('')
    const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true)

    const [minimumPrice, setMinimumPrice] = useState('')
    const [isMinimumPriceValid, setIsMinimumPriceValid] = useState(true)

    const [isOpen, setIsOpen] = useState(restaurant?.isOpen)
    const [isBusy, setIsBusy] = useState(restaurant?.isBusy)

    const [isFormValid, setIsFormValid] = useState(false)

    const onSubmitHandler = () => {
      updateRestaurant({
        phone: phoneNumber,
        minimumPrice: Number(minimumPrice),
      })
    }

    const onIsOpenClick = () => {
      updateRestaurant({ isOpen: !isOpen })
    }

    const onIsBusyClick = () => {
      updateRestaurant({ isBusy: !isBusy })
    }

    useEffect(() => {
      if (restaurant) {
        setPhoneNumber(restaurant.phone)
        setMinimumPrice(restaurant.minimumPrice.toString())
        setIsOpen(restaurant.isOpen)
        setIsBusy(restaurant.isBusy)
      }
    }, [restaurant])

    useEffect(() => {
      setIsFormValid(
        isPhoneNumberValid &&
          isMinimumPriceValid &&
          _.isFinite(Number(minimumPrice)),
      )
    }, [isPhoneNumberValid, isMinimumPriceValid, minimumPrice])

    return (
      <div className={className} {...dataAttr} css={wrapperStyles}>
        <div className="account-header">{t('my_account')}</div>
        <div className="account-content">
          <div className="actions-header">{t('actions')}</div>
          <div className="restaurant-actions">
            {restaurant && (
              <Button
                text={isBusy ? t('busy_restaurant') : t('idle_restaurant')}
                onClick={() => onIsBusyClick()}
              />
            )}
            {restaurant && (
              <Button
                text={isOpen ? t('open_restaurant') : t('close_restaurant')}
                onClick={() => onIsOpenClick()}
              />
            )}
          </div>

          <div className="account-name">
            <Input
              label={t('restaurant_name')}
              value={restaurant?.name}
              width={INPUT_WIDTH.FULL}
              size={INPUT_SIZE.MEDIUM}
              disabled
            />
          </div>
          <div className="account-email">
            <Input
              label={t('email_address')}
              value={restaurant?.email}
              width={INPUT_WIDTH.FULL}
              size={INPUT_SIZE.MEDIUM}
              disabled
            />
          </div>
          <div className="account-phone-number">
            <Input
              type="phone_number"
              value={phoneNumber}
              onChange={setPhoneNumber}
              label={t('phone_number')}
              size={INPUT_SIZE.MEDIUM}
              width={INPUT_WIDTH.FULL}
              validation={{
                [VALIDATION_RULE_TYPES.REQUIRED]: {
                  text: t('validation.error.required', {
                    name: t('phone_number'),
                  }),
                },
              }}
              onValidation={setIsPhoneNumberValid}
              errorAlignRight
              optionalRender={true}
            />
          </div>
          <div className="account-address">
            <Input
              value={restaurant?.address.address}
              label={t('address')}
              size={INPUT_SIZE.MEDIUM}
              width={INPUT_WIDTH.FULL}
              disabled
            />
          </div>
          <div className="account-min-price">
            <Input
              value={minimumPrice}
              label={t('minimum_order')}
              onChange={setMinimumPrice}
              size={INPUT_SIZE.MEDIUM}
              width={INPUT_WIDTH.FULL}
              errorAlignRight
              validation={{
                [VALIDATION_RULE_TYPES.REQUIRED]: {
                  text: t('validation.error.required', {
                    name: t('minimum_order'),
                  }),
                },
              }}
              onValidation={setIsMinimumPriceValid}
            />
          </div>
          <div className="submit-action">
            <Button
              text={t('save')}
              disabled={!isFormValid}
              onClick={() => onSubmitHandler()}
              width={BUTTON_WIDTH.FULL}
              size={BUTTON_SIZE.LARGE}
            />
          </div>
        </div>
      </div>
    )
  },
)
