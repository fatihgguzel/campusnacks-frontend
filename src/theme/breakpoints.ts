import { valueOf } from '../types'

export const breakpoints = {
  small: 360,
  medium: 540,
  tablet: 768,
  laptop: 1024,
  desktop: 1280,
  large: 1536,
  xlarge: 1920,
  xxlarge: 2560,
}

export type IBreakpoints = valueOf<typeof breakpoints, number>
