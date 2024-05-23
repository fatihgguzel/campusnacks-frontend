import { css } from '@emotion/react'
import { ITheme } from '../../theme'

export const wrapperStyles = (theme: ITheme) => css`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: ${theme.colors.white.DEFAULT};
  border-radius: ${theme.borderRadius[8]};
  border: 1px solid ${theme.colors.border.DEFAULT};

  .order-cart-container {
    overflow-y: auto;
    height: 100%;
    padding: ${theme.spacing.large};
    max-height: ${theme.dimensions.orderCartHeight.DEFAULT -
    theme.dimensions.orderCartFooterHeight.DEFAULT}px;
  }

  .order-cart-header {
    font-size: ${theme.fontSize.medium};
    font-weight: ${theme.fontWeight.semiBold};
    padding-bottom: ${theme.spacing['large']};
    user-select: none;
  }
`

export const footerStyles = (theme: ITheme) => css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: ${theme.dimensions.orderCartFooterHeight.DEFAULT}px;
  box-shadow: ${theme.boxShadow.TOP};
  padding: ${theme.gap.medium}px;

  .footer-info {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }

  .footer-total,
  .footer-price {
    font-size: ${theme.fontSize.medium};
    font-weight: ${theme.fontWeight.semiBold};
  }

  .footer-price {
    max-width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: end;
  }
`
