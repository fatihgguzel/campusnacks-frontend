import { valueOf } from '../types'

export const spacing = {
  '5xsmall': '2px',
  '4xsmall': '4px',
  '3xsmall': '6px',
  '2xsmall': '8px',
  'xsmall': '10px',
  'small': '12px',
  'medium': '16px',
  'large': '20px',
  'xlarge': '24px',
  '2xlarge': '32px',
  '3xlarge': '36px',
  '4xlarge': '40px',
  '5xlarge': '48px',
  '6xlarge': '64px',
  '7xlarge': '72px',
  '8xlarge': '80px',
}

export type ISpacing = valueOf<typeof spacing, string>
