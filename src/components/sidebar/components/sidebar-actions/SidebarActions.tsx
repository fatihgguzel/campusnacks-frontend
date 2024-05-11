import React, { useCallback } from 'react'
import { Button } from '../../../button'
import { ISidebarActions } from './types'
import { useLanguage } from '../../../../hooks'
import { useNavigate } from 'react-router-dom'
import { sidebarActionsStyles } from './styles'

export const SidebarActions: React.FC<ISidebarActions> = () => {
  const { t } = useLanguage()
  const navigate = useNavigate()
  const handleOnClick = useCallback((link: string) => {
    navigate(link, { replace: true })
  }, [])

  return (
    <>
      <div css={sidebarActionsStyles}>
        <Button
          text={t('sidebar.action1')}
          onClick={() => handleOnClick('/')}
        />
        <Button
          text={t('sidebar.action2')}
          onClick={() => handleOnClick('/')}
        />
      </div>
    </>
  )
}
