import { valueOf } from '../../types'

export enum COLOR {
  primary_110 = '#e65c00',
  primary_100 = '#ff751a',
  primary_10 = '#ffe0cc',

  secondary_100 = '#FFA500',

  textColor_100 = '#242424',
  textColor_2 = '#9AA0AB',

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

  dark_100 = '#662900',
  dark_60 = '#7d7d84',

  dark2_100 = '#d7d7db',

  gray_60 = '#707070',

  background_100 = '#EFF2F8',

  outline_100 = '#E5E5E8',

  overlay_modal = '#212121',
  overlay_card = '#993d00',
  overlay_card2 = '#662900',

  border_100 = '#ebebeb',
}

export type ColorSet<T> = valueOf<T, COLOR>
