import React, { useCallback, useEffect, useState } from 'react'
import {
  Button,
  BUTTON_SIZE,
  BUTTON_THEME,
  BUTTON_TYPE,
  BUTTON_WIDTH,
} from '../../button'
import { VALIDATION_RULE_TYPES, useAuthApi, useLanguage } from '../../../hooks'
import { ILoginForm } from './types'
import { SIGN_CARD_TYPE } from '../types'
import { Input, INPUT_SIZE, INPUT_WIDTH } from '../../input'
import { actionsStyles, formInnerStyles } from './styles'
import { useNavigate } from 'react-router-dom'

export const LoginForm: React.FC<ILoginForm> = React.memo(
  ({ dataAttr, className, changeState, onCloseclick }) => {
    const { login, isLoading } = useAuthApi()
    const { t } = useLanguage()
    const [email, setEmail] = useState('')
    const [isEmailValid, setIsEmailValid] = useState(false)
    const [password, setPassword] = useState('')
    const [isPasswordValid, setIsPasswordValid] = useState(false)
    const [isRestaurant, setIsRestaurant] = useState(false)
    const navigate = useNavigate()

    const onSubmitHandler = useCallback(async () => {
      login({ email, password }, isRestaurant)

      onCloseclick?.()
    }, [email, password, isRestaurant])

    const onRestaurantClickHandler = useCallback(() => {
      setIsRestaurant(true)
    }, [])

    const onForgotClickHandler = useCallback(() => {
      //changeState(SIGN_CARD_TYPE.RESET_PASSWORD)
    }, [])

    const onEmailChange = (value: string) => {
      setEmail(value)
    }

    const onPasswordChange = (value: string) => {
      setPassword(value)
    }

    const [isFormValid, setIsFormValid] = useState(false)

    useEffect(() => {
      setIsFormValid(isEmailValid && isPasswordValid)
    }, [isEmailValid, isPasswordValid])

    return (
      <div css={formInnerStyles} className={className} {...dataAttr}>
        <Input
          size={INPUT_SIZE.SMALL}
          width={INPUT_WIDTH.FULL}
          label={t('email_address')}
          onChange={onEmailChange}
          value={email}
          onEnter={onSubmitHandler}
          errorAlignRight={true}
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
          name="email"
        />
        <Input
          size={INPUT_SIZE.SMALL}
          width={INPUT_WIDTH.FULL}
          label={t('password')}
          type="password"
          onChange={onPasswordChange}
          value={password}
          onEnter={onSubmitHandler}
          errorAlignRight={true}
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
          name="password"
        />
        <div css={actionsStyles}>
          <Button
            isLink
            size={BUTTON_SIZE.SMALL}
            text={t('forgot_password')}
            theme={BUTTON_THEME.PRIMARY}
            type={BUTTON_TYPE.GHOST}
            className="forgot-password"
            onClick={onForgotClickHandler}
          />
          <Button
            isLink
            size={BUTTON_SIZE.SMALL}
            text={t('are_you_restaurant')}
            theme={BUTTON_THEME.PRIMARY}
            type={BUTTON_TYPE.GHOST}
            className="forgot-password"
            onClick={onRestaurantClickHandler}
          />
          <Button
            size={BUTTON_SIZE.SMALL}
            text={isRestaurant ? t('login_as_restaurant') : t('login')}
            theme={BUTTON_THEME.PRIMARY}
            isLoading={isLoading}
            onClick={onSubmitHandler}
            width={BUTTON_WIDTH.FULL}
            disabled={!isFormValid}
          />
        </div>
      </div>
    )
  },
)
