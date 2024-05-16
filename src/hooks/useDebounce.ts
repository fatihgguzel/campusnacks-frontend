import { useEffect, useState } from 'react'

type CallbackFunction = () => void

interface DebounceOptions {
  delay?: number
}

export const useDebouncer = (
  callback: CallbackFunction,
  options?: DebounceOptions,
): (() => void) => {
  const { delay = 300 } = options || {}
  const [timer, setTimer] = useState<number | null>(null)

  useEffect(() => {
    // Clear the existing timer on every render to avoid outdated calls
    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [timer])

  const debouncedCallback = () => {
    if (timer) {
      clearTimeout(timer)
    }

    // Set a new timer
    const newTimer = window.setTimeout(() => {
      callback()
    }, delay)

    setTimer(newTimer)
  }

  // Return the debounced callback function
  return debouncedCallback
}
