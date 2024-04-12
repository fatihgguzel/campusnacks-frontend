import { texts } from './texts'

const stringKeys = {
  ...texts,
}

export type TKey = keyof typeof stringKeys

export default {
  ...texts,
}
