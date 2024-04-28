import { Campuses } from '../types/api/enums'
import { useLanguage } from '../hooks'
import { TKey } from '../i18n/locales/en'

export const mapCampuses = () => {
  const { t } = useLanguage()
  const items: Array<{ name: string; value: string }> = []

  Object.keys(Campuses).forEach((campus) => {
    const campusFullName = t(campus as TKey)

    items.push({
      name: campusFullName,
      value: campus,
    })
  })

  return items
}
