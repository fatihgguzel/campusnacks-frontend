import { SIGN_CARD_TYPE } from '../types'
import { dataAttrType } from '../../../types'

export interface IWelcomeForm {
  className?: string
  dataAttr?: dataAttrType
  changeState: (state: SIGN_CARD_TYPE) => void
  onCloseclick?: () => void
}
