import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import iziToast from 'izitoast'
import i18n from 'i18next'
import { theme } from '../theme'
import { getRefreshTokenResponse } from '../types/api/responseObjects'
import { APP_CONFIG, API_CONFIG } from '../config'
import { DateTimeService } from '.'
import env from 'react-dotenv'

export type RequestResponse<T, K> = AxiosResponse<T, K>

const localToken = localStorage.getItem('token')

export const extRequest = axios.create()

export const request = axios.create({
  baseURL: env?.BE_BASE_URL,
  headers: {
    common: {
      ...(localToken ? { Authorization: `Bearer ${localToken}` } : {}),
    },
  },
})

interface RetryConfig extends AxiosRequestConfig {
  retry: number
  retryDelay: number
}

const globalConfig: RetryConfig = {
  retry: APP_CONFIG.requestRetry.count,
  retryDelay: APP_CONFIG.requestRetry.delay,
}

request.interceptors.response.use(
  (response) => response,
  (error) => {
    const { config } = error

    // Session expired
    if ([401].includes(error?.response?.status)) {
      localStorage.removeItem('token')
      localStorage.removeItem('tokenCreatedAt')

      return Promise.reject(false)
    }

    if (
      config &&
      config.retry &&
      [501, 502, 503].includes(error.response.status)
    ) {
      config.retry -= 1

      const delayRetryRequest = new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve()
        }, config.retryDelay || 1000)
      })

      return delayRetryRequest.then(() => request(config))
    }

    iziToast.show({
      class: 'toaster',
      message:
        i18n.t(error.response.data.message).length > 0
          ? i18n.t(error.response.data.message)
          : i18n.t('something_wrong'),
      timeout: 3000,
      backgroundColor: theme.colors.error[90],
      messageColor: theme.colors.white.DEFAULT,
      animateInside: false,
      progressBar: false,
      close: false,
    })

    return Promise.reject(error ? error : i18n.t('something_wrong'))
  },
)

export const setAuthHeader = (token: string): void => {
  request.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export const deleteAuthorizationHeader = () => {
  delete request.defaults.headers.common['Authorization']
}

export const callApi = async (
  config: AxiosRequestConfig<any>,
): Promise<AxiosResponse> => {
  const localTokenCreatedAt = localStorage.getItem('tokenCreatedAt') || ''

  const isTokenExpired = DateTimeService.isTokenExpired(localTokenCreatedAt)

  if (isTokenExpired) {
    try {
      const res: RequestResponse<getRefreshTokenResponse, any> = await request({
        method: 'GET',
        url: API_CONFIG.AUTH_REFRESH,
      })

      request.defaults.headers.common['Authorization'] =
        `Bearer ${res.data.data.authToken}`

      localStorage.setItem('token', res.data.data.authToken)
      localStorage.setItem('tokenCreatedAt', DateTimeService.now())

      return request(config)
    } catch {
      localStorage.removeItem('token')
      localStorage.removeItem('tokenCreatedAt')
    }
  }

  return request({ ...config, ...globalConfig })
}
