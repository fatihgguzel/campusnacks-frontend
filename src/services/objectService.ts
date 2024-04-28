import { looseObject } from '../types'

/**
 * flattenObjectArray is to flat object array that holds the same type
 * of structure recursively in any of it's field.
 *
 * eg: itemList[0].subList[0].subList[0]...
 */
interface IFlattenObjectArray<T> {
  array: T[]
  key: keyof T
}

export const flattenObjectArray = <T>({
  array,
  key,
}: IFlattenObjectArray<T>): T[] => {
  return array?.reduce((a: T[], c: T) => {
    if (c[key]) {
      return [
        ...a,
        c,
        ...(flattenObjectArray<T>({
          array: c[key] as T[],
          key,
        }) || []),
      ]
    }
    return [...a, c]
  }, [])
}

export const deepMerge = <T extends looseObject, U extends looseObject>(
  obj1: T,
  obj2: U,
): T & U => {
  if (typeof obj1 !== 'object' || obj1 === null || Array.isArray(obj1)) {
    return obj2 as T & U
  }

  const merged: any = { ...obj1 }

  const keys = Object.keys(obj2)
  for (const key of keys) {
    if (
      typeof obj2[key] === 'object' &&
      obj2[key] !== null &&
      !Array.isArray(obj2[key])
    ) {
      if (
        obj1[key] &&
        typeof obj1[key] === 'object' &&
        !Array.isArray(obj1[key])
      ) {
        merged[key] = deepMerge(obj1[key] as any, obj2[key] as any)
      } else {
        merged[key] = { ...obj2[key] }
      }
    } else {
      merged[key] = obj2[key]
    }
  }

  return merged as T & U
}
