import { COLOR } from '../../theme'
import { dataAttrType } from '../../types'

export interface ILoader {
  isFullWidth?: boolean
  size?: number
  color?: COLOR
  className?: string
  dataAttr?: dataAttrType
}
