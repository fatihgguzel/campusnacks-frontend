import { css } from '@emotion/react'
import { ITheme } from '../../theme'

export const headerStyles = (theme: ITheme) => css`
  height: ${theme.dimensions.headerHeight.DEFAULT}px;
  padding: 0 ${theme.spacing['8xlarge']};
  display: flex;
  position: sticky;
  align-items: center;
  background: ${theme.colors.white.DEFAULT};
  width: 100%;
  box-shadow: ${theme.boxShadow.HEADER};

  @media (max-width: ${theme.breakpoints.tablet - 1}px) {
    justify-content: space-between;
    padding: 0 ${theme.spacing['5xlarge']};
  }

  .left-side,
  .right-side {
    display: flex;
    flex-grow: 1;
    flex-shrink: 1;
    flex-direction: row;
    align-items: center;
  }
`
