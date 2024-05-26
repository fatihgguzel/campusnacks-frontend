import { css } from '@emotion/react'
import { ITheme } from 'src/theme'

export const dashboardPaginationWrapperStyles = (theme: ITheme) => css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 24px;
  gap: ${theme.gap['xsmall']}px;
  font-weight: ${theme.fontWeight.medium};
  margin-top: 15px;
`

export const inputWrapperStyles = (theme: ITheme) => css`
  input[type='text'] {
    font-weight: ${theme.fontWeight.medium};
    font-size: ${theme.fontSize.base};
  }
  width: 22px;
  height: 100%;
  display: flex;
  align-items: center;
`
export const inputStyles = (isActive: boolean) => (theme: ITheme) => css`
  width: 100%;
  color: ${isActive
    ? theme.colors.black.DEFAULT
    : theme.colors.primary.DEFAULT};
  text-align: center;
  border: none;
  outline: none;
  background-color: transparent;
  &:focus {
    border-bottom: ${theme.gap['4xsmall']}px solid
      ${theme.colors.primary.DEFAULT};
    margin-bottom: -1px;
  }
`
export const paginationControllerStyles =
  (isActive: boolean) => (theme: ITheme) => css`
    display: flex;
    height: 100%;
    gap: ${theme.gap['medium']}px;
    align-items: center;
    color: ${isActive ? theme.colors.primary.DEFAULT : theme.colors.black[20]};
    cursor: ${isActive ? 'pointer' : 'not-allowed'};
  `
export const numberOfPagesStyles = (theme: ITheme) => css`
  padding: 0 ${theme.gap['xsmall']}px;
  height: 100%;
  display: flex;
  align-items: center;
  cursor: default;
  min-width: 22px;
`
export const seperatorStyles = () => css`
  cursor: default;
`
export const pageInfoStyles = (theme: ITheme) => css`
  display: flex;
  align-items: center;
  gap: ${theme.gap['xsmall']}px;
  color: ${theme.colors.primary.DEFAULT};
  height: 100%;
`

export const nextIconStyles = (isActive: boolean) => () => css`
  height: 100%;
  svg {
    cursor: ${isActive ? 'pointer ' : 'not-allowed'};
  }
`
export const backIconStyles = (isActive: boolean) => () => css`
  height: 100%;
  svg {
    cursor: ${isActive ? 'pointer' : 'not-allowed'};
  }
`
export const firstClickStyles = (isActive: boolean) => () => css`
  cursor: ${isActive ? 'pointer' : 'not-allowed'};
`
export const lastClickStyles = (isActive: boolean) => () => css`
  cursor: ${isActive ? 'pointer' : 'not-allowed'};
`
