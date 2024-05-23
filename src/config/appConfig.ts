export const APP_CONFIG = {
  requestRetry: {
    count: 3,
    delay: 1000,
  },
  authTokenExpireTime: 60 * 60,
  idleTimeout: 60 * 60 * 1000, // 1hour
}

export interface JWTPayload {
  id: number
  jwtSecureCode: string
  isUser: boolean
}
