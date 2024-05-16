import { css } from '@emotion/react'
import { ITheme } from '../../../../theme'

export const wrapperStyles = (theme: ITheme) => css`
  display: flex;
  flex-direction: column;
  color: rgb(102, 102, 102);
  font-size: ${theme.fontSize.small};
  margin-top: ${theme.gap['3xsmall']}px;
  gap: ${theme.gap['3xsmall']}px;

  .first-row,
  .second-row {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .first-row > *:not(:last-child),
  .second-row > *:not(:last-child) {
    margin-right: ${theme.gap['3xsmall']}px;
  }

  .has-delivery {
    color: ${theme.colors.primary.DEFAULT};
  }
`
