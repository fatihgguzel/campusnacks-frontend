import { valueOf } from '../types'

export const boxShadow = {
  1: '5px 5px 8px 0 rgba(0, 0, 0, 0.05)',
  DEFAULT: '10px 10px 16px 0 rgba(0, 0, 0, 0.10)',
  2: '10px 10px 16px 0 rgba(0, 0, 0, 0.10)',
  3: '0 4px 4px 0 rgba(0, 0, 0, 0.25)',
  4: '0 4px 24px 0 rgba(0, 0, 0, 0.25)',
  5: '0px 2.94px 14.7px 7.35px rgba(79, 97, 255, 0.12)',
  6: '0 2px 6px 0 rgba(0, 0, 0, 0.25)',
  7: '0px 4px 18px 0px rgba(0, 0, 0, 0.12)',
}

export type IBoxShadow = valueOf<typeof boxShadow, string>
