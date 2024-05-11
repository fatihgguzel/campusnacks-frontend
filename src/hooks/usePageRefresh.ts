export const usePageRefresh = (callback?: () => void) => {
  callback?.()
  window.location.reload()
}

export default usePageRefresh
