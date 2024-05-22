export const APP_CONFIG = {
  requestRetry: {
    count: 3,
    delay: 1000,
  },
  authTokenExpireTime: 60 * 60,
  idleTimeout: 60 * 60 * 1000, // 1hour
}

export const BE_BASE_URL = 'http://localhost:3000/api/'

export interface JWTPayload {
  id: number
  jwtSecureCode: string
  isUser: boolean
}
