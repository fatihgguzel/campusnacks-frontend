import React from 'react'

import { ILoader } from './types'
import { loaderStyles, wrapperStyles } from './styles'
import { colors } from '../../theme'

export const Loader: React.FC<ILoader> = React.memo(
  ({
    size = 16,
    color = colors.primary.DEFAULT,
    isFullWidth = false,
    className,
    dataAttr,
  }) => {
    return (
      <div
        css={wrapperStyles({ isFullWidth })}
        className={className}
        {...dataAttr}
      >
        <div css={loaderStyles({ size, color })}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    )
  },
)
