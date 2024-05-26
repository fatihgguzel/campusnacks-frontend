import { css } from '@emotion/react'
import { colors, ITheme } from '../../theme'

export const wrapperStyles = (theme: ITheme) => css`
  position: relative;
  width: 100%;
  overflow: hidden;
  height: 100vh;
  max-height: calc(100vh - ${theme.dimensions.headerHeight.DEFAULT}px);
  background: ${colors.background.DEFAULT};
`

export const headerLayoutStyle = (theme: ITheme) => css`
  position: sticky;
  top: 0;
  z-index: ${theme.zIndex.header};
`
