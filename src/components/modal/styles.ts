import { css } from '@emotion/react'
import { ITheme } from '../../theme'
import { IModal, MODAL_POSITION } from './types'

type IWrapperStyles = Pick<
  IModal,
  'position' | 'mobileVerticalAlign' | 'animationDuration'
>

export const wrapperStyles =
  ({ position, mobileVerticalAlign, animationDuration }: IWrapperStyles) =>
  (theme: ITheme) => css`
    position: fixed;
    z-index: ${theme.zIndex.modal};
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: none;
    align-items: center;
    justify-content: ${position === MODAL_POSITION.CENTER
      ? 'center'
      : 'flex-end'};

    .overlay {
      position: absolute;
      background: ${theme.colors.overlay.modal};
      opacity: 0;
      display: none;
      width: 100%;
      height: 100%;
      transition: opacity ${animationDuration}ms;
    }

    .modal-area {
      opacity: 0;
      transition:
        opacity ${animationDuration}ms,
        transform ${animationDuration}ms;

      ${position === MODAL_POSITION.CENTER
        ? `transform: translateY(15%);`
        : `
					transform: translateX(100%); 
					height: 100%;
				`}
    }

    @media (max-width: ${theme.breakpoints.tablet - 1}px) {
      align-items: ${mobileVerticalAlign ? 'center' : 'flex-end'};
    }

    &.enter {
      display: flex;

      .overlay {
        display: flex;
      }

      .modal-area {
        display: block;
      }
    }

    &.enter-active {
      .overlay {
        opacity: 0.5;
      }

      .modal-area {
        display: block;
        opacity: 1;

        ${position === MODAL_POSITION.CENTER
          ? `transform: translateY(0);`
          : `transform: translateX(0);`}
      }
    }

    &.enter-done {
      display: flex;

      .overlay {
        display: flex;
        opacity: 0.5;
      }

      .modal-area {
        display: block;
        opacity: 1;

        ${position === MODAL_POSITION.CENTER
          ? `transform: translateY(0);`
          : `transform: translateX(0);`}
      }
    }

    &.exit {
      display: flex;

      .overlay {
        display: flex;
        opacity: 0;
      }

      .modal-area {
        display: block;
        opacity: 0;

        ${position === MODAL_POSITION.CENTER
          ? `transform: translateY(15%);`
          : `transform: translateX(100%);`}
      }
    }
  `
