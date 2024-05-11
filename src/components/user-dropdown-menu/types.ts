import { dataAttrType } from '../../types'
import { IDropdownItem, IDropdownValue } from '../dropdown'

export interface IUserDropdownMenu {
  items: IDropdownItem[]
  className?: string
  dataAttr?: dataAttrType
}

export enum DROPDOWN_MENU_WIDTH {
  FULL = 'full',
  LARGE = 'large',
  NORMAL = 'normal',
  SMALL = 'small',
}
