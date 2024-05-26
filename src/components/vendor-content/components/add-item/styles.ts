import { css } from '@emotion/react'
import { ITheme } from 'src/theme'

export const wrapperStyles = (theme: ITheme) => css`
  display: flex;
  flex-direction: column;
  padding: ${theme.spacing['xlarge']};
  background: ${theme.colors.white.DEFAULT};
  border-radius: ${theme.borderRadius[8]};
  width: 300px;

  .close-button-area {
    position: absolute;
    display: flex;
    justify-content: end;
    top: 10px;
    right: 10px;
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: ${theme.gap['medium']}px;
  }

  .submit-action {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
`
