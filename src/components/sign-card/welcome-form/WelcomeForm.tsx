import React from 'react'
import { IWelcomeForm } from './types'
import { useLanguage } from '../../../hooks'
import { Button, BUTTON_TYPE, BUTTON_WIDTH } from '../../button'
import { wrapperStyles } from './styles'
import { SIGN_CARD_TYPE } from '../types'

export const WelcomeForm: React.FC<IWelcomeForm> = React.memo(
  ({ dataAttr, className, changeState }) => {
    const { t } = useLanguage()

    return (
      <div css={wrapperStyles} className={className} {...dataAttr}>
        <div className="welcome-header">
          <h2>{t('sign_card_welcome_header')}</h2>
          <p>{t('sign_card_sign_info')}</p>
        </div>
        <div className="welcome-actions">
          <Button
            text={t('login')}
            width={BUTTON_WIDTH.FULL}
            onClick={() => changeState(SIGN_CARD_TYPE.LOGIN)}
          />
          <Button
            text={t('signup')}
            width={BUTTON_WIDTH.FULL}
            type={BUTTON_TYPE.REVERSE}
            onClick={() => changeState(SIGN_CARD_TYPE.SIGNUP)}
          />
        </div>
      </div>
    )
  },
)
