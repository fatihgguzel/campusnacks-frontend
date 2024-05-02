export enum MODAL_POSITION {
  CENTER = 'center',
  RIGHT = 'right',
}

export interface IModal {
  mobileVerticalAlign?: boolean
  position?: MODAL_POSITION
  isOpen: boolean
  children?: React.ReactElement
  animationDuration?: number
  onClose?: () => void
  preventClickOutside?: boolean
}
