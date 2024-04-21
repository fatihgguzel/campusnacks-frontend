import { ITheme } from './index'

declare module '@emotion/react' {
  export interface Theme extends ITheme {}
}
