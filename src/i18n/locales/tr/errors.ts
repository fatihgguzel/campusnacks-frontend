import { Errors } from '../../../types/api/Errors'

type IErrors = {
  [key in Errors]?: string
}

export const errors: IErrors = {
  [Errors.API_ERROR]: 'API Hatası',
  [Errors.JOI_SCHEMA_NOT_FOUND]: 'Joi şeması bulunamadı',
  [Errors.VALIDATION_EMAIL_MALFORMED]: 'E-posta formatı geçersiz',
  [Errors.VALIDATION_PASSWORD_LENGTH]: 'Şifre en az 6 karakter olmalıdır',
  [Errors.USER_EXIST]: 'Kullanıcı zaten mevcut',
  [Errors.RESTAURANT_EXIST]: 'Restoran zaten mevcut',
  [Errors.INVALID_CREDENTIALS]: 'Geçersiz kimlik bilgileri',
  [Errors.USE_GOOGLE_LOGIN]: 'Lütfen Google ile giriş yapın.',
  [Errors.FILE_NOT_FOUND]: 'Dosya bulunamadı',
  [Errors.USER_NOT_FOUND]: 'Kullanıcı bulunamadı',
  [Errors.REQUEST_NOT_FOUND_OR_EXPIRED]: 'İstek bulunamadı veya süresi geçmiş',
  [Errors.INCORRECT_PROVIDER]: 'Yanlış sağlayıcı',
  [Errors.RESTAURANT_NOT_FOUND]: 'Restoran bulunamadı',
  [Errors.NOT_AUTHORIZED]: 'Yetkiniz bulunmamakta',
  [Errors.ORDER_NOT_FOUND]: 'Sipariş bulunamadı',
}
