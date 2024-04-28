import React, { useState } from 'react'
import {
  IDropdownMenu,
  DROPDOWN_THEME,
  IDropdownValue,
  DROPDOWN_TYPE,
} from '../types'
import { menuInnerStyles, menuStyles } from '../styles'
import { DropdownMenuItem } from '../dropdown-menu-item/DropdownMenuItem'

export const DropdownMenu = React.forwardRef<HTMLDivElement, IDropdownMenu>(
  (
    {
      onClick,
      items,
      menuLevel = 0,
      selected,
      type = DROPDOWN_TYPE.DEFAULT,
      theme = DROPDOWN_THEME.DEFAULT,
      menuPosition,
    },
    ref,
  ) => {
    const [hovered, setHovered] = useState<IDropdownValue>()

    return (
      <div
        css={menuStyles({ isSubMenu: !!menuLevel, type, menuPosition })}
        ref={ref}
      >
        <div css={menuInnerStyles(theme)}>
          {items?.map(({ name, value, subMenu }) => (
            <DropdownMenuItem
              key={value}
              name={name}
              value={value}
              subMenu={subMenu}
              onClick={onClick}
              isHovered={hovered === value}
              isActive={selected === value}
              selected={selected}
              menuLevel={menuLevel}
              onHover={(value) => setHovered(value)}
              theme={theme}
            />
          ))}
        </div>
      </div>
    )
  },
)
