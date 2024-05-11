import { css } from '@emotion/react'
import { ITheme } from '../../../theme'

export const formInnerStyles = (theme: ITheme) => css`
  width: ${theme.dimensions.formWidth.medium}px;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.medium};

  media (max-width: ${theme.breakpoints.medium}px) {
    width: ${theme.dimensions.formWidth.medium}px;
  }
`

export const titleContainerStyles = css`
  width: 100%;
`

export const gradientTextStyles = (theme: ITheme) => css`
  background: ${theme.colors.primary.DEFAULT};
  font-size: ${theme.fontSize.medium};
  font-weight: ${theme.fontWeight.medium};
  margin-bottom: ${theme.spacing.small};
  padding-inline: ${theme.gap['4xlarge']}px;
  text-align: center;
  text-wrap: balance;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  @media (min-width: ${theme.breakpoints.large}px) {
    padding-inline: ${theme.gap['6xlarge']}px;
  }
`

export const actionsStyles = (theme: ITheme) => css`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: ${theme.spacing.large};
  gap: ${theme.spacing.xsmall};

  .info-text {
    color: ${theme.colors.text[2]};
    font-size: ${theme.fontSize.small};
    text-align: left;
  }

  @media (min-width: ${theme.breakpoints.tablet}px) {
    text-align: center;
  }

  @media (min-width: ${theme.breakpoints.large}px) {
    gap: ${theme.spacing.xsmall};

    .info-text {
      color: ${theme.colors.text[2]};
      font-size: ${theme.fontSize.base};
    }
  }
`
