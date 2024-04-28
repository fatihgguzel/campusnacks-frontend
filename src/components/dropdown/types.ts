import { dataAttrType } from '../../types'
import { icons } from '../../lib'

export type IDropdownValue = string | number

export interface IDropdownItem {
  name: string
  value: IDropdownValue
  subMenu?: IDropdownItem[]
}

export enum DROPDOWN_TYPE {
  DEFAULT = 'default',
  GHOST = 'ghost',
}

export enum DROPDOWN_WIDTH {
  FULL = 'full',
  COLUMN = 'column',
  NORMAL = 'normal',
}

export enum DROPDOWN_THEME {
  DEFAULT = 'default',
  DARK = 'dark',
}

export enum DROPDOWN_SIZE {
  DEFAULT = 'default',
  BIG = 'big',
}

export enum DROPDOWN_MENU_POSITION {
  DEFAULT = 'default',
  UP = 'up',
}

type ValueFormatter = (val: string) => string
type NameFormatter = (val: string) => string

export interface IDropdown {
  placeholder?: string
  selected?: IDropdownValue
  items: IDropdownItem[]
  width?: DROPDOWN_WIDTH
  onChange?: (value?: IDropdownItem) => void
  onInputFocus?: () => void
  onInputBlur?: () => void
  type?: DROPDOWN_TYPE
  theme?: DROPDOWN_THEME
  size?: DROPDOWN_SIZE
  icon?: icons
  flexValue?: boolean
  flexFormatters?: [ValueFormatter] | [ValueFormatter, NameFormatter]
  className?: string
  dataAttr?: dataAttrType
  menuPosition?: DROPDOWN_MENU_POSITION
}

export type IDropdownMenu = Pick<
  IDropdown,
  'placeholder' | 'items' | 'selected' | 'type'
> & {
  onClick: (value?: IDropdownValue) => void
  menuLevel?: number
  theme?: DROPDOWN_THEME
  type?: DROPDOWN_TYPE
  menuPosition?: DROPDOWN_MENU_POSITION
}

export type IDropdownMenuItem = Pick<
  IDropdownMenu,
  'onClick' | 'selected' | 'menuLevel'
> & {
  isHovered?: boolean
  isActive?: boolean
  value: IDropdownValue
  subMenu?: IDropdownItem[]
  name: string
  onHover: (value?: IDropdownValue) => void
  theme?: DROPDOWN_THEME
  type?: DROPDOWN_TYPE
}

export type IDropdownSelect = {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  value?: IDropdownValue
  placeholder?: string
  items: IDropdownItem[]
  selected?: IDropdownValue
}

export type IDropdownOptions = Pick<
  IDropdownSelect,
  'items' | 'placeholder' | 'selected'
>
