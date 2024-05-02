import React from 'react'
import { Icon } from '../../lib'
import { Loader } from '../../lib/loader'
import { useIconColor } from './hooks'
import { innerStyles, loadingStyles, wrapperStyles } from './styles'

import {
  BUTTON_SIZE,
  BUTTON_THEME,
  BUTTON_TYPE,
  BUTTON_WIDTH,
  IButton,
} from './types'

export const Button: React.FC<IButton> = React.memo(
  ({
    text,
    value,
    size = BUTTON_SIZE.SMALL,
    theme = BUTTON_THEME.PRIMARY,
    type = BUTTON_TYPE.DEFAULT,
    width = BUTTON_WIDTH.DEFAULT,
    icon,
    height,
    iconSize = 16,
    isLink = false,
    isLightText = false,
    isRounded = false,
    disabled = false,
    isLoading,
    preventFocus,
    onClick,
    className,
    dataAttr,
    iColor,
  }) => {
    const iconColor = useIconColor({ type, theme, disabled })

    return (
      <button
        onClick={!isLoading ? onClick : undefined}
        css={wrapperStyles({
          type,
          theme,
          text,
          isLink,
          size,
          isRounded,
          width,
          height,
          isLightText,
        })}
        className={className}
        disabled={disabled}
        value={value}
        {...dataAttr}
        {...(preventFocus ? { tabIndex: -1 } : {})}
      >
        <Loader
          size={6}
          isFullWidth
          css={loadingStyles({ isLoading })}
          color={iconColor}
        />
        <div css={innerStyles({ isLoading })}>
          {icon && (
            <Icon
              icon={icon}
              color={iColor ? iColor : iconColor}
              size={iconSize}
            />
          )}
          {text && <span className="button-text">{text}</span>}
        </div>
      </button>
    )
  },
)
