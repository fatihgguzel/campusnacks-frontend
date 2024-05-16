import { valueOf } from '../types'

export const fontWeight = {
  regular: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
}

export type IFontWeight = valueOf<typeof fontWeight, string>
