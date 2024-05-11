import { css } from '@emotion/react'
import { breakpoints, ITheme, theme } from '../../theme'

export const sidebarStyles = (theme: ITheme) => css`
  width: ${theme.dimensions.sidebarWidth.DEFAULT}px;
  padding: ${theme.spacing['4xlarge']};
  display: flex;
  position: sticky;
  align-items: flex-start;
  background: ${theme.colors.white.DEFAULT};
  height: 100%;
  box-shadow: ${theme.boxShadow.SIDEBAR};
  justify-content: center;

  @media (max-width: ${theme.breakpoints.laptop - 1}px) {
    padding: ${theme.spacing['2xlarge']};
    width: ${theme.dimensions.sidebarWidth.medium}px;
  }

  @media (max-width: ${theme.breakpoints.tablet - 1}px) {
    padding: ${theme.spacing['xlarge']};
    width: ${theme.dimensions.sidebarWidth.small};
  }

  @media (max-width: ${theme.breakpoints.medium - 1}px) {
    padding: ${theme.spacing['large']};
    width: ${theme.dimensions.sidebarWidth.small}px;
  }
`
