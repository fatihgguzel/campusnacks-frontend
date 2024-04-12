import { useState, useEffect, useCallback } from 'react'
import { APP_CONFIG } from '../config'
import { useAuthApi } from './api/useAuthApi'

interface IUseIdleTimer {
  isIdle: boolean
  isExpired: boolean
}

export const useIdleTimer = (): IUseIdleTimer => {
  const [isIdle, setIsIdle] = useState(false)
  const [isExpired, setIsExpired] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { refreshToken } = useAuthApi()

  let idleTimer: number

  const resetIdleTimer = useCallback(() => {
    clearTimeout(idleTimer)
    idleTimer = window.setTimeout(() => {
      setIsIdle(true)
    }, APP_CONFIG.idleTimeout)
  }, [])

  const userInteraction = useCallback(async () => {
    if (isIdle && !isLoading && !isExpired) {
      setIsLoading(true)
      const refreshed = await refreshToken()
      setIsLoading(false)
      if (refreshed) {
        setIsIdle(false)
      } else {
        setIsExpired(true)
      }
    }

    resetIdleTimer()
  }, [isIdle, isLoading, isExpired, resetIdleTimer])

  useEffect(() => {
    resetIdleTimer()

    const events = [
      'mousemove',
      'keypress',
      'scroll',
      'touchstart',
      'mousedown',
      'visibilitychange',
      'focus',
    ]

    events.forEach((e) => window.addEventListener(e, userInteraction))
    return () => {
      events.forEach((e) => window.removeEventListener(e, userInteraction))
      clearTimeout(idleTimer)
    }
  }, [userInteraction, resetIdleTimer])

  useEffect(() => {
    resetIdleTimer()
  }, [resetIdleTimer])

  return { isIdle, isExpired }
}
