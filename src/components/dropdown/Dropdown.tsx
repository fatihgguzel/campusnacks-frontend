import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useClickOutside, useWindowSize } from '../../hooks'
import { ObjectService } from '../../services'
import { useTheme } from '../../theme'
import { Icon, icons } from '../../lib'
import {
  DROPDOWN_MENU_POSITION,
  DROPDOWN_SIZE,
  DROPDOWN_THEME,
  DROPDOWN_TYPE,
  IDropdown,
  IDropdownItem,
  IDropdownValue,
} from './types'
import { dropdownStyles, wrapperStyles } from './styles'
import { DropdownMenu } from './dropdown-menu'
import { DropdownSelect } from './dropdown-select'

export const Dropdown: React.FC<IDropdown> = React.memo(
  ({
    selected,
    items,
    placeholder = 'Select',
    width,
    icon,
    type = DROPDOWN_TYPE.DEFAULT,
    theme = DROPDOWN_THEME.DEFAULT,
    size = DROPDOWN_SIZE.DEFAULT,
    onChange,
    onInputBlur,
    onInputFocus,
    flexValue,
    flexFormatters,
    className,
    dataAttr,
    menuPosition = DROPDOWN_MENU_POSITION.DEFAULT,
  }) => {
    const { width: windowWidth } = useWindowSize()
    const menuRef = useRef<HTMLDivElement>(null)
    const { breakpoints, colors } = useTheme()
    const onClickOutside = useCallback(() => {
      setIsMenuOpen(false)
    }, [])
    useClickOutside(menuRef, onClickOutside)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [selectedItem, setSelectedItem] = useState<IDropdownItem | undefined>(
      items?.find(({ value }) => value === selected),
    )

    useEffect(() => {
      selected &&
        items &&
        setSelectedItem(items?.find(({ value }) => value === selected))
    }, [items, selected])

    const flatItems = useMemo(
      () =>
        ObjectService.flattenObjectArray<IDropdownItem>({
          array: items,
          key: 'subMenu',
        }),
      [items],
    )

    const onChangeHandler = useCallback(
      (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = flatItems?.find(
          ({ value }) => value === e.target.value,
        )
        setSelectedItem(selected)
        onChange && onChange(selected)
      },
      [flatItems, onChange],
    )

    const onFlexValueChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = flatItems?.find(
          ({ value }) => value === e.target.value,
        )

        const formattedValue = flexFormatters?.[1]?.(e.target.value)

        const flexSelected = {
          name: e.target.value || '0',
          value: formattedValue ? formattedValue : e.target.value,
        }
        onChange?.(selected || flexSelected)
      },
      [flatItems, onChange],
    )

    const onItemClickHandler = useCallback(
      (value?: IDropdownValue) => {
        const selected = flatItems?.find(
          ({ value: itemValue }) => itemValue === value,
        )
        setSelectedItem(selected)
        onChange?.(selected)
        setIsMenuOpen(false)
      },
      [flatItems, onChange],
    )

    const onMenuClickHandler = useCallback(() => {
      setIsMenuOpen(!isMenuOpen)
    }, [isMenuOpen])

    const onInputClickHandler = useCallback(
      (e: React.MouseEvent<HTMLInputElement>) => {
        e.currentTarget.select()
      },
      [],
    )

    const label = useMemo(() => {
      if (selectedItem?.name) {
        return selectedItem?.name
      }

      if (flexValue && selected) {
        return flexFormatters?.[0](selected as string)
      }

      return selected || placeholder
    }, [selectedItem, flexValue, placeholder, flexFormatters])

    return (
      <>
        <div
          css={wrapperStyles({ width, type })}
          className={className}
          ref={menuRef}
          {...dataAttr}
        >
          <div
            css={dropdownStyles({ type, isMenuOpen, theme, size })}
            onClick={onMenuClickHandler}
          >
            <div className="dropdown-label">
              {icon && <div className="dropdown-icon"></div>}
              <div className="dropdown-text">
                {flexValue ? (
                  <input
                    value={Math.ceil(parseFloat((label || '1').toString()))}
                    onChange={onFlexValueChange}
                    onClick={onInputClickHandler}
                    onBlur={onInputBlur}
                    onFocus={onInputFocus}
                  />
                ) : (
                  label
                )}
              </div>
            </div>
            {type === DROPDOWN_TYPE.DEFAULT && (
              <Icon
                className="down-icon"
                icon={icons.campus}
                size={20}
                color={
                  theme === DROPDOWN_THEME.DARK
                    ? colors.white.DEFAULT
                    : colors.primary.DEFAULT
                }
              />
            )}
          </div>
          {isMenuOpen && (
            <DropdownMenu
              menuPosition={menuPosition}
              type={type}
              onClick={onItemClickHandler}
              placeholder={placeholder}
              items={items}
              selected={selectedItem?.value}
              theme={theme}
            />
          )}
        </div>
      </>
    )
  },
)
