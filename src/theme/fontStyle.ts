import { valueOf } from '../types'

export const fontStyle = {
  'non-italic': 'normal',
  'italic': 'italic',
}

export type IFontStyle = valueOf<typeof fontStyle, string>
