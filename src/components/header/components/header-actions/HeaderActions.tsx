import React, { useState } from 'react'
import { RootState } from '../../../../store'
import { headerActionsStyles } from './styles'
import { IHeaderActions } from './types'
import { useTheme } from '../../../../theme'
import { useLanguage, useUserApi } from '../../../../hooks'
import { useSelector } from 'react-redux'
import { Button, BUTTON_TYPE } from '../../../button'
import { Modal, MODAL_POSITION } from '../../../modal'
import { SignCard } from '../../../sign-card'

export const HeaderActions: React.FC<IHeaderActions> = React.memo(
  ({ dataAttr, className }) => {
    const { colors } = useTheme()
    const { getUser } = useUserApi()
    const { t } = useLanguage()
    const [isSignModalOpen, setSignModalOpen] = useState(false)

    const { userData } = useSelector(({ user }: RootState) => ({
      userData: user.data,
    }))

    return (
      <>
        <div css={headerActionsStyles} className={className} {...dataAttr}>
          <Button
            text={t('login')}
            type={BUTTON_TYPE.REVERSE}
            height={35}
            onClick={() => setSignModalOpen(true)}
          />
          <Button
            text={t('signup')}
            className="signupButtonStyles"
            height={35}
            onClick={() => setSignModalOpen(true)}
          />
        </div>
        <Modal
          isOpen={isSignModalOpen}
          onClose={() => setSignModalOpen(false)}
          position={MODAL_POSITION.CENTER}
          mobileVerticalAlign={true}
        >
          <SignCard
            onCloseclick={() => setSignModalOpen(false)}
            isOpen={isSignModalOpen}
          />
        </Modal>
      </>
    )
  },
)
