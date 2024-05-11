import { dataAttrType } from '../../types'

export enum SIDEBAR_TYPE {
  DEFAULT = 'default',
}

export interface ISidebar {
  type?: SIDEBAR_TYPE
  className?: string
  dataAttr?: dataAttrType
}
