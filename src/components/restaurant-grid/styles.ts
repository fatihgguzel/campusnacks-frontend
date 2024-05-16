import { css } from '@emotion/react'
import { breakpoints, dimensions, gap, ITheme } from '../../theme'

const calcWidth = (column: number): number =>
  dimensions.columnWidth.DEFAULT * column + gap.large * (column - 1)

export const wrapperStyles = (thene: ITheme) => css`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  width: ${dimensions.columnWidth.DEFAULT}px;

  @media (min-width: ${breakpoints.tablet}px) {
    width: ${calcWidth(2)}px;
  }

  @media (min-width: ${breakpoints.laptop}px) {
    width: ${calcWidth(2)}px;
  }

  @media (min-width: ${breakpoints.desktop}px) {
    width: ${calcWidth(3)}px;
  }

  @media (min-width: ${breakpoints.large}px) {
    width: ${calcWidth(4)}px;
  }

  @media (min-width: ${breakpoints.xlarge}px) {
    width: ${calcWidth(5)}px;
  }

  @media (min-width: ${breakpoints.xxlarge}px) {
    width: ${calcWidth(6)}px;
  }
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

export const gridStyles = (theme: ITheme) => css`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap: ${gap.large}px;
`
