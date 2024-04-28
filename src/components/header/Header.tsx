import React from 'react'
import { HEADER_TYPE, IHeader } from './types'
import { useLanguage } from '../../hooks'
import { headerStyles } from './styles'
import { HeaderLogo } from './components/header-logo'
import { Dropdown } from '../dropdown'
import { mapCampuses } from '../../helpers'
import { Campuses } from '../../types/api/enums'

export const Header: React.FC<IHeader> = React.memo(
  ({ type = HEADER_TYPE.DEFAULT, dataAttr, className }) => {
    const { t } = useLanguage()
    const defaultCampus = Object.keys(Campuses)[0]

    return (
      <>
        <div className={className} {...dataAttr} css={headerStyles}>
          <div className="left-side">
            <HeaderLogo />
            <div>
              <Dropdown items={mapCampuses()} selected={defaultCampus} />
            </div>
          </div>

          <div className="right-side"></div>
        </div>
      </>
    )
  },
)
