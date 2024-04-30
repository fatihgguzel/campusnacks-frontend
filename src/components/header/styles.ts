import { css } from '@emotion/react'
import { breakpoints, ITheme, theme } from '../../theme'

export const headerStyles = (theme: ITheme) => css`
  height: ${theme.dimensions.headerHeight.DEFAULT}px;
  padding: 0 ${theme.spacing['8xlarge']};
  display: flex;
  position: sticky;
  align-items: center;
  background: ${theme.colors.white.DEFAULT};
  width: 100%;
  box-shadow: ${theme.boxShadow.HEADER};

  @media (max-width: ${theme.breakpoints.laptop - 1}px) {
    padding: 0 ${theme.spacing['4xlarge']};
  }

  @media (max-width: ${theme.breakpoints.tablet - 1}px) {
    justify-content: space-between;
    padding: 0 ${theme.spacing['2xlarge']};
  }

  @media (max-width: ${theme.breakpoints.medium - 1}px) {
    padding: 0 ${theme.spacing['large']};
  }

  .left-side,
  .right-side {
    display: flex;
    flex-grow: 1;
    flex-shrink: 1;
    flex-direction: row;
    align-items: center;
  }

  .right-side {
    justify-content: flex-end;
  }
`

export const dropdownStyles = (theme: ITheme) => css`
  position: relative;
  display: flex;
  width: ${theme.dimensions.headerDropdownWidth.DEFAULT}px;
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
