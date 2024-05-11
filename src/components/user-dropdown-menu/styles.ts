import { css } from '@emotion/react'
import { ITheme } from '../../theme'
import { DROPDOWN_MENU_WIDTH } from './types'

export const wrapperStyles =
  (width: DROPDOWN_MENU_WIDTH) => (theme: ITheme) => css`
    ${width === DROPDOWN_MENU_WIDTH.FULL
      ? `width: 100%;`
      : width === DROPDOWN_MENU_WIDTH.LARGE
        ? `width: ${theme.dimensions.dropdownWidth.DEFAULT}px;`
        : width === DROPDOWN_MENU_WIDTH.NORMAL
          ? `width: ${theme.dimensions.dropdownWidth.medium}px;`
          : `width: ${theme.dimensions.dropdownWidth.small}px;`}
    max-width: 100%;
    position: relative;
    cursor: pointer;
    position: absolute;

    .dropdown-menu {
      box-shadow: ${theme.boxShadow.DROPDOWN};
      border-radius: ${theme.borderRadius[10]};
      margin-top: ${theme.gap.xsmall}px;

      .menu-item {
        padding: ${theme.spacing.small} ${theme.spacing.medium};
      }

      .menu-item-wrapper {
        gap: ${theme.gap.small}px;
      }

      .menu-item-name {
        font-weight: ${theme.fontWeight.medium};
        font-size: ${theme.fontSize.medium};
      }
    }
  `
