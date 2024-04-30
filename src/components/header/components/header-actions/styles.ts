import { css } from '@emotion/react'
import { ITheme, theme } from '../../../../theme'

export const headerActionsStyles = ({ gap, breakpoints }: ITheme) => css`
  display: flex;
  gap: ${gap.medium}px;
  align-items: center;

  .signupButtonStyles {
    @media (max-width: ${theme.breakpoints.medium}px) {
      display: none;
    }
  }
`
