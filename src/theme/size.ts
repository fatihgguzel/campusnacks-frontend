import { valueOf } from '../types'

export const size = {
  elementHeightSmall: 35,
  elementHeightBig: 46,
}

export type ISize = valueOf<typeof size, number>
