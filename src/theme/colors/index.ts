import { ColorSet } from './types'
import { primary } from './primary'
import { secondary } from './secondary'
import { text } from './text'
import { error } from './error'
import { success } from './success'
import { white } from './white'
import { black } from './black'

export interface IColors {
  primary: ColorSet<typeof primary>
  secondary: ColorSet<typeof secondary>
  text: ColorSet<typeof text>
  error: ColorSet<typeof error>
  success: ColorSet<typeof success>
  white: ColorSet<typeof white>
  black: ColorSet<typeof black>
}

export const colors: IColors = {
  primary,
  secondary,
  text,
  error,
  success,
  white,
  black,
}

export { COLOR } from './types'
