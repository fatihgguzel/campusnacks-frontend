import { css } from '@emotion/react'
import { ITheme } from 'src/theme'

export const wrapperStyles = (theme: ITheme) => css`
  display: flex;
  flex-direction: row;
  gap: ${theme.gap['2xsmall']}px;
  align-items: center;

  .row-button {
    margin: ${theme.gap['3xsmall']}px;
    background: ${theme.colors.background.DEFAULT};
    border: none;
    box-shadow: ${theme.boxShadow.BUTTON};
    font-weight: ${theme.fontWeight.semiBold};
  }

  .deliver-button {
    color: ${theme.colors.primary[110]};
    &:hover {
      background: ${theme.colors.primary[10]};
    }
  }

  .complete-button {
    color: #115375;
    &:hover {
      background: #a6d9f2;
    }
  }

  .cancel-button {
    color: ${theme.colors.error.DEFAULT};
    &:hover {
      background: ${theme.colors.error[20]};
    }
  }
`
