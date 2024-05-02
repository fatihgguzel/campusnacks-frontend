import { css } from '@emotion/react'
import {
  IInput,
  INPUT_SIZE,
  INPUT_THEME,
  INPUT_VARIANT,
  INPUT_WIDTH,
} from './types'
import { ITheme, theme } from '../../theme'

const wrapperWidth = {
  [INPUT_WIDTH.WIDE]: '450px',
  [INPUT_WIDTH.NORMAL]: '350px',
  [INPUT_WIDTH.MEDIUM]: '300px',
  [INPUT_WIDTH.NARROW]: '220px',
  [INPUT_WIDTH.FULL]: '100%',
}

type IWrapperStyles = Pick<IInput, 'width'>
export const wrapperStyles =
  (props: IWrapperStyles) =>
  ({ colors }: ITheme) => css`
    position: relative;
    width: ${wrapperWidth[props.width || INPUT_WIDTH.FULL]};

    .copy-text {
      color: ${colors.primary.DEFAULT};
    }

    input:-webkit-autofill {
      box-shadow: 0 0 0 1000px white inset;
    }
  `

type IInputAreaStyles = Pick<
  IInput,
  'icon' | 'theme' | 'size' | 'variant' | 'squeezed' | 'disabled'
> & {
  focused: boolean
  isError: boolean
}

const getBorderCss = ({
  isError,
  colors,
  focused,
  icon,
  inputTheme,
  variant,
}: any) => {
  /* Condition: isError */
  if (isError) {
    return `border: 1px solid ${colors.error.DEFAULT};`
  }

  /* Condition: focused && !icon */
  if (focused && !icon) {
    /* Condition: inputTheme === INPUT_THEME.LIGHT */
    if (inputTheme === INPUT_THEME.LIGHT) {
      /* Condition: variant === INPUT_VARIANT.DEFAULT */
      if (variant === INPUT_VARIANT.DEFAULT) {
        return `border: 1px solid ${colors.primary.DEFAULT};`
      } else if (variant === INPUT_VARIANT.DASHED) {
        return `
					border-radius: 0;
					border: 1px solid transparent;
					border-bottom: 1px dashed ${colors.primary[80]};
				`
      } else {
        return `
					border: 1px solid transparent;
					border-bottom: 1px solid ${colors.primary[80]};
				`
      }
    } else if (inputTheme === INPUT_THEME.DARK) {
      /* Condition: variant === INPUT_VARIANT.DEFAULT */
      if (variant === INPUT_VARIANT.DEFAULT) {
        return ` border: 1px solid ${colors.dark.DEFAULT};`
      } else {
        return `
					border: 1px solid transparent;
					border-bottom: 1px solid ${colors.primary[80]};
				`
      }
    }
  } else {
    /* Condition: variant === INPUT_VARIANT.DEFAULT */
    if (variant === INPUT_VARIANT.DEFAULT) {
      if (inputTheme === INPUT_THEME.LIGHT) {
        return `border: 1px solid ${colors.elements.DEFAULT};`
      } else {
        return `border: 1px solid transparent;`
      }
    } else if (variant === INPUT_VARIANT.DASHED) {
      return `
				border: 1px solid transparent;
				border-bottom: 1px dashed ${colors.elements.DEFAULT};
				border-radius: 0;
			`
    } else {
      return `border: 1px solid transparent;`
    }
  }

  /* Default styling */
  return `border: 1px solid transparent;`
}

export const inputAreaStyles =
  ({
    icon,
    theme: inputTheme,
    variant,
    size,
    isError,
    focused,
    squeezed,
  }: IInputAreaStyles) =>
  ({ borderRadius, colors, dimensions, gap }: ITheme) => css`
    display: flex;
    align-items: center;
    gap: ${gap.small}px;
    outline: none;
    position: relative;
    box-sizing: border-box;
    width: 100%;
    padding: ${squeezed
      ? 0
      : icon
        ? `${gap.xsmall}px`
        : `${gap.xsmall}px ${gap.small}px `};

    background: ${variant === INPUT_VARIANT.GHOST ||
    variant === INPUT_VARIANT.DASHED
      ? 'transparent'
      : inputTheme === INPUT_THEME.LIGHT
        ? colors.white.DEFAULT
        : colors.dark.DEFAULT};
    height: ${size === INPUT_SIZE.BIG
      ? dimensions.formElementHeight.big
      : size === INPUT_SIZE.MEDIUM
        ? dimensions.formElementHeight.medium
        : size === INPUT_SIZE.XSMALL
          ? dimensions.formElementHeight.xsmall
          : dimensions.formElementHeight.DEFAULT}px;

    border-radius: ${variant === INPUT_VARIANT.GHOST
      ? borderRadius[0]
      : size === INPUT_SIZE.BIG
        ? borderRadius[6]
        : size === INPUT_SIZE.MEDIUM
          ? borderRadius[4]
          : borderRadius[4]};

    border-width: 1px;
    border-style: solid;

    ${getBorderCss({ isError, colors, focused, icon, inputTheme, variant })}

    @media (min-width: ${theme.breakpoints.tablet}px) {
      padding: ${squeezed
        ? 0
        : icon
          ? `${gap.xsmall}px`
          : `${gap.xsmall}px ` + `${gap.medium}px`};
    }
  `

// width: 0; is for a css trick that let input component to be fit inside a wrapper
type IInputStyles = Pick<IInput, 'theme' | 'disabled'>
export const inputStyles =
  ({ theme }: IInputStyles) =>
  ({ colors, gap }: ITheme) => css`
    outline: none;
    border: none;
    height: 22px;
    line-height: 22px;
    background: transparent;
    flex-grow: 1;
    caret-color: ${colors.primary.DEFAULT};
    width: 0;
    color: ${theme === INPUT_THEME.DARK
      ? colors.white.DEFAULT
      : colors.text.DEFAULT};

    &:disabled {
      color: ${colors.dark[60]} !important;
    }

    &[type='number'] {
      max-width: calc(100% - 20px);
      appearance: textfield;
      -webkit-appearance: textfield;

      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
      }
      &::-webkit-outer-spin-button {
        -webkit-appearance: none;
      }

      & + .number-buttons {
        position: absolute;
        top: 0;
        bottom: 0;
        right: ${gap.small}px;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
    }
  `

export const iconStyles = css`
  flex-shrink: 0;
`

type ILabelStyles = Pick<IInput, 'size' | 'labelTheme'>
export const labelStyles =
  ({ size, labelTheme }: ILabelStyles) =>
  (theme: ITheme) => css`
    color: ${labelTheme ? labelTheme : theme.colors.text[2]};
    margin-bottom: ${theme.gap['2xsmall']}px;
    font-size: ${size === INPUT_SIZE.SMALL || size === INPUT_SIZE.XSMALL
      ? theme.fontSize.small
      : theme.fontSize.base};
  `
type IErrorStyles = Pick<IInput, 'size' | 'errorAlignRight' | 'solidError'>
export const errorStyles =
  ({ size, errorAlignRight, solidError }: IErrorStyles) =>
  (theme: ITheme) => css`
    ${!solidError
      ? errorAlignRight
        ? 'position: absolute; right: 0;'
        : 'position: absolute; left: 0;'
      : errorAlignRight
        ? 'width: 100%; text-align: right;'
        : 'width: 100%; text-align: left;'}

    color: ${theme.colors.error.DEFAULT};
    font-size: ${size === INPUT_SIZE.BIG
      ? theme.fontSize.small
      : theme.fontSize.xsmall};
    padding-top: ${solidError ? theme.gap['3xsmall'] : 0}px;
    top: calc(
      100% +
        ${size === INPUT_SIZE.BIG
          ? theme.gap['2xsmall']
          : theme.gap['3xsmall']}px
    );
  `
