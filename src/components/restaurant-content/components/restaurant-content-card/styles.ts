import { css } from '@emotion/react'
import { breakpoints, dimensions, ITheme } from '../../../../theme'

export const wrapperStyles = (isHovered: boolean) => (theme: ITheme) => css`
  position: relative;
  display: flex;
  flex-direction: row;
  border-radius: ${theme.borderRadius[12]};
  height: 152px;
  background: ${theme.colors.white.DEFAULT};
  padding: ${theme.spacing.small};
  overflow: hidden;
  justify-content: space-between;
  gap: ${theme.gap.small}px;

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

  ${isHovered
    ? `border: 1px solid ${theme.colors.primary.DEFAULT};`
    : `border: 1px solid ${theme.colors.border.DEFAULT};`}

  ${isHovered ? `cursor: pointer;` : `cursor: default;`}
`

export const cardContentStyles = (theme: ITheme) => css`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  gap: ${theme.gap['xsmall']}px;

  .content-name {
    font-size: ${theme.fontSize['medium']};
    line-height: 1.5;
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .content-price {
    font-size: ${theme.fontSize.medium};
  }

  .content-description {
    color: ${theme.colors.deactive.GRAY};
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    hyphens: auto;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

export const cardThumbnailStyles =
  (isHovered: boolean) => (theme: ITheme) => css`
    width: 128px;
    height: 128px;
    border-radius: ${theme.borderRadius[12]};
    overflow: hidden;
    min-width: 128px;

    .placeholder-img {
      ${isHovered ? `transform: scale(102.38%);` : ``}
      border-radius: ${theme.borderRadius[12]};
      background: no-repeat 50%;
      background-size: cover;
      display: block;
      position: relative;
      transform-origin: center center;
      transition:
        transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94),
        opacity 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      height: 128px;
      width: 128px;
    }
  `
