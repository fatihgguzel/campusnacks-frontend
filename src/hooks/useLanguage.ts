import { useMemo } from 'react'
import { useTranslation, Trans } from 'react-i18next'
import { TKey } from '../i18n/locales/en'

export const useLanguage = (): {
  dir: ReturnType<typeof i18n.dir>
  lang: typeof i18n.language
  t: (key: TKey, options?: any) => any
  changeLanguage: typeof i18n.changeLanguage
  Trans: typeof Trans
} => {
  const { t: translate, i18n } = useTranslation()

  const lang = i18n.language

  const dir = useMemo(() => i18n.dir(), [lang])

  const changeLanguage = i18n.changeLanguage

  const t = (key: TKey, options?: any) => {
    return translate(key, options)
  }

  return { dir, lang, t, changeLanguage, Trans }
}
