import { useEffect, RefObject } from 'react'

type Event = MouseEvent | TouchEvent

export const useClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: Event) => void,
  options?: { events?: (keyof DocumentEventMap)[] },
) => {
  useEffect(() => {
    const listener = (event: any) => {
      const el = ref?.current

      if (!el || el.contains((event?.target as Node) || null)) {
        return
      }

      handler(event)
    }

    options?.events?.forEach((eventType) => {
      document.addEventListener(eventType, listener)
    })

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      options?.events?.forEach((eventType) => {
        document.removeEventListener(eventType, listener)
      })

      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, handler])
}
