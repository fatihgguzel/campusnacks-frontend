export function getEnumKeyByValue(
  enumObject: Record<string, string>,
  value: string,
): string | null {
  const keys = Object.keys(enumObject).filter(
    (key) => enumObject[key] === value,
  ) as string[]
  return keys.length > 0 ? keys[0] : null
}
