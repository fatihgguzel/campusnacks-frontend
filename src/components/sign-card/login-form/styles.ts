import { css } from '@emotion/react'
import { ITheme } from '../../../theme'

export const formInnerStyles = (theme: ITheme) => css`
  width: ${theme.dimensions.formWidth.DEFAULT}px;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.medium};

  @media (max-width: ${theme.breakpoints.medium}px) {
    width: ${theme.dimensions.formWidth.medium}px;
  }

  @media (min-width: ${theme.breakpoints.large}px) {
    gap: ${theme.spacing.xlarge};
    margin-bottom: ${theme.spacing.xlarge};
  }
`

export const actionsStyles = (theme: ITheme) => css`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: ${theme.spacing.xsmall};

  .forgot-password {
    align-self: flex-end;
  }

  @media (min-width: ${theme.breakpoints.tablet}px) {
    text-align: center;
  }

  @media (min-width: ${theme.breakpoints.large}px) {
    gap: ${theme.spacing.xsmall};
  }
`
