import { css } from '@emotion/react'
import { ITheme } from 'src/theme'

export const wrapperStyles = (theme: ITheme) => css`
  display: flex;
  gap: ${theme.gap.large}px;
  flex-direction: column;
  margin: 20px auto;

  .orders-table-cell {
    min-width: ${theme.dimensions.cellWidth.SMALL}px;

    @media (min-width: ${theme.breakpoints.large + 1}px) {
      min-width: ${theme.dimensions.cellWidth.DEFAULT}px;
    }
  }

  .head-cell {
    background-color: ${theme.colors.primary.DEFAULT};
    color: ${theme.colors.white.DEFAULT};
    border-radius: ${theme.borderRadius[4]};
  }

  .body-cell {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .change-table {
    display: flex;
    justify-content: center;
  }

  .table-wrapper {
    max-width: 100vw;
    overflow-x: auto;
    overflow-y: auto;
  }

  .orders-table-cell {
    padding: ${theme.gap['2xsmall']}px;
  }

  .orders-table tbody tr:nth-of-type(even) {
    background-color: ${theme.colors.primary[10]};

    .deliver-button {
      &:hover {
        background: ${theme.colors.elements.DEFAULT};
      }
    }
  }
`
