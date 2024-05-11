import { dataAttrType } from '../../types'

export enum TEXTAREA_THEME {
  LIGHT = 'light',
  DARK = 'dark',
}

export interface ITextArea {
  value: string
  label?: string
  placeholder?: string
  rows?: number
  theme?: TEXTAREA_THEME.DARK
  onChange: (value: string) => void
  onBlur?: () => void
  onFocus?: () => void
  className?: string
  dataAttr?: dataAttrType
  note?: boolean
  isValid?: boolean
}
