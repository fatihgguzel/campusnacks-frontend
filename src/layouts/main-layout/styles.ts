import { css } from '@emotion/react'
import { ITheme } from '../../theme'

export const wrapperStyles = css`
  position: relative;
  width: 100%;
  overflow: hidden;
`

export const headerLayoutStyle = (theme: ITheme) => css`
  position: sticky;
  top: 0;
  z-index: ${theme.zIndex.header};
`
