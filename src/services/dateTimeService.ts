import { default as momentInstance, Moment } from 'moment'
import { APP_CONFIG } from '../config'
import 'moment/locale/tr'

const moment = momentInstance

moment.locale(localStorage.getItem('currentLanguage') || 'en')

export const now = () => moment().toISOString()

export const isExpired = (time: Moment | string): boolean => {
  return moment().isAfter(moment(time))
}

export const isTokenExpired = (time: Moment | string): boolean => {
  return isExpired(moment(time).add(APP_CONFIG.authTokenExpireTime, 'seconds'))
}

export const formatDate = (date?: Date | Moment | string | null): string => {
  return date ? moment(date).format('MMM D, YYYY') : ''
}

export const formatDateTime = (
  date?: Date | Moment | string | null,
): string => {
  return date ? moment(date).format('DD MMM YYYY h:mm A') : ''
}

export const getEpsilon = (date1: Date, date2: Date) => {
  return moment(date1).unix() - moment(date2).unix()
}

export { moment }
export type { Moment }
