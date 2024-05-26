import { css } from '@emotion/react'
import { ITheme } from 'src/theme'

export const wrapperStyles = (theme: ITheme) => css`
  display: flex;
  border-radius: ${theme.borderRadius[10]};
  box-shadow: ${theme.boxShadow.DEFAULT};
  background-color: ${theme.colors.white.DEFAULT};
  padding: ${theme.gap['2xlarge']}px;
  display: flex;
  flex-direction: column;
  gap: ${theme.gap['2xlarge']}px;
  max-height: 500px;
  overflow-y: auto;

  .title-wrapper {
    display: flex;
    align-items: center;
  }

  .key {
    color: ${theme.colors.primary.DEFAULT};
    padding: ${theme.gap['3xsmall']}px;
    border-radius: ${theme.borderRadius[10]};
  }

  .close-button-area {
    position: absolute;
    display: flex;
    justify-content: end;
    top: 10px;
    right: 10px;
  }

  .customer-order-items {
    display: flex;
    flex-direction: column;
    align-items: start;
  }

  .order-item-info-wrapper {
    display: flex;
    gap: ${theme.gap['2xsmall']}px;

    .order-item-info {
      display: flex;
      flex-direction: row;
      gap: ${theme.gap.small}px;
      min-height: 30px;
    }
  }

  .customer-address {
    display: flex;
    flex-direction: column;
    align-items: start;
  }

  .order-wrapper {
    display: flex;
    flex-direction: column;
  }
`
