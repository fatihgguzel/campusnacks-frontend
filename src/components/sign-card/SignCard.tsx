import React, { useEffect, useState } from 'react'
import { ISignCard } from './types'
import { WelcomeForm } from './welcome-form'
import { signCardStyles } from './styles'
import { icons } from '../../lib'
import { Button, BUTTON_SIZE, BUTTON_TYPE, BUTTON_THEME } from '../button'
import { SIGN_CARD_TYPE } from './types'
import { COLOR } from '../../theme'
import { LoginForm } from './login-form'
import { SignUpForm } from './signup-form'

export const SignCard: React.FC<ISignCard> = React.memo(
  ({ className, dataAttr, onCloseclick, isOpen }) => {
    const [currentState, setCurrentState] = useState<SIGN_CARD_TYPE>(
      SIGN_CARD_TYPE.WELCOME,
    )

    useEffect(() => {
      if (isOpen) {
        setCurrentState(SIGN_CARD_TYPE.WELCOME)
      }
    }, [isOpen])

    const render = () => {
      switch (currentState) {
        case SIGN_CARD_TYPE.LOGIN:
          return (
            <LoginForm
              changeState={setCurrentState}
              onCloseclick={onCloseclick}
            />
          )
        case SIGN_CARD_TYPE.SIGNUP:
          return (
            <SignUpForm
              changeState={setCurrentState}
              onCloseclick={onCloseclick}
            />
          )
        case SIGN_CARD_TYPE.WELCOME:
          return (
            <WelcomeForm
              changeState={setCurrentState}
              onCloseclick={onCloseclick}
            />
          )
        default:
          return (
            <WelcomeForm
              changeState={setCurrentState}
              onCloseclick={onCloseclick}
            />
          )
      }
    }

    return (
      <div css={signCardStyles} className={className} {...dataAttr}>
        <div className="sign-card-header">
          <div className="back-button-area">
            {currentState !== SIGN_CARD_TYPE.WELCOME && (
              <Button
                icon={icons.chevron_left}
                iColor={COLOR.primary_100}
                size={BUTTON_SIZE.AUTO}
                type={BUTTON_TYPE.GHOST}
                theme={BUTTON_THEME.ELEMENTS}
                iconSize={20}
                onClick={() => setCurrentState(SIGN_CARD_TYPE.WELCOME)}
              />
            )}
          </div>
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
        </div>
        {render()}
      </div>
    )
  },
)
