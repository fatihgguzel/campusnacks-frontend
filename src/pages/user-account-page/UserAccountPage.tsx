import React from 'react'
import { wrapperStyles } from './styles'
import { UserAccount } from 'src/components/user-account'

export const UserAccountPage: React.FC = React.memo(() => {
  return (
    <div css={wrapperStyles}>
      <UserAccount />
    </div>
  )
})
