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

export const dropdownStyles = (isLoggedIn: boolean) => (theme: ITheme) => css`
  @media (max-width: ${theme.breakpoints.laptop}px) {
    ${!isLoggedIn ? `display: none` : `display: flex`}
  }
  position: relative;
  display: flex;
  width: ${theme.dimensions.headerDropdownWidth.xsmall}px;
  align-items: center;
  margin: 0 ${theme.spacing.large} 0 ${theme.spacing['5xlarge']};

  @media (min-width: ${theme.breakpoints.laptop}px) and (max-width: ${theme
      .breakpoints.desktop}px) {
    margin: 0 ${theme.spacing['5xlarge']};
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
