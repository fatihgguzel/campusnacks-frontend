import { valueOf } from '../types'

export const gap = {
  '4xsmall': 2,
  '3xsmall': 4,
  '2xsmall': 6,
  'xsmall': 8,
  'small': 12,
  'medium': 16,
  'large': 20,
  'xlarge': 24,
  '2xlarge': 32,
  '3xlarge': 36,
  '4xlarge': 40,
  '5xlarge': 48,
  '6xlarge': 64,
  '7xlarge': 72,
  '8xlarge': 80,
}

export type IGap = valueOf<typeof gap, number>
