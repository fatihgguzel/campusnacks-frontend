export type LoaderState<T> = {
  data?: T
  isLoading?: boolean
  isInitialRender?: boolean
}

export type StrictLoaderState<T> = {
  data: T
  isLoading?: boolean
}
