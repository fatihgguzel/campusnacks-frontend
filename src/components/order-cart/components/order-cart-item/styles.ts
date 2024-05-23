import { css } from '@emotion/react'
import { ITheme } from '../../../../theme'

export const wrapperStyles = (theme: ITheme) => css`
  display: flex;
  justify-content: space-between;
  height: ${theme.dimensions.orderCartItemHeight.DEFAULT}px;
  gap: ${theme.gap.medium}px;
`

export const imageContainerStyles = (theme: ITheme) => css`
  display: flex;
  width: 48px;
  height: 48px;
  border-radius: ${theme.borderRadius[12]};

  .placeholder-img {
    border-radius: ${theme.borderRadius[12]};
  }
`

export const cartItemDetailsStyles = (theme: ITheme) => css`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
  gap: ${theme.gap.large}px;

  .item-name {
    color: ${theme.colors.primary.DEFAULT};
    text-align: left;
    font-weight: ${theme.fontWeight.semiBold};
    overflow: hidden;
    text-overflow: ellipsis;
    hyphens: auto;
  }

  .item-price {
    text-align: left;
    font-weight: ${theme.fontWeight.semiBold};
    user-select: none;
  }

  .item-counter {
    width: 90px;
  }

  .cart-item-details-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`
