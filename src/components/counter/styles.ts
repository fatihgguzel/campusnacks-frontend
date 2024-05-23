import { css } from '@emotion/react'
import { ITheme } from 'src/theme'

export const wrapperStyles = (theme: ITheme) => css`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-radius: ${theme.borderRadius[12]};
  border: 1px solid ${theme.colors.border.DEFAULT};
  padding: ${theme.spacing['3xsmall']};
  align-items: center;

  .decrement,
  .counter,
  .increment {
    display: flex;
  }

  .decrement,
  .increment {
    cursor: pointer;
  }

  .counter {
    user-select: none;
  }
`
