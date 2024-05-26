import { dataAttrType } from '../../types'

export enum HEADER_TYPE {
  DEFAULT = 'default',
}

export interface IHeader {
  type?: HEADER_TYPE
  className?: string
  dataAttr?: dataAttrType
  logoTo?: string
}
