import { ColorSet } from './types'
import { primary } from './primary'
import { secondary } from './secondary'
import { text } from './text'
import { error } from './error'
import { success } from './success'
import { white } from './white'
import { black } from './black'
import { dark } from './dark'
import { elements } from './elements'
import { deactive } from './deactive'

export interface IColors {
  primary: ColorSet<typeof primary>
  secondary: ColorSet<typeof secondary>
  text: ColorSet<typeof text>
  error: ColorSet<typeof error>
  success: ColorSet<typeof success>
  white: ColorSet<typeof white>
  black: ColorSet<typeof black>
  dark: ColorSet<typeof dark>
  elements: ColorSet<typeof elements>
  deactive: ColorSet<typeof deactive>
}

export const colors: IColors = {
  primary,
  secondary,
  text,
  error,
  success,
  white,
  black,
  dark,
  elements,
  deactive,
}

export { COLOR } from './types'
