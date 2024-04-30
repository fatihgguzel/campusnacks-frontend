import React, { useCallback, useState } from 'react'
import { RootState } from '../../../../store'
import { headerActionsStyles } from './styles'
import { IHeaderActions } from './types'
import { useTheme } from '../../../../theme'
import { useLanguage, useUserApi } from '../../../../hooks'
import { useSelector } from 'react-redux'
import { Button, BUTTON_TYPE } from '../../../button'

export const HeaderActions: React.FC<IHeaderActions> = React.memo(
  ({ dataAttr, className }) => {
    const { colors } = useTheme()
    const { getUser } = useUserApi()
    const { t } = useLanguage()

    const { userData } = useSelector(({ user }: RootState) => ({
      userData: user.data,
    }))

    return (
      <div css={headerActionsStyles} className={className} {...dataAttr}>
        <Button text={t('login')} type={BUTTON_TYPE.REVERSE} height={35} />
        <Button text={t('signup')} className="signupButtonStyles" height={35} />
      </div>
    )
  },
)
