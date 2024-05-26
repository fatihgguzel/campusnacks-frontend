import { css } from '@emotion/react'
import { ITheme } from 'src/theme'

export const wrapperStyles = (theme: ITheme) => css`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 600px;
  gap: ${theme.gap['2xlarge']}px;
  padding: 0 ${theme.spacing['2xlarge']};

  .account-header {
    font-weight: ${theme.fontWeight.semiBold};
    font-size: ${theme.fontSize['3xlarge']};
    color: ${theme.colors.primary.DEFAULT};
    margin-top: ${theme.gap['2xlarge']}px;
  }

  .account-content {
    display: flex;
    flex-direction: column;
    gap: ${theme.gap['2xlarge']}px;
    align-items: start;
  }

  .actions-header {
    font-weight: ${theme.fontWeight.semiBold};
    font-size: ${theme.fontSize['large']};
    color: ${theme.colors.primary.DEFAULT};
    margin-top: ${theme.gap['large']}px;
  }

  .restaurant-actions {
    display: flex;
    flex-direction: row;
    gap: ${theme.gap.medium}px;
  }

  .account-name,
  .account-email,
  .account-phone-number,
  .account-address,
  .submit-action {
    width: 100%;
  }
`
