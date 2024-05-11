import { css } from '@emotion/react'
import { ITheme } from '../../theme'

export const textAreaStyles =
  (focused?: boolean, isValid?: boolean) =>
  ({ gap, colors, borderRadius }: ITheme) => css`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: ${gap.xsmall}px;
    background: ${colors.white.DEFAULT};
    gap: ${gap.small}px;
    border-radius: ${borderRadius[4]};
    border: 1px solid
      ${isValid
        ? focused
          ? colors.primary.DEFAULT
          : colors.elements.DEFAULT
        : colors.error.DEFAULT};
    outline: none;
  `

export const labelStyles = ({ colors, fontSize }: ITheme) => css`
  font-size: ${fontSize.xsmall};
  color: ${colors.text[2]};
`
export const textAreaElementStyles =
  (note?: boolean) =>
  ({ colors }: ITheme) => css`
    ${note && `height: 100%;`}
    resize: none;
    outline: none;
    background: transparent;
    border: none;
    color: ${colors.black.DEFAULT};
    caret-color: ${colors.primary.DEFAULT};
  `
