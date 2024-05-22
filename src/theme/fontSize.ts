import { valueOf } from '../types'

export const fontSize = {
  'xsmall': '10px',
  'small': '12px',
  'base': '14px',
  'medium': '16px',
  'large': '18px',
  'xlarge': '20px',
  '2xlarge': '24px',
  '3xlarge': '36px',
  '4xlarge': '48px',
}

export type IFontSize = valueOf<typeof fontSize, string>
