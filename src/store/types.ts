export type LoaderState<T> = {
  data?: T
  isLoading?: boolean
}

export type StrictLoaderState<T> = {
  data: T
  isLoading?: boolean
}
