import { useState } from 'react'
import {
  postForgotPasswordBody,
  postLoginBody,
  postRegisterBody,
  postResetPasswordBody,
} from '../../types/api/requestObjects'
import {
  getRefreshTokenResponse,
  postLoginResponse,
  postRegisterResponse,
} from '../../types/api/responseObjects'
import { useAuthProvider } from '../../provider'
import { DateTimeService, RequestService } from '../../services'
import { RequestResponse, setAuthHeader } from '../../services/requestService'
import { API_CONFIG } from '../../config'

interface IUseAuthApi {
  login: (data: postLoginBody, isRestaurant: boolean) => Promise<void>
  signUp: (data: postRegisterBody) => Promise<void>
  refreshToken: () => Promise<boolean>
  sendPasswordResetEmail: (data: postForgotPasswordBody) => Promise<void>
  resetPassword: (data: postResetPasswordBody) => Promise<boolean>
  isLoading: boolean
}

export const useAuthApi = (): IUseAuthApi => {
  const { setToken, clearToken } = useAuthProvider()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const login = async (data: postLoginBody, isRestaurant: boolean) => {
    setIsLoading(true)
    try {
      const res: RequestResponse<postLoginResponse, any> =
        await RequestService.request({
          method: 'POST',
          url: isRestaurant
            ? API_CONFIG.AUTH_RESTAURANT_LOGIN
            : API_CONFIG.AUTH_LOGIN,
          data,
        })

      setToken(res.data.data.authToken)
    } catch {
      clearToken()
    } finally {
      setIsLoading(false)
    }
  }

  const signUp = async (data: postRegisterBody) => {
    setIsLoading(true)
    try {
      const res: RequestResponse<postRegisterResponse, any> =
        await RequestService.request({
          method: 'POST',
          url: API_CONFIG.AUTH_SIGNUP,
          data,
        })

      setToken(res.data.data.authToken)
    } catch {
      clearToken()
    } finally {
      setIsLoading(false)
    }
  }

  const refreshToken = async () => {
    setIsLoading(true)
    try {
      const res: RequestResponse<getRefreshTokenResponse, any> =
        await RequestService.request({
          method: 'GET',
          url: API_CONFIG.AUTH_REFRESH,
        })

      const token = res.data.data.authToken

      localStorage.setItem('token', token)
      localStorage.setItem('tokenCreatedAt', DateTimeService.now())
      setAuthHeader(token)

      return true
    } catch {
      clearToken()
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const sendPasswordResetEmail = async (data: postForgotPasswordBody) => {
    setIsLoading(true)
    try {
      await RequestService.request({
        method: 'POST',
        url: API_CONFIG.AUTH_PASSWORD_RESET_EMAIL,
        data,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const resetPassword = async (data: postResetPasswordBody) => {
    setIsLoading(true)
    try {
      await RequestService.request({
        method: 'POST',
        url: API_CONFIG.AUTH_PASSWORD_RESET,
        data,
      })

      return true
    } catch {
      return false
    } finally {
      setIsLoading(false)
    }
  }

  return {
    login,
    signUp,
    refreshToken,
    sendPasswordResetEmail,
    resetPassword,
    isLoading,
  }
}
