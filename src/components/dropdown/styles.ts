import { css } from '@emotion/react'
import {
  DROPDOWN_TYPE,
  DROPDOWN_WIDTH,
  DROPDOWN_THEME,
  IDropdown,
  DROPDOWN_SIZE,
  DROPDOWN_MENU_POSITION,
} from './types'
import { fontSize, ITheme } from '../../theme'

type IWrapperStyles = Pick<IDropdown, 'width' | 'type'>
export const wrapperStyles =
  ({ width, type }: IWrapperStyles) =>
  (theme: ITheme) => css`
    ${type === DROPDOWN_TYPE.DEFAULT
      ? ` width: ${
          width === DROPDOWN_WIDTH.FULL
            ? `100%`
            : `${theme.dimensions.columnWidth.DEFAULT}px`
        };`
      : `width: auto;`}
    max-width: 100%;
    position: relative;
    cursor: pointer;
  `

type IDropdownStyles = Pick<IDropdown, 'type' | 'theme' | 'size'> & {
  isMenuOpen?: boolean
}

type IMenuItemStyles = {
  theme: DROPDOWN_THEME
  isDisabled?: boolean
  isHover?: boolean
  isActive?: boolean
}

export const dropdownStyles =
  ({ type, isMenuOpen, theme, size }: IDropdownStyles) =>
  ({
    colors,
    boxShadow,
    borderRadius,
    dimensions,
    gap,
    fontSize,
    fontWeight,
  }: ITheme) => css`
    width: 100%;
    height: ${size === DROPDOWN_SIZE.BIG
      ? dimensions.formElementHeight.big
      : dimensions.formElementHeight.DEFAULT}px;
    ${type === DROPDOWN_TYPE.DEFAULT
      ? isMenuOpen
        ? `
					background: ${colors.white.DEFAULT};
					box-shadow: ${boxShadow[2]};`
        : `
					border: 1px solid ${colors.elements.DEFAULT};`
      : ``}

    ${theme === DROPDOWN_THEME.DARK &&
    `
			background: ${colors.dark.DEFAULT};
      color: ${colors.white.DEFAULT};
			border: none;
		`}
    ${theme === DROPDOWN_THEME.DARK &&
    type === DROPDOWN_TYPE.GHOST &&
    'background: transparent;'}
    border-radius: ${borderRadius[6]};
    display: flex;
    align-items: center;
    padding: 0 ${gap.small}px 0
      ${type === DROPDOWN_TYPE.DEFAULT ? `${gap.small}px` : 0};
    cursor: pointer;

    .down-icon {
      flex-shrink: 0;
    }

    .dropdown-label {
      flex-grow: 1;
      display: flex;
      align-items: center;
      gap: ${gap['2xsmall']}px;
      font-size: ${fontSize.small};
      font-weight: ${fontWeight.bold};
      overflow: hidden;
      max-width: 100%;

      ${type === DROPDOWN_TYPE.GHOST && isMenuOpen
        ? `
				text-decoration: underline;`
        : ``}
      .dropdown-icon {
        display: inline-flex;
      }

      .dropdown-text {
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        input {
          min-width: 0;
          background: transparent;
          border: none;
          outline: none;
          ${theme === DROPDOWN_THEME.DARK && `color: ${colors.white.DEFAULT}`};
        }
      }
    }
  `
type IMenuStyles = Pick<IDropdown, 'type'> & {
  isSubMenu?: boolean
  menuPosition?: DROPDOWN_MENU_POSITION
}
export const menuStyles =
  ({ isSubMenu, type, menuPosition }: IMenuStyles) =>
  (theme: ITheme) => css`
    position: absolute;
    ${isSubMenu
      ? `
		left: 100%;
		padding-left: ${theme.spacing['3xsmall']};
		top: -${theme.spacing['3xsmall']};
	`
      : `
		left: 0;
		${type === DROPDOWN_TYPE.DEFAULT ? `right: 0` : ``};
		top: ${menuPosition === DROPDOWN_MENU_POSITION.UP ? '' : '100%'};
    bottom: ${menuPosition === DROPDOWN_MENU_POSITION.UP ? '100%' : ''};
		padding-top: ${theme.spacing['3xsmall']};
		z-index: 1000;
		max-height: 200px;
		overflow-y: auto;
	`}
  `

export const menuInnerStyles =
  (theme: DROPDOWN_THEME) =>
  ({ colors, spacing, borderRadius }: ITheme) => css`
    display: inline-flex;
    flex-direction: column;
    width: 100%;
    background: ${theme === DROPDOWN_THEME.DARK
      ? colors.dark.DEFAULT
      : colors.white.DEFAULT};
    color: ${theme === DROPDOWN_THEME.DARK
      ? colors.white.DEFAULT
      : colors.black.DEFAULT};
    border-radius: ${borderRadius[6]};
    padding: ${spacing['3xsmall']} 0;
  `

export const menuItemStyles =
  ({
    theme,
    isDisabled = false,
    isHover = false,
    isActive = false,
  }: IMenuItemStyles) =>
  ({ colors, spacing }: ITheme) => css`
    position: relative;
    cursor: ${isDisabled ? 'default' : 'pointer'};
    color: ${isDisabled ? colors.deactive.DEFAULT : colors.text.DEFAULT};

    ${isHover &&
    (theme === DROPDOWN_THEME.DARK
      ? `background: ${colors.dark.DEFAULT};`
      : `background: ${colors.primary[10]};`)}

    ${isActive &&
    (theme === DROPDOWN_THEME.DARK
      ? `background: ${colors.dark.DEFAULT};`
      : `background: ${colors.primary[10]};
      color: ${colors.primary.DEFAULT};`)}
  
    .menu-item-wrapper {
      align-items: center;
      display: flex;
      height: 18px;
      padding: ${spacing['2xsmall']};
      color: ${theme === DROPDOWN_THEME.DARK
        ? colors.white.DEFAULT
        : colors.black.DEFAULT};
      row-gap: 10px;
    }

    .menu-item-name {
      flex-grow: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: ${fontSize.small};
    }

    .menu-item-icon {
      width: 18px;
      display: flex;
      align-items: center;
    }
  `

export const selectStyles = css`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  opacity: 0;
`
