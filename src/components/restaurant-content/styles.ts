import { css } from '@emotion/react'
import { breakpoints, dimensions, gap, ITheme } from '../../theme'

const calcWidth = (column: number, width: number): number =>
  width * column + gap.large * (column - 1)

export const wrapperStyles = (theme: ITheme) => css`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const restaurantInfoStyles = (theme: ITheme) => css`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: ${theme.spacing['xsmall']} ${theme.spacing['4xlarge']};
  background: ${theme.colors.white.DEFAULT};
  box-shadow: ${theme.boxShadow[1]};
  padding-bottom: ${theme.spacing['3xlarge']};

  .restaurant-info-header {
    @media (max-width: ${breakpoints.medium}px) {
      font-size: ${theme.fontSize['xlarge']};
    }
  }

  .restaurant-info-row {
    display: flex;
    align-items: center;
  }

  .seperator {
    font-weight: ${theme.fontWeight.semiBold};
    margin: 0 ${theme.gap['small'] - 2}px 0 ${theme.gap['2xsmall']}px;
  }

  .restaurant-info-row > *:not(:last-child):not(.seperator) {
    margin-right: ${theme.gap['3xsmall']}px;
  }

  .has-delivery {
    font-weight: ${theme.fontWeight.semiBold};
  }

  .minimum-price {
    font-weight: ${theme.fontWeight.semiBold};
  }
`

export const loaderWrapperStyles = () => css`
  width: 100vw;
  display: flex;
  justify-content: center;
`

export const contentWrapperStyles = (theme: ITheme) => css`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  width: ${calcWidth(2, dimensions.columnWidth.BIG)}px;
  padding-bottom: ${theme.spacing['4xlarge']};

  @media (max-width: ${breakpoints.laptop}px) {
    width: ${calcWidth(2, dimensions.columnWidth.DEFAULT)}px;
  }

  @media (max-width: ${breakpoints.tablet}px) {
    width: ${calcWidth(1, dimensions.columnWidth.BIG)}px;
  }

  @media (max-width: ${breakpoints.medium}px) {
    width: ${calcWidth(1, dimensions.columnWidth.DEFAULT)}px;
  }

  .food {
    width: ${dimensions.columnWidth.BIG}px;

    @media (max-width: ${breakpoints.laptop}px) {
      width: ${dimensions.columnWidth.DEFAULT}px;
    }

    @media (max-width: ${breakpoints.tablet}px) {
      width: ${dimensions.columnWidth.BIG}px;
    }

    @media (max-width: ${breakpoints.medium}px) {
      width: ${dimensions.columnWidth.DEFAULT}px;
    }

    height: 152px;
    border-radius: ${theme.borderRadius[5]};
    border: 1px solid ${theme.colors.primary.DEFAULT};
    background: white;
  }
`

export const contentGridStyles = (theme: ITheme) => css`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap: ${gap.large}px;
`

export const inputContainerStyles = (theme: ITheme) => css`
  position: relative;
  display: flex;
  align-items: center;
  height: fit-content;
  margin: ${theme.gap.large}px;

  @media (max-width: ${theme.breakpoints.laptop - 1}px) {
    width: ${theme.dimensions.headerInputWidth.medium}px;
  }
  @media (max-width: ${theme.breakpoints.tablet - 1}px) {
    width: ${theme.dimensions.headerInputWidth.small}px;
  }
  @media (min-width: ${theme.breakpoints.laptop}px) {
    width: ${theme.dimensions.headerInputWidth.DEFAULT}px;
  }
`
