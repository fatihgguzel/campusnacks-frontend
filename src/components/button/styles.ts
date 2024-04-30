import { css } from '@emotion/react'
import { ITheme } from '../../theme'
import {
  BUTTON_SIZE,
  BUTTON_THEME,
  BUTTON_TYPE,
  BUTTON_WIDTH,
  IButton,
  IColorStylesMapping,
} from './types'

type IWrapperStyles = Pick<
  IButton,
  | 'size'
  | 'isLink'
  | 'text'
  | 'type'
  | 'theme'
  | 'isRounded'
  | 'width'
  | 'isLightText'
  | 'height'
>

export const wrapperStyles = (props: IWrapperStyles) => (theme: ITheme) => css`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-style: solid;
  border-color: transparent;
  cursor: pointer;

  padding: ${!props.text || props.isLink
    ? `${theme.spacing['4xsmall']} ${theme.spacing['3xsmall']}`
    : props.size === BUTTON_SIZE.XSMALL
      ? `${theme.spacing.xsmall} ${theme.spacing.small}`
      : `${theme.spacing.small} ${theme.spacing.xlarge}`};

  box-shadow: none;

  font-weight: ${props.isLightText
    ? theme.fontWeight.regular
    : theme.fontWeight.medium};

  border-radius: ${props.isRounded
    ? props.size === BUTTON_SIZE.XSMALL
      ? theme.borderRadius.small
      : props.size === BUTTON_SIZE.LARGE
        ? theme.borderRadius.large
        : theme.borderRadius.medium
    : theme.borderRadius[4]};

  &:disabled {
    border-color: ${theme.colors.deactive.DEFAULT};
    pointer-events: none;
  }

  font-size: ${props.size === BUTTON_SIZE.XLARGE
    ? theme.fontSize.medium
    : props.size === BUTTON_SIZE.LARGE
      ? theme.fontSize.base
      : props.size === BUTTON_SIZE.SMALL
        ? theme.fontSize.small
        : props.size === BUTTON_SIZE.XSMALL
          ? theme.fontSize.small
          : theme.fontSize.small};

  ${props.isLightText &&
  `
		font-size: ${theme.fontSize.small};
	`}

  height: ${props.isLink
    ? `auto`
    : props.height
      ? `${props.height}px`
      : props.size === BUTTON_SIZE.XLARGE
        ? `${theme.dimensions.buttonHeight.xlarge}px`
        : props.size === BUTTON_SIZE.LARGE
          ? `${theme.dimensions.buttonHeight.large}px`
          : props.size === BUTTON_SIZE.SMALL
            ? `${theme.dimensions.buttonHeight.small}px`
            : props.size === BUTTON_SIZE.XSMALL
              ? `${theme.dimensions.buttonHeight.xsmall}px`
              : `auto`};

  ${props.isLink && `width: auto;`}
  ${props.width === BUTTON_WIDTH.FULL && `width: 100%;`}
	${!props.text &&
  (props.size === BUTTON_SIZE.XLARGE
    ? `${theme.dimensions.buttonHeight.xlarge}px`
    : props.size === BUTTON_SIZE.LARGE
      ? `${theme.dimensions.buttonHeight.large}px`
      : props.size === BUTTON_SIZE.SMALL
        ? `${theme.dimensions.buttonHeight.small}px`
        : props.size === BUTTON_SIZE.XSMALL
          ? `${theme.dimensions.buttonHeight.xsmall}px`
          : `auto`)};

  ${colorClassesMapping(theme)[props.type || BUTTON_TYPE.DEFAULT].defaults};
  ${colorClassesMapping(theme)[props.type || BUTTON_TYPE.DEFAULT].theme[
    props.theme || BUTTON_THEME.PRIMARY
  ]};
`

type IInnerStyles = Pick<IButton, 'isLoading'>
export const innerStyles =
  ({ isLoading }: IInnerStyles) =>
  (theme: ITheme) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: ${theme.spacing['2xsmall']};
    opacity: ${isLoading ? 0 : 1};

    span {
      white-space: nowrap;
    }

    .button-text {
      display: inline-flex;
      align-items: center;
    }
  `

type ILoadingStyles = Pick<IButton, 'isLoading'>
export const loadingStyles = ({ isLoading }: ILoadingStyles) => css`
  position: absolute;
  justify-content: center;
  align-items: center;

  ${!isLoading ? `display: none !important;` : ''}
`

export const colorClassesMapping = ({
  colors,
}: ITheme): IColorStylesMapping => ({
  [BUTTON_TYPE.DEFAULT]: {
    defaults: `
				color: ${colors.white.DEFAULT};
				&:disabled {
					background: ${colors.deactive.DEFAULT};
					border-color: ${colors.deactive.DEFAULT};
				}
			`,
    theme: {
      [BUTTON_THEME.PRIMARY]: `
				background: ${colors.primary.DEFAULT};
				&:hover {
					background: ${colors.primary[110]};
					border-color: ${colors.primary[110]};
				}
			`,
      [BUTTON_THEME.SECONDARY]: `
				background: ${colors.secondary.DEFAULT}	;
				&:hover {
					background: ${colors.secondary.DEFAULT};
					border-color: ${colors.secondary.DEFAULT};
				}
			`,
      [BUTTON_THEME.WHITE]: `
				background: ${colors.white.DEFAULT};
				color: ${colors.black.DEFAULT} !important;
				&:hover {
					background: ${colors.black[20]};
				}
			`,
      [BUTTON_THEME.GRAY]: `
				background: ${colors.text.DEFAULT};
				&:hover {
					background: ${colors.text[2]};
					border-color: ${colors.text[2]};
				}
			`,
      [BUTTON_THEME.DARK]: `
				background: ${colors.dark.DEFAULT};
				&:hover {
					border-color: ${colors.primary.DEFAULT};
				}
			`,
      [BUTTON_THEME.ELEMENTS]: `
				background: ${colors.elements.DEFAULT};
				&:hover {
					background: ${colors.text[2]};
					border-color: ${colors.elements.DEFAULT};
				}
			`,
    },
  },
  [BUTTON_TYPE.REVERSE]: {
    defaults: `
		background: transparent;
			&:disabled {
				background: transparent;
				border-color: ${colors.deactive.DEFAULT};
				color: ${colors.deactive.DEFAULT};
			}
			`,
    theme: {
      [BUTTON_THEME.PRIMARY]: `
				color: ${colors.primary.DEFAULT};
				border-color: ${colors.primary.DEFAULT};
				&:hover {
					background: ${colors.primary[10]};
				}
			`,
      [BUTTON_THEME.SECONDARY]: `
					color: ${colors.secondary.DEFAULT};
					border-color: ${colors.secondary.DEFAULT};
					&:hover {
						background: ${colors.primary[10]};
					}
				`,
      [BUTTON_THEME.WHITE]: `
				color: ${colors.white.DEFAULT};
				border-color: ${colors.white.DEFAULT};
				&:hover {
					background: ${colors.black[20]};
				}
			`,
      [BUTTON_THEME.GRAY]: `
				color: ${colors.text.DEFAULT};
				border-color: ${colors.text.DEFAULT};
				&:hover {
					background: ${colors.text[2]};
				}
			`,
      [BUTTON_THEME.DARK]: `
				color: ${colors.dark.DEFAULT};
				border-color: ${colors.dark.DEFAULT};
				&:hover {
					background: ${colors.dark.DEFAULT};
				}
			`,
      [BUTTON_THEME.ELEMENTS]: `
				color: ${colors.elements.DEFAULT};
				border-color: ${colors.elements.DEFAULT};
				&:hover {
					background: ${colors.text[2]};
				}
			`,
    },
  },
  [BUTTON_TYPE.GHOST]: {
    defaults: `
			border-color: transparent;
			background: transparent;
			&:disabled {
				background: transparent;
				color: ${colors.deactive.DEFAULT};
				border-color: transparent;
			}
			`,
    theme: {
      [BUTTON_THEME.PRIMARY]: `color: ${colors.primary.DEFAULT};`,
      [BUTTON_THEME.SECONDARY]: `color: ${colors.secondary.DEFAULT};`,

      [BUTTON_THEME.WHITE]: `color: ${colors.white.DEFAULT};`,
      [BUTTON_THEME.GRAY]: `color: ${colors.text.DEFAULT};`,
      [BUTTON_THEME.DARK]: `color: ${colors.dark.DEFAULT};`,
      [BUTTON_THEME.ELEMENTS]: `color: ${colors.elements.DEFAULT};`,
    },
  },
})
