import { valueOf } from '../../types'

export enum COLOR {
  primary_100 = '#ff6600',
  secondary_100 = '#FFA500',

  textColor_100 = '#242424',
  textColor_2 = '#FFFFFF',

  red_100 = '#ff4444',
  red_90 = '#FF5757',
  red_20 = '#FFDADA',

  green_100 = '#7AD468',

  white_100 = '#ffffff',

  black_100 = '#000000',
  black_90 = '#1a1a1a',
  black_80 = '#333333',
  black_70 = '#4c4c4c',
  black_60 = '#666666',
  black_50 = '#808080',
  black_40 = '#999999',
  black_30 = '#b3b3b3',
  black_20 = '#cccccc',
  black_10 = '#e5e5e5',
}

export type ColorSet<T> = valueOf<T, COLOR>
