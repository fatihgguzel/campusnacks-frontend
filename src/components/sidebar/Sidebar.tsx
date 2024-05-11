import React from 'react'
import { ISidebar, SIDEBAR_TYPE } from './types'
import { sidebarStyles } from './styles'
import { SidebarActions } from './components/sidebar-actions'

export const Sidebar: React.FC<ISidebar> = React.memo(
  ({ type = SIDEBAR_TYPE.DEFAULT, dataAttr, className }) => {
    return (
      <>
        <div className={className} {...dataAttr} css={sidebarStyles}>
          <SidebarActions />
        </div>
      </>
    )
  },
)
