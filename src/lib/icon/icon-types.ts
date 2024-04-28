import { COLOR } from '../../theme'
import { icons } from './icon-list'

export interface IIcon {
  icon: icons
  size?: number
  className?: string
  onClick?: (event: React.MouseEvent<HTMLOrSVGElement, MouseEvent>) => void
  color?: COLOR
}
