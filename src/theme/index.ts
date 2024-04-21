import { useTheme as useEmotionTheme } from '@emotion/react'

import { borderRadius, IBorderRadius } from './borderRadius'
import { boxShadow, IBoxShadow } from './boxShadow'
import { breakpoints, IBreakpoints } from './breakpoints'
import { colors, IColors, COLOR } from './colors'
import { fontSize, IFontSize } from './fontSize'
import { fontStyle, IFontStyle } from './fontStyle'
import { fontWeight, IFontWeight } from './fontWeight'
import { gap, IGap } from './gap'
import { size, ISize } from './size'
import { spacing, ISpacing } from './spacing'
import { zIndex, IZIndex } from './z-index'

interface ITheme {
  borderRadius: IBorderRadius
  boxShadow: IBoxShadow
  breakpoints: IBreakpoints
  colors: IColors
  fontSize: IFontSize
  fontStyle: IFontStyle
  fontWeight: IFontWeight
  gap: IGap
  size: ISize
  spacing: ISpacing
  zIndex: IZIndex
}

export const theme: ITheme = {
  borderRadius,
  boxShadow,
  breakpoints,
  colors,
  fontSize,
  fontStyle,
  fontWeight,
  gap,
  size,
  spacing,
  zIndex,
}

export const useTheme = (): ITheme => useEmotionTheme() as ITheme

export {
  COLOR,
  borderRadius,
  boxShadow,
  breakpoints,
  colors,
  fontSize,
  fontStyle,
  fontWeight,
  gap,
  size,
  spacing,
  zIndex,
}

export type { ITheme }
