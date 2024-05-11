import React, { useLayoutEffect } from 'react'
import { HEADER_TYPE, IHeader } from './types'
import { useLanguage } from '../../hooks'
import { headerStyles, dropdownStyles } from './styles'
import { HeaderLogo } from './components/header-logo'
import { Dropdown, DROPDOWN_WIDTH } from '../dropdown'
import { mapCampuses } from '../../helpers'
import { Campuses } from '../../types/api/enums'
import { HeaderActions } from './components/header-actions'
import { useAuthProvider } from '../../provider'

export const Header: React.FC<IHeader> = React.memo(
  ({ type = HEADER_TYPE.DEFAULT, dataAttr, className }) => {
    const { t } = useLanguage()
    const defaultCampus = Object.keys(Campuses)[0]
    const { token } = useAuthProvider()

    return (
      <>
        <div className={className} {...dataAttr} css={headerStyles}>
          <div className="left-side">
            <HeaderLogo />
            <div css={dropdownStyles}>
              <Dropdown
                items={mapCampuses()}
                selected={defaultCampus}
                width={DROPDOWN_WIDTH.FULL}
              />
            </div>
          </div>

          <div className="right-side">
            <HeaderActions />
          </div>
        </div>
      </>
    )
  },
)
