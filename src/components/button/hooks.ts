import { IButton, BUTTON_THEME, BUTTON_TYPE } from './types'
import { COLOR, colors } from '../../theme'

type IUseColorClasses = Pick<IButton, 'type' | 'theme' | 'disabled'>

export const useIconColor = ({
  theme,
  type,
  disabled,
}: IUseColorClasses): COLOR => {
  // for default type, text and icon colors are white for both disabled and active states
  if (type === BUTTON_TYPE.DEFAULT) {
    return theme === BUTTON_THEME.WHITE
      ? colors.black.DEFAULT
      : colors.white.DEFAULT
    // if it's not default type, disabled buttons should have deactive text/icon color
  } else if (disabled) {
    return colors.deactive.DEFAULT
  }

  switch (theme) {
    case BUTTON_THEME.PRIMARY:
      return colors.primary.DEFAULT
    case BUTTON_THEME.SECONDARY:
      return colors.secondary.DEFAULT
    case BUTTON_THEME.WHITE:
      return colors.white.DEFAULT
    case BUTTON_THEME.GRAY:
      return colors.text.DEFAULT
    case BUTTON_THEME.ELEMENTS:
      return colors.elements.DEFAULT
    default:
      return colors.black.DEFAULT
  }
}
