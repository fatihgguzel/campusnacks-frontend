import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import { IModal, MODAL_POSITION } from './types'
import { createPortal } from 'react-dom'
import { wrapperStyles } from './styles'

export const Modal: React.FC<IModal> = React.memo(
  ({
    isOpen,
    animationDuration = 300,
    children,
    position = MODAL_POSITION.CENTER,
    mobileVerticalAlign = false,
    onClose,
    preventClickOutside,
  }) => {
    const [init, setInit] = useState(false)
    const modalArea = useRef<HTMLDivElement>(null)
    const nodeRef = useRef(null)

    const [openModal, setModal] = useState(isOpen)
    const [visible, setVisible] = useState(false)

    const inProp = useMemo(() => visible && openModal, [visible, openModal])
    const domRender = useMemo(() => visible || openModal, [visible, openModal])

    const clickOutsideHandler = useCallback(() => {
      if (preventClickOutside) {
        return
      }

      setModal(false)
      onClose && onClose()
    }, [])

    useEffect(() => {
      if (domRender) {
        setInit(true)
      }

      if (!inProp) {
        setInit(false)
      }
    }, [domRender])

    useEffect(() => {
      setModal(isOpen)
    }, [isOpen])

    useEffect(() => {
      if (openModal) {
        setVisible(true)
      } else {
        setTimeout(() => {
          if (init) {
            setVisible(false)
          }
        }, animationDuration)
      }
    }, [openModal, init])

    useEffect(() => {
      const onKeyDown = (event: KeyboardEvent): void => {
        if (event.code === 'Escape') {
          setModal(false)
          onClose?.()
        }
      }

      addEventListener('keydown', onKeyDown)
      return () => {
        removeEventListener('keydown', onKeyDown)
      }
    }, [])

    return (
      <>
        {domRender &&
          createPortal(
            <CSSTransition
              nodeRef={nodeRef}
              in={inProp}
              timeout={animationDuration}
            >
              <div
                css={wrapperStyles({
                  position,
                  mobileVerticalAlign,
                  animationDuration,
                })}
                ref={nodeRef}
              >
                <div className="overlay" onClick={clickOutsideHandler}></div>
                <div className="modal-area" ref={modalArea}>
                  {children}
                </div>
              </div>
            </CSSTransition>,
            document.body,
          )}
      </>
    )
  },
)
