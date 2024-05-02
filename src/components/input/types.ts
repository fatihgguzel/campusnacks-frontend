import { HTMLInputTypeAttribute } from 'react'
import { ValidationRules } from '../../hooks'
import { icons } from '../../lib'
import { COLOR } from '../../theme'
import { dataAttrType } from '../../types'

export enum INPUT_SIZE {
  BIG = 'big',
  MEDIUM = 'medium',
  SMALL = 'small',
  XSMALL = 'xsmall',
}

export enum INPUT_WIDTH {
  FULL = 'full',
  WIDE = 'wide',
  NORMAL = 'normal',
  MEDIUM = 'medium',
  NARROW = 'narrow',
}

export enum INPUT_THEME {
  DARK = 'dark',
  LIGHT = 'light',
}

export enum INPUT_VARIANT {
  DEFAULT = 'default',
  GHOST = 'ghost',
  DASHED = 'dashed',
}

export interface IInput {
  label?: string
  type?: HTMLInputTypeAttribute
  value?: string
  numberValue?: number
  numberMin?: number
  numberMax?: number
  placeholder?: string
  size?: INPUT_SIZE
  width?: INPUT_WIDTH
  theme?: INPUT_THEME
  variant?: INPUT_VARIANT
  icon?: icons
  iconSize?: number
  disabled?: boolean
  clearButton?: boolean
  copyButton?: boolean
  errorText?: string
  solidError?: boolean
  validation?: ValidationRules
  squeezed?: boolean
  onChange?: (value: string) => void
  onChangeNumber?: (value: number) => void
  onEnter?: () => void
  onBlur?: () => void
  onFocus?: () => void
  onValidation?: (isValid: boolean) => void
  className?: string
  dataAttr?: dataAttrType
  name?: string
  errorAlignRight?: boolean
  labelTheme?: COLOR
  disabledCheckOnBlur?: boolean
  constantValidation?: boolean
}
