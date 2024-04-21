import iziToast from 'izitoast'
import { useLanguage } from './useLanguage'
import { TKey } from '../i18n/locales/en'
import { theme } from '../theme'

export enum NOTIFICATION_TYPE {
  DEFAULT = 'default',
  ERROR = 'error',
  SUCCESS = 'success',
}

export const notificationConfig = (
  type: NOTIFICATION_TYPE = NOTIFICATION_TYPE.DEFAULT,
) => ({
  class: 'toaster',
  close: false,
  progressBar: false,
  timeout: 3000,
  messageColor: theme.colors.white.DEFAULT,
  animateInside: false,
  backgroundColor:
    type === NOTIFICATION_TYPE.SUCCESS
      ? theme.colors.primary.DEFAULT
      : type === NOTIFICATION_TYPE.ERROR
        ? theme.colors.error[90]
        : theme.colors.secondary.DEFAULT,
})

export const useNotification = () => {
  const { t } = useLanguage()

  const baseNotification = (
    type: NOTIFICATION_TYPE = NOTIFICATION_TYPE.DEFAULT,
    message: TKey,
    buttonText?: string,
    onClick?: () => void,
  ) => {
    iziToast.show({
      ...notificationConfig(type),
      message: t(message),
      ...(onClick
        ? {
            buttons: [[`<div>${buttonText}</div>`, onClick, true]],
          }
        : {}),
    })
  }

  const info = (message: TKey, buttonText?: string, onClick?: () => void) => {
    baseNotification(NOTIFICATION_TYPE.DEFAULT, message, buttonText, onClick)
  }

  const error = (message: TKey, buttonText?: string, onClick?: () => void) => {
    baseNotification(NOTIFICATION_TYPE.ERROR, message, buttonText, onClick)
  }

  const success = (
    message: TKey,
    buttonText?: string,
    onClick?: () => void,
  ) => {
    baseNotification(NOTIFICATION_TYPE.SUCCESS, message, buttonText, onClick)
  }

  return { success, error, info }
}
