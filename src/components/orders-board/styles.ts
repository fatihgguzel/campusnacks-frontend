import { css } from '@emotion/react'
import { gap, ITheme } from '../../theme'

export const wrapperStyles = (theme: ITheme) => css`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  padding-bottom: 50px;
`

export const gridStyles = (theme: ITheme) => css`
  display: grid;
  width: 100%;
  gap: ${gap.large}px;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto auto;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto auto;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto auto auto;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }
`

export const columnStyles = (theme: ITheme) => css`
  position: relative;
  padding: 16px;
  background-color: #f4f4f4;
  border-radius: 4px;
  margin: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 4px;
    background-color: #f4f4f4;
    z-index: 0;
  }
`

export const columnTitleStyles = (theme: ITheme, isMobile: boolean) => css`
  position: relative;
  z-index: 1;
  margin-bottom: 16px;
  font-size: 1.2em;
  font-weight: bold;
  cursor: ${isMobile ? 'pointer' : 'default'};
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const baseButtonStyles = (theme: ITheme) => css`
  position: relative;
  z-index: 2;
  margin-top: 8px;
  padding: 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: white;
`

export const moveButtonStyles = (theme: ITheme) => css`
  ${baseButtonStyles(theme)}
  background-color: #0055ff; // Green color
`

export const cancelButtonStyles = (theme: ITheme) => css`
  ${baseButtonStyles(theme)}
  background-color: #ff1a35; // Orange color
`

export const cardStyles = (theme: ITheme) => css`
  position: relative;
  z-index: 1;
  border: 1px solid #ccc;
  padding: 16px;
  margin: 8px;
  background-color: white;
  border-radius: 4px;
  display: flex;
  flex-direction: column;

  & > div {
    margin-bottom: 8px;
    display: flex;
    justify-content: space-between;
  }
`

export const newOrderColumnStyles = (theme: ITheme) => css`
  &::before {
    background-color: #ffcccc;
    animation: breathing 2s infinite;
  }

  @keyframes breathing {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
`
