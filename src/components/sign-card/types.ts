import { dataAttrType } from '../../types'

export interface ISignCard {
  className?: string
  dataAttr?: dataAttrType
  onCloseclick?: () => void
  isOpen: boolean
}

export enum SIGN_CARD_TYPE {
  WELCOME = 'welcome_form',
  LOGIN = 'login_form',
  SIGNUP = 'signup_form',
  RESET_PASSWORD = 'reset_password',
}
