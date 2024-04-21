import { valueOf } from '../types'

export const fontSize = {
  'xsmall': '10px',
  'small': '12px',
  'base': '14px',
  'medium': '16px',
  'large': '18px',
  'xlarge': '24px',
  '2xlarge': '36px',
  '3xlarge': '48px',
}

export type IFontSize = valueOf<typeof fontSize, string>
