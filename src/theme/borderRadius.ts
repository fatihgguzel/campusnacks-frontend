import { valueOf } from '../types'

export const borderRadius = {
  0: '0',
  DEFAULT: '50%',
  1: '1px',
  2: '2px',
  3: '3px',
  4: '4px',
  5: '5px',
  6: '6px',
  8: '8px',
  10: '10px',
  12: '12px',
  small: '18.5px',
  medium: '22.5px',
  large: '24px',
  xlarge: '52px',
}

export type IBorderRadius = valueOf<typeof borderRadius, string>
