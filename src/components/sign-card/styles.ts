import { css } from '@emotion/react'
import { ITheme } from '../../theme'

export const signCardStyles = (theme: ITheme) => css`
  border-radius: ${theme.borderRadius[10]};
  box-shadow: ${theme.boxShadow.DEFAULT};
  background-color: ${theme.colors.white.DEFAULT};
  padding: ${theme.gap['2xlarge']}px;
  display: flex;
  flex-direction: column;
  gap: ${theme.gap.small}px;

  .close-button-area {
    position: absolute;
    display: flex;
    justify-content: end;
    top: 10px;
    right: 10px;
  }

  .back-button-area {
    position: absolute;
    display: flex;
    justify-content: start;
    top: 10px;
    left: 10px;
  }

  .welcome-actions {
    gap: ${theme.gap.medium}px;
  }
`
