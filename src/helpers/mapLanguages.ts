import { IDropdownItem } from '../components/dropdown'
import { Languages } from '../components/header/components/header-actions'

export const mapLanguages = () => {
  const items: Array<IDropdownItem> = []

  Object.keys(Languages).forEach((language) => {
    items.push({
      name: Languages[language as keyof typeof Languages],
      value: language,
    })
  })

  return items
}
