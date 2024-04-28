import { values } from './values'

const createAccessor = <T extends Record<string, Record<string, number>>>(
  vals: T,
) => {
  return {
    ...vals,
  }
}

export const dimensions = createAccessor(values)

export type IDimensions = typeof dimensions
export { dimensions as IDimensions }
