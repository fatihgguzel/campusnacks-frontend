import { dataAttrType } from '../../../types'
import { SIGN_CARD_TYPE } from '../types'

export interface ISignUpForm {
  className?: string
  dataAttr?: dataAttrType
  onGoogleAuth?: () => void
  onCloseclick?: () => void
  changeState: (state: SIGN_CARD_TYPE) => void
}
