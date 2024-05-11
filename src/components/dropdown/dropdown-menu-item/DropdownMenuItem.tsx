import React, { useCallback, useMemo } from 'react'
import { useTheme } from '../../../theme'
import { Icon, icons } from '../../../lib'
import { menuItemStyles } from '../styles'
import { DROPDOWN_THEME, IDropdownMenuItem } from '../types'
import { DropdownMenu } from '../dropdown-menu/DropdownMenu'

export const DropdownMenuItem: React.FC<IDropdownMenuItem> = React.memo(
  ({
    value,
    subMenu,
    name,
    icon,
    onClick,
    selected,
    menuLevel = 0,
    theme = DROPDOWN_THEME.DEFAULT,
    isHovered,
    isActive,
    onHover,
  }) => {
    const { colors } = useTheme()

    const isActiveGroup = useMemo(
      () =>
        isActive ||
        (subMenu && subMenu.some((item) => item.value === selected)),
      [subMenu, selected, isActive],
    )

    const genIcons = useCallback(() => {
      return subMenu ? (
        <Icon
          size={25}
          icon={icons.campus}
          color={isHovered ? colors.primary.DEFAULT : colors.primary.DEFAULT}
        />
      ) : (
        isActiveGroup && (
          <Icon
            size={25}
            icon={icons.campus}
            color={
              isActiveGroup ? colors.primary.DEFAULT : colors.primary.DEFAULT
            }
          />
        )
      )
    }, [subMenu, isActiveGroup, isHovered])

    return (
      <>
        <div
          css={menuItemStyles({
            theme,
            isDisabled: false,
            isHover: isHovered,
            isActive: isActiveGroup,
          })}
          className="menu-item"
          key={value}
          onMouseEnter={() => onHover(value)}
          onMouseLeave={() => onHover(undefined)}
        >
          <div
            className="menu-item-wrapper"
            onClick={() => !subMenu && onClick?.(value)}
          >
            {icon && <Icon size={18} icon={icon} />}
            <span className="menu-item-name">{name}</span>
            <span className="menu-item-icon">{genIcons()}</span>
          </div>
          {isHovered && subMenu && (
            <DropdownMenu
              menuLevel={menuLevel + 1}
              items={subMenu}
              onClick={onClick}
              selected={selected}
              theme={theme}
            />
          )}
        </div>
      </>
    )
  },
)
