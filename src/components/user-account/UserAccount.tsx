import React, { useEffect, useState } from 'react'
import { IUserAccount } from './types'
import { useSelector } from 'react-redux'
import { RootState } from 'src/store'
import { wrapperStyles } from './styles'
import { useLanguage, useUserApi, VALIDATION_RULE_TYPES } from 'src/hooks'
import { Input, INPUT_SIZE, INPUT_WIDTH } from '../input'
import { Button, BUTTON_SIZE, BUTTON_WIDTH } from '../button'

export const UserAccount: React.FC<IUserAccount> = React.memo(
  ({ className, dataAttr }) => {
    const { updateUser } = useUserApi()
    const { user } = useSelector(({ user }: RootState) => ({
      user: user.data,
    }))
    const { t } = useLanguage()

    const [phoneNumber, setPhoneNumber] = useState('')
    const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true)

    const [address, setAddress] = useState('')
    const [isAddressValid, setIsAddressValid] = useState(true)

    const [isFormValid, setIsFormValid] = useState(false)

    const onSubmitHandler = () => {
      updateUser({ phoneNumber, address })
    }

    useEffect(() => {
      if (user) {
        setAddress(user.address.address)
        setPhoneNumber(user.phoneNumber)
      }
    }, [user])

    useEffect(() => {
      setIsFormValid(isPhoneNumberValid && isAddressValid)
    }, [isPhoneNumberValid, isAddressValid])

    return (
      <div className={className} {...dataAttr} css={wrapperStyles}>
        <div className="account-header">{t('my_account')}</div>
        <div className="account-content">
          <div className="account-name">
            <Input
              label={t('fullName')}
              value={user?.fullName}
              width={INPUT_WIDTH.FULL}
              size={INPUT_SIZE.MEDIUM}
              disabled
            />
          </div>
          <div className="account-email">
            <Input
              label={t('email_address')}
              value={user?.email}
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
              type="textarea"
              value={address}
              onChange={setAddress}
              label={t('address')}
              size={INPUT_SIZE.MEDIUM}
              width={INPUT_WIDTH.FULL}
              validation={{
                [VALIDATION_RULE_TYPES.REQUIRED]: {
                  text: t('validation.error.required', {
                    name: t('address'),
                  }),
                },
              }}
              optionalRender={true}
              onValidation={setIsAddressValid}
              errorAlignRight
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
