import React, { Fragment } from 'react'
import { IDropdownOptions, IDropdownSelect } from '../types'
import { selectStyles } from '../styles'

export const DropdownOptions: React.FC<IDropdownOptions> = React.memo(
  ({ items, placeholder, selected }) => {
    return (
      <>
        {placeholder && (
          <option disabled selected value="-1">
            {placeholder}
          </option>
        )}
        {items?.map(({ name, value, subMenu }) => (
          <Fragment key={value}>
            {subMenu ? (
              <optgroup label={name}>
                <DropdownOptions selected={selected} items={subMenu} />
              </optgroup>
            ) : (
              <option
                value={value}
                {...(selected === value ? { selected: true } : {})}
              >
                {name}
              </option>
            )}
          </Fragment>
        ))}
      </>
    )
  },
)

export const DropdownSelect: React.FC<IDropdownSelect> = React.memo(
  ({ onChange, value, placeholder, items, selected }) => {
    return (
      <select onChange={onChange} value={value} css={selectStyles}>
        <DropdownOptions
          items={items}
          placeholder={placeholder}
          selected={selected}
        />
      </select>
    )
  },
)
