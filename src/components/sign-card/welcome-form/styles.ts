import { css } from '@emotion/react'
import { ITheme } from '../../../theme'

export const wrapperStyles = (theme: ITheme) => css`
  display: flex;
  flex-direction: column;
  gap: ${theme.gap['6xlarge']}px;

  h2 {
    margin: 0;
  }

  .welcome-header {
    display: flex;
    flex-direction: column;
  }

  .welcome-actions {
    display: flex;
    flex-direction: column;
  }
`
