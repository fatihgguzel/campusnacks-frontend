import { texts } from './texts'
import { errors } from './errors'

const stringKeys = {
  ...texts,
  ...errors,
}

export type TKey = keyof typeof stringKeys

export default {
  ...texts,
  ...errors,
}
