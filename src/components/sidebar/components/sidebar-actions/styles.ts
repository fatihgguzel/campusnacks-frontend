import { css } from '@emotion/react'
import { gap, ITheme } from '../../../../theme'

export const sidebarActionsStyles = (theme: ITheme) => css`
  display: flex;
  flex-direction: column;
  gap: ${gap.large}px;
  align-items: center;
`
