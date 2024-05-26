import React from 'react'
import { wrapperStyles } from './styles'
import { VendorAccount } from 'src/components/vendor-account'

export const VendorAccountPage: React.FC = React.memo(() => {
  return (
    <div css={wrapperStyles}>
      <VendorAccount />
    </div>
  )
})
