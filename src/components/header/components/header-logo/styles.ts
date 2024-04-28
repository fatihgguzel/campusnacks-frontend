import { css } from '@emotion/react'
import { ITheme } from '../../../../theme'

export const headerLogoStyles = css`
  display: flex;
  cursor: pointer;
`

export const campusnacksLogoStyles = (theme: ITheme) => css`
  display: none;
  @media (min-width: ${theme.breakpoints.tablet}px) {
    display: block;
  }
`

export const campusnacksStyles = (theme: ITheme) => css`
  @media (min-width: ${theme.breakpoints.tablet}px) {
    display: none;
  }
`
