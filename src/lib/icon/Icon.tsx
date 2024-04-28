import React, { Fragment } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { IIcon } from './icon-types'
import { wrapperStyles } from './styles'

export const Icon: React.FC<IIcon> = React.memo(
  ({ icon, size = 24, className, onClick, color }) => {
    const iconData = JSON.parse(icon)

    const createChild = (iconData: any) => {
      const SvgSubComponent = (args: any) =>
        React.createElement(iconData.tag, args)

      if (iconData.attrs?.stroke) {
        iconData.attrs.stroke = color
      } else {
        iconData.attrs.fill = color
      }

      const sub = iconData.sub.map(createChild)

      return (
        <SvgSubComponent key={uuidv4()} {...iconData.attrs}>
          {sub}
        </SvgSubComponent>
      )
    }

    return (
      <svg
        css={wrapperStyles({ onClick })}
        role="img"
        width={`${size}px`}
        height={`${size}px`}
        viewBox="0 0 24 24"
        className={className}
        onClick={onClick}
      >
        {iconData.map((icon: any) => (
          <Fragment key={uuidv4()}>{createChild(icon)}</Fragment>
        ))}
      </svg>
    )
  },
)

Icon.defaultProps = {
  size: 24,
}
