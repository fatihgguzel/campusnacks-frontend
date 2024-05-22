import { css } from '@emotion/react'
import { ITheme } from '../../../../theme'

export const wrapperStyles = (isHovered: boolean) => (theme: ITheme) => css`
  position: relative;
  width: ${theme.dimensions.columnWidth.DEFAULT}px;
  border-radius: ${theme.borderRadius[8]};

  background: ${theme.colors.white.DEFAULT};
  height: 270px;

  ${isHovered
    ? `border: 1px solid ${theme.colors.primary.DEFAULT};`
    : `border: 1px solid ${theme.colors.border.DEFAULT};`}

  ${isHovered ? `cursor: pointer;` : `cursor: default;`}

  .restaurant-thumbnail-placeholder {
    height: 180px;
    border-top-left-radius: ${theme.borderRadius[8]};
    border-top-right-radius: ${theme.borderRadius[8]};
    overflow: hidden;
  }

  .placeholder-img {
    ${isHovered ? `transform: scale(102.38%);` : ``}
    border-top-left-radius: ${theme.borderRadius[8]};
    border-top-right-radius: ${theme.borderRadius[8]};
    background: no-repeat 50%;
    background-size: cover;
    display: block;
    position: relative;
    transform-origin: center center;
    transition:
      transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94),
      opacity 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    width: 100%;
    max-width: none;
  }
`

export const cardInfoStyles = (theme: ITheme) => css`
  display: flex;
  flex-direction: column;
  margin: ${theme.spacing['2xsmall']} ${theme.spacing.small};

  .restaurant-name {
    font-size: ${theme.fontSize.medium};
    font-weight: ${theme.fontWeight.semiBold};
    overflow-x: hidden;
    overflow-y: hidden;
    text-overflow: ellipsis;
    text-wrap: nowrap;
  }
`
