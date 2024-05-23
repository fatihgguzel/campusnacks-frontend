import React from 'react'
import { ICounter } from './types'
import { Icon, icons } from 'src/lib'
import { colors } from 'src/theme'
import { wrapperStyles } from './styles'

export const Counter: React.FC<ICounter> = React.memo(
  ({ counter, onIncrement, onDecrement }) => {
    return (
      <div css={wrapperStyles}>
        <div className="decrement" onClick={() => onDecrement()}>
          <Icon icon={icons.minus} color={colors.primary.DEFAULT} size={14} />
        </div>
        <div className="counter">{counter}</div>
        <div className="increment" onClick={() => onIncrement()}>
          <Icon icon={icons.plus} color={colors.primary.DEFAULT} size={14} />
        </div>
      </div>
    )
  },
)
