import React, { useCallback, useRef, useState } from 'react'
import { DROPDOWN_MENU_WIDTH, IUserDropdownMenu } from './types'
import { Button, BUTTON_SIZE, BUTTON_THEME, BUTTON_TYPE } from '../button'
import { icons } from '../../lib'
import { COLOR } from '../../theme'
import { DropdownMenu } from '../dropdown/dropdown-menu'
import { wrapperStyles } from './styles'
import { useClickOutside } from '../../hooks'

export const UserDropdownMenu: React.FC<IUserDropdownMenu> = ({
  items,
  className,
  dataAttr,
  name,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuRef = useRef<HTMLDivElement>(null)
  const onClickOutside = useCallback(() => {
    setIsMenuOpen(false)
  }, [])
  useClickOutside(menuRef, onClickOutside)

  const menuClickHandler = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false)
    } else {
      setIsMenuOpen(true)
    }
  }

  return (
    <>
      <div className={className} {...dataAttr} ref={menuRef}>
        <Button
          icon={icons.user}
          text={name}
          type={BUTTON_TYPE.GHOST}
          size={BUTTON_SIZE.LARGE}
          theme={BUTTON_THEME.BLACK}
          iconSize={24}
          iColor={COLOR.black_100}
          onClick={menuClickHandler}
        />
        <div css={wrapperStyles(DROPDOWN_MENU_WIDTH.SMALL)}>
          {isMenuOpen && (
            <DropdownMenu className="dropdown-menu" items={items} />
          )}
        </div>
      </div>
    </>
  )
}
