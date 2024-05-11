import React, { useCallback, useEffect, useState } from 'react'
import { ISignUpForm } from './types'
import {
  Button,
  BUTTON_SIZE,
  BUTTON_THEME,
  BUTTON_TYPE,
  BUTTON_WIDTH,
} from '../../button'
import { useAuthApi, useLanguage, VALIDATION_RULE_TYPES } from '../../../hooks'
import { Input, INPUT_SIZE, INPUT_WIDTH } from '../../input'
import { SIGN_CARD_TYPE } from '../types'
import { formInnerStyles, actionsStyles } from './styles'
import { CITIES, DISTRICTS } from '../../../config'
import { icons } from '../../../lib'

export const SignUpForm: React.FC<ISignUpForm> = React.memo(
  ({ className, dataAttr, changeState }) => {
    const { t } = useLanguage()
    const { signUp, isLoading } = useAuthApi()
    const [fullName, setFullName] = useState('')
    const [isFullNameValid, setisFullNameValid] = useState(false)
    const [email, setEmail] = useState('')
    const [isEmailValid, setIsEmailValid] = useState(false)
    const [phoneNumber, setPhoneNumber] = useState('')
    const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(false)
    const [city, setCity] = useState('İzmir')
    const [isCityValid, setIsCityValid] = useState(false)
    const [district, setDistrict] = useState('Urla')
    const [isDistrictValid, setIsDistrictValid] = useState(false)
    const [address, setAddress] = useState('')
    const [isAddressValid, setIsAddressValid] = useState(false)
    const [password, setPassword] = useState('')
    const [isPasswordValid, setIsPasswordValid] = useState(false)

    const onSubmitHandler = useCallback(() => {
      signUp({
        fullName,
        email,
        password,
        address,
        city,
        district,
        phoneNumber,
      })
    }, [fullName, email, password, phoneNumber, address])

    const onLoginClickHandler = useCallback(() => {
      changeState(SIGN_CARD_TYPE.LOGIN)
    }, [])

    const [isFormValid, setIsFormValid] = useState(false)

    useEffect(() => {
      setIsFormValid(
        isFullNameValid &&
          isEmailValid &&
          isPasswordValid &&
          isPhoneNumberValid &&
          isAddressValid,
      )
    }, [
      isFullNameValid,
      isEmailValid,
      isPasswordValid,
      isPhoneNumberValid,
      isAddressValid,
    ])

    return (
      <div css={formInnerStyles} className={className} {...dataAttr}>
        <Input
          size={INPUT_SIZE.SMALL}
          width={INPUT_WIDTH.FULL}
          label={t('fullName')}
          value={fullName}
          onChange={setFullName}
          onEnter={onSubmitHandler}
          validation={{
            [VALIDATION_RULE_TYPES.REQUIRED]: {
              text: t('validation.error.required', {
                name: t('fullName'),
              }),
            },
          }}
          onValidation={setisFullNameValid}
          errorAlignRight
        />
        <Input
          size={INPUT_SIZE.SMALL}
          width={INPUT_WIDTH.FULL}
          label={t('email_address')}
          onChange={setEmail}
          value={email}
          onEnter={onSubmitHandler}
          validation={{
            [VALIDATION_RULE_TYPES.REQUIRED]: {
              text: t('validation.error.required', {
                name: t('email_address'),
              }),
            },
            [VALIDATION_RULE_TYPES.VALIDMAIL]: {
              text: t('validation.error.email'),
            },
          }}
          onValidation={setIsEmailValid}
          errorAlignRight
        />
        <Input
          type="phone_number"
          value={phoneNumber}
          onChange={setPhoneNumber}
          label={t('phone_number')}
          size={INPUT_SIZE.SMALL}
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
        <Input
          type="textarea"
          value={address}
          onChange={setAddress}
          label={t('address')}
          size={INPUT_SIZE.SMALL}
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
        {/* <Input
          size={INPUT_SIZE.SMALL}
          width={INPUT_WIDTH.FULL}
          label={t('city')}
          type="dropdown"
          onChange={setCity}
          icon={icons.chevron_down}
          placeholder=""
          value={city}
          items={CITIES}
          validation={{
            [VALIDATION_RULE_TYPES.REQUIRED]: {
              text: t('validation.error.required', {
                name: t('address'),
              }),
            },
          }}
          onValidation={setIsCityValid}
          errorAlignRight
          disabled={true}
        />
        <Input
          size={INPUT_SIZE.SMALL}
          width={INPUT_WIDTH.FULL}
          label={t('district')}
          type="dropdown"
          onChange={setDistrict}
          icon={icons.chevron_down}
          placeholder=""
          value={district}
          items={DISTRICTS[city]}
          validation={{
            [VALIDATION_RULE_TYPES.REQUIRED]: {
              text: t('validation.error.required', {
                name: t('district'),
              }),
            },
          }}
          onValidation={setIsDistrictValid}
          errorAlignRight
          disabled={true}
        /> */}
        <Input
          size={INPUT_SIZE.SMALL}
          width={INPUT_WIDTH.FULL}
          label={t('password')}
          type="password"
          onChange={setPassword}
          value={password}
          onEnter={onSubmitHandler}
          validation={{
            [VALIDATION_RULE_TYPES.REQUIRED]: {
              text: t('validation.error.required', {
                name: t('password'),
              }),
            },
            [VALIDATION_RULE_TYPES.MIN]: {
              value: 6,
              text: t('validation.min_char', {
                name: t('password'),
                value: 6,
              }),
            },
          }}
          onValidation={setIsPasswordValid}
          errorAlignRight
        />
        <div css={actionsStyles}>
          <Button
            size={BUTTON_SIZE.SMALL}
            text={t('create_account')}
            theme={BUTTON_THEME.PRIMARY}
            width={BUTTON_WIDTH.FULL}
            onClick={onSubmitHandler}
            isLoading={isLoading}
            disabled={!isFormValid}
          />
          <div>
            {t('already_member')}{' '}
            <Button
              isLink
              size={BUTTON_SIZE.LARGE}
              text={t('login')}
              theme={BUTTON_THEME.PRIMARY}
              type={BUTTON_TYPE.GHOST}
              onClick={onLoginClickHandler}
            />
          </div>
        </div>
      </div>
    )
  },
)
