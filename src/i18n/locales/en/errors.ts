import { Errors } from '../../../types/api/Errors'

type IErrors = {
  [key in Errors]?: string
}

export const errors: IErrors = {
  [Errors.API_ERROR]: 'API Error',
  [Errors.JOI_SCHEMA_NOT_FOUND]: 'Joi schema not found',
  [Errors.VALIDATION_EMAIL_MALFORMED]: 'Email is malformed',
  [Errors.VALIDATION_PASSWORD_LENGTH]:
    'Password must be at least 6 characters long',
  [Errors.USER_EXIST]: 'User already exists',
  [Errors.RESTAURANT_EXIST]: 'Restaurant already exists',
  [Errors.INVALID_CREDENTIALS]: 'Invalid credentials',
  [Errors.USE_GOOGLE_LOGIN]: 'Please use Google login',
  [Errors.FILE_NOT_FOUND]: 'File not found',
  [Errors.USER_NOT_FOUND]: 'User not found',
  [Errors.REQUEST_NOT_FOUND_OR_EXPIRED]: 'Request not found or expired',
  [Errors.INCORRECT_PROVIDER]: 'Incorrect provider',
  [Errors.RESTAURANT_NOT_FOUND]: 'Restaurant not found',
  [Errors.NOT_AUTHORIZED]: 'Not authorized',
  [Errors.ORDER_NOT_FOUND]: 'Order not found',
}
