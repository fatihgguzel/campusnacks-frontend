import { dataAttrType } from '../../../types'
import { SIGN_CARD_TYPE } from '../types'

export interface ILoginForm {
  className?: string
  dataAttr?: dataAttrType
  onGoogleAuth?: () => void
  changeState: (state: SIGN_CARD_TYPE) => void
  onCloseclick?: () => void
}
