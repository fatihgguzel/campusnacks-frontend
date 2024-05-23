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

  .loginButtonStyles {
    @media (max-width: ${theme.breakpoints.medium}px) {
      padding: ${theme.spacing.small} ${theme.spacing.medium};
    }
  }
`

export const dropdownStyles = (isLoggedIn: boolean) => (theme: ITheme) => css`
  @media (max-width: ${theme.breakpoints.laptop}px) {
    ${!isLoggedIn ? `display: none` : `display: flex`}
  }
  position: relative;
  display: flex;
  width: ${theme.dimensions.headerDropdownWidth.xsmall}px;
  align-items: center;
  margin: 0 ${theme.spacing.large} 0 ${theme.spacing['2xlarge']};

  @media (min-width: ${theme.breakpoints.laptop}px) and (max-width: ${theme
      .breakpoints.desktop}px) {
    margin: 0 ${theme.spacing.large};
  }

  @media (max-width: ${theme.breakpoints.tablet}px) {
    width: ${theme.dimensions.headerDropdownWidth.medium}px;
    margin: 0 ${theme.spacing['large']};
  }

  @media (max-width: ${theme.breakpoints.medium}px) {
    width: ${theme.dimensions.headerDropdownWidth.xsmall}px;
    margin: 0 ${theme.spacing['xsmall']};
  }
`

export const orderCartStyles = (theme: ITheme) => css`
  display: flex;
  align-items: center;
  gap: ${theme.gap['3xsmall']}px;
  cursor: pointer;

  @media (max-width: ${theme.breakpoints.laptop}px) {
    margin-left: ${theme.spacing.medium};
  }

  @media (max-width: ${theme.breakpoints.small}px) {
    margin-left: ${theme.spacing['4xsmall']};
  }

  .order-count {
    font-size: ${theme.fontSize.medium};
    width: 9px;
  }
`
