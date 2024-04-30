import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en'
import tr from './locales/tr'
import { capitalizeFirstLetter } from '../helpers/stringHelpers'

const lang = localStorage.getItem('currentLanguage')

i18n.use(initReactI18next).init({
  fallbackLng: 'tr',
  lng: lang || 'tr',
  resources: {
    en: {
      translations: en,
    },
    tr: {
      translations: tr,
    },
  },
  ns: ['translations'],
  defaultNS: 'translations',
})

i18n.services.formatter?.add('lowercase', (value) => {
  return value.toLowerCase()
})

i18n.services.formatter?.add('capitalizeFirstLetter', (value) => {
  return capitalizeFirstLetter(value)
})

i18n.languages = ['en', 'tr']

export default i18n
