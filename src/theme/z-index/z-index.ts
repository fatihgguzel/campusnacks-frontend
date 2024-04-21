import { valueOf } from '../../types'

export const zIndex = {
  hiddenItem: -1,
  icon: 2,
  header: 9,
  popUpMenu: 10,
  tooltip: 99,
  modal: 1000,
  toaster: 1001,
  dragPreview: 2000,
}

export type IZIndex = valueOf<typeof zIndex, number>
