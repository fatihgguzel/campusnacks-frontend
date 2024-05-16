import { css } from '@emotion/react'
import { ITheme } from '../theme'

export const wrapperStyles = (theme: ITheme) => css`
  max-width: 100vw;
  height: calc(-${theme.dimensions.headerHeight.DEFAULT}px + 100vh);
  overflow: hidden auto;
  margin: 0 auto;
  display: flex;
  justify-content: center;
`
