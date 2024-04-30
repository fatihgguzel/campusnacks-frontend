import { icons } from '../../lib'
import { dataAttrType } from '../../types'

export enum BUTTON_SIZE {
  XSMALL = 'xs',
  SMALL = 's',
  LARGE = 'large',
  XLARGE = 'xlarge',
  AUTO = 'auto',
}

export enum BUTTON_WIDTH {
  DEFAULT = 'default',
  FULL = 'full',
}

export enum BUTTON_THEME {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  WHITE = 'white',
  GRAY = 'gray',
  DARK = 'dark',
  ELEMENTS = 'elements',
}

export enum BUTTON_TYPE {
  DEFAULT = 'default',
  REVERSE = 'reverse',
  GHOST = 'ghost',
}

export interface IButton {
  text?: string
  value?: string
  size?: BUTTON_SIZE
  disabled?: boolean
  theme?: BUTTON_THEME
  height?: number
  type?: BUTTON_TYPE
  width?: BUTTON_WIDTH
  isRounded?: boolean
  isLink?: boolean
  isLightText?: boolean
  icon?: icons
  iconSize?: number
  isLoading?: boolean
  preventFocus?: boolean
  onClick?: (event?: React.MouseEvent<HTMLButtonElement>) => void
  className?: string
  dataAttr?: dataAttrType
}

export type IColorStylesMapping = {
  [key in BUTTON_TYPE]: {
    defaults: string
    theme: {
      [key in BUTTON_THEME]: string
    }
  }
}
