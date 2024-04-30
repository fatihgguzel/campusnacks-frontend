import { css, keyframes } from '@emotion/react'
import { ILoader } from './types'

type IWrapperStyles = Pick<ILoader, 'isFullWidth'>
export const wrapperStyles = ({ isFullWidth }: IWrapperStyles) => css`
  ${isFullWidth ? `width: 100%;` : ''}

  display: inline-flex;
  justify-content: center;
`

const dotsAnimation = keyframes`
	0% {
		transform: scale(0.8);
	}

	50% {
		transform: scale(1)
	}

	100% {
		transform: scale(0.8);
	}
`

type ILoaderStyles = Pick<ILoader, 'size' | 'color'>
export const loaderStyles = ({ size, color }: ILoaderStyles) => css`
  display: flex;
  gap: ${(size || 10) / 2}px;

  span {
    width: ${size}px;
    height: ${size}px;
    background: ${color};
    display: block;
    border-radius: 50%;
    animation-name: ${dotsAnimation};
    animation-duration: 1.2s;
    animation-iteration-count: infinite;
    animation-timing-function: ease;
    transform: scale(0.8);
  }

  span:nth-of-type(1) {
    animation-delay: 0.4s;
  }

  span:nth-of-type(2) {
    animation-delay: 0.8s;
  }
`
