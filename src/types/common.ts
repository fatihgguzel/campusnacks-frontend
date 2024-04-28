export type childrenType = React.ReactNode

export type dataAttrKeyType<Str extends string> = `data-${Str}`

export type valueOf<T, K> = { [key in keyof T]: K }

export type dataAttrType = {
  [key in dataAttrKeyType<string>]: any
}

export interface looseObject {
  [key: string]: any
}
